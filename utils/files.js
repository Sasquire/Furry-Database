const path = require('path');
const raw_request = require('request');
const crypto = require('crypto');
const async = require('neo-async');
const get_pixels = require('get-pixels');
const fs = require('fs');
const { promisify } = require('util');
const fsp = {
	writeFile: promisify(fs.writeFile),
	readFile: promisify(fs.readFile)
};
const options = require('../options.json');
const logger = require('./logger.js').logger('FileU');

// Preforms md5 on some data
// md5_f to mean md5_file
function md5_f(data){
	return crypto
		.createHash('md5')
		.update(data)
		.digest("hex")
		.toString();
}

async function request(request_options){
	return new Promise((resolve, reject) => {
		raw_request(request_options, (e, h, r) => {
			if(e || h.statusCode != 200){
				reject(e || h.statusCode);
			} else {
				resolve(r);
			}
		});
	});
}

async function request_json(request_options){
	return request(request_options).then(e => {
		if(e == ''){
			return undefined;
		} else {
			return JSON.parse(e);
		}
	});
}

function save_json(site, subfolder, json){
	const site_setting = options.sites[site];
	if(site_setting == undefined){
		logger.error(`Trying to save json for invalid site ${site}`);
	} else if(site_setting.save_json != true){
		logger.debug(`JSON would have been saved for ${site}`);
		// Don't save json for this site
	} else {
		logger.all(`Saving json for /${site}/${subfolder}`);
		make_folder(options.json_path);
		make_folder(path.join(options.json_path, site));
		make_folder(path.join(options.json_path, site, subfolder));

		const file_name = `${new Date().toISOString()}.json`;
		const file_path = path.format({
			dir: path.join(options.json_path, site, subfolder),
			base: file_name
		});
		logger.debug(`Saving json for /${site}/${subfolder} as ${file_name}`);
		fs.writeFileSync(file_path, JSON.stringify(json));
	}
}

// Todo handle errors in this function
async function save_data(data, ext){
	// Create the file path
	const md5 = md5_f(data);
	const top = md5.slice(0, 2);
	const bottom = md5.slice(2, 4);
	const folder = path.join(options.image_path, top, bottom);
	const file_name = `${md5}.${ext}`;
	make_file_folder(top, bottom);

	// Try to write the image
	const collision = await write_data(folder, file_name, data);
	if(collision){
		const new_folder = path.join(options.image_path, options.collision);
		const another = await write_data(new_folder, file_name, data);
		if(another){
			// Something is seriously fucked
			const foolproof_name = file_name + new Date().toISOString();
			await write_data(new_folder, foolproof_name, data);
		}
	}

	return md5;
}

async function image_data_hash(data, ext){
	const acceptable = ['jpg', 'png', 'gif'];

	return new Promise((resolve, reject) => {
		if(acceptable.includes(ext) == false || options.save_dhash == false){
			resolve(null);
			return;
		}

		logger.all('Getting d_hash of image');
		get_pixels(data, `image/${ext}`, (err, pixels) => {
			if(err){
				logger.error(err);
				resolve(null);
			} else {
				resolve(md5_f(Buffer.from(pixels.data)));
			}
		});
	});
}

async function save_url(url, ext){
	logger.all(`Going to save a "${ext}" from ${url}`);
	try {
		const image_binary = await request({
			url: url,
			encoding: null
		});
		const md5 = await save_data(image_binary, ext);
		return ['good', md5];
	} catch(e) {
		return [e.toString().substring(0, 4), null];
	}
}

// Returns true if there was a collision trying
// to write the file, false otherwise
async function write_data(folder, file_name, data){
	logger.debug(`Saving file ${file_name}`);
	const file_path = path.join(folder, file_name);

	if(fs.existsSync(file_path)){
		const already_data = await fsp.readFile(file_path);
		if(data.equals(already_data)){
			logger.debug(`Duplicate file ${file_name} not re-saving`);
			return false;
		} else {
			logger.error(`MD5 collision with ${file_name}`);
			return true;
		}
	} else {
		logger.log(`Saved file ${file_name}`);
		await fsp.writeFile(file_path, data, 'binary');
		return false;
	}
}

async function read_file(md5, ext){
	const top = md5.slice(0, 2);
	const bottom = md5.slice(2, 4);
	const folder = path.join(options.image_path, top, bottom);
	const file_name = `${md5}.${ext}`;
	const file_path = path.join(folder, file_name);
	return fsp.readFile(file_path);
}

function make_image_folders(){
	logger.log('Creating all the image folders');
	make_folder(options.image_path);
	make_folder(path.join(options.image_path, options.collision));

	const names = new Array(256)
		.fill(0)
		.map((e, i) => i.toString(16).padStart(2, '0'));

	names.forEach((first, i) => {
		names.forEach((second, j) => {
			make_file_folder(first, second);

			const should_log = ((i * 256) + j) % (256 * 16) == 0;
			const print = should_log ? logger.log : logger.debug;
			print(`Creating folder ${first}_${second}`);
		});
	});
}

function make_folder(folder_path){
	if(!fs.existsSync(folder_path)){
		fs.mkdirSync(folder_path);
	}
}

function make_file_folder(top, bottom){
	make_folder(options.image_path);
	make_folder(path.join(options.image_path, top));
	make_folder(path.join(options.image_path, top, bottom));
}

async function download_image_limited(args, site, iterator){
	const limit = (() => {
		const site_obj = options.sites[site];
		if(site_obj == undefined){
			return 1;
		} else {
			return site_obj.file_concurrency || 1;
		}
	})();
	logger.debug(`Download ${args.length} files from ${site} speed ${limit}`);

	return new Promise((resolve, reject) => {
		async.eachLimit(args, limit, iterator, resolve);
	});
}

function test_file(md5, ext){
	const top = md5.substring(0, 2);
	const bottom = md5.substring(2, 4);
	const file_name = `${md5}.${ext}`;
	const file_path = path.join(options.image_path, top, bottom, file_name);
	return fs.existsSync(file_path);
}

module.exports = {
	request: request_json,
	raw_request: raw_request,
	save: {
		url: save_url,
		data: save_data,
		json: save_json,
		multiple: download_image_limited,
		test: test_file
	},

	folders: {
		make: make_folder,
		make_files: make_image_folders
	},

	md5: md5_f
};
