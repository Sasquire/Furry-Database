const path = require('path');
const axios = require('axios');
const async = require('neo-async');
const fs = require('fs');
const { promisify } = require('util');
const fsp = {
	writeFile: promisify(fs.writeFile),
	readFile: promisify(fs.readFile),
	exists: promisify(fs.stat)
};
const options = require('../options.json');
const logger = require('./logger.js').logger('FileU');
const md5_f = require('./md5.js');

async function download (default_options, url_obj) {
	const request_options = default_options;
	if (typeof url_obj === 'string') {
		logger.log(`Downloading ${url_obj}`);
		request_options.url = url_obj;
	} else if (typeof url_obj === 'object') {
		logger.log(`Downloading ${url_obj.url}`);
		Object.entries(url_obj).forEach(([key, value]) => (request_options[key] = value));
	} else {
		logger.error(`Unknown type for url_obj ${url_obj}`);
		return null;
	}

	const response = await axios.request({
		method: 'GET',
		...request_options
	}).catch(e => e.response);

	if (response.status !== 200) {
		// logger.error(`Error downloading ${url_obj}. Status code ${response.status}\n${JSON.stringify(response, null, '\t')}`);
		logger.error(`Error downloading ${url_obj}. Status code ${response.status}`);
		return response.status;
	} else {
		logger.debug(`Downloaded data from ${url_obj}`);
		return response.data;
	}
}

async function download_image (url, ext) {
	const data = await download({
		responseType: 'arraybuffer',
		responseEncoding: 'binary'
	}, url);

	if (typeof data === 'number') {
		return [data.toString().substring(0, 4), null];
	} else if (data === null) {
		return ['-100', null];
	} else {
		const md5 = await save_binary(data, ext);
		return ['good', md5];
	}
}

async function download_json (url) {
	const data = await download({
		responseType: 'json'
	}, url);

	if (data !== null && typeof data === 'object') {
		return data;
	} else {
		return null;
	}
}

async function save_json (site, subfolder, json, custom_name) {
	const site_setting = options.sites[site];
	if (site_setting === undefined) {
		logger.error(`Trying to save json for invalid site ${site}`);
	} else if (site_setting.save_json !== true) {
		logger.debug(`JSON would have been saved for ${site}`);
	} else {
		logger.all(`Saving json for /${site}/${subfolder}`);
		make_folder(options.json_path);
		make_folder(path.join(options.json_path, site));
		make_folder(path.join(options.json_path, site, subfolder));

		const file_name = custom_name || `${new Date().toISOString()}.json`;
		const file_path = path.format({
			dir: path.join(options.json_path, site, subfolder),
			base: file_name
		});
		logger.debug(`Saving json for /${site}/${subfolder} as ${file_name}`);
		try {
			return fsp.writeFile(file_path, JSON.stringify(json));
		} catch (e) {
			logger.error(`Error saving json for /${site}/${subfolder} as ${file_name}\n${e}`);
		}
	}
}

// Todo handle errors in this function
async function save_binary (data, ext) {
	const md5 = md5_f(data);
	const md5_name = `${md5}.${ext}`;
	const file_name = create_filename(md5, ext);
	const file_path = create_image_path(md5, ext);
	make_file_folder(md5.substring(0, 2), md5.substring(2, 4));

	// Try to write the image
	const collision = await write_binary(file_path, data);
	if (collision === true) {
		make_folder(path.join(options.image_path, options.collision));
		const new_folder = path.join(options.image_path, options.collision, md5_name);
		const second_try = await write_binary(new_folder, file_name, data);
		if (second_try === true) {
			// Something is seriously fucked
			const foolproof_name = md5_name + new Date().toISOString();
			const foolproof_path = path.join(options.image_path, options.collision, foolproof_name);
			await write_binary(foolproof_path, data);
		}
	}

	return md5;
}

// Returns true if there was a collision trying
// to write the file, false otherwise
async function write_binary (file_path, data) {
	logger.debug(`Saving binary data at ${file_path}`);
	const file_exists = await check_file_path(file_path);

	if (file_exists === true) {
		const already_data = await fsp.readFile(file_path);
		if (data.equals(already_data)) {
			logger.debug(`Duplicate file ${file_path} not re-saving`);
			return false;
		} else {
			logger.error(`MD5 collision with ${file_path}`);
			return true;
		}
	} else {
		try {
			logger.log(`Writing binary data at ${file_path} to disk`);
			await fsp.writeFile(file_path, data, 'binary');
			logger.all(`Wrote binary data at ${file_path} to disk`);
			return false;
		} catch (e) {
			logger.error(`Error file at ${file_path} to disk\n${e}`);
			return true;
		}
	}
}

function make_image_folders () {
	logger.log('Creating all the image folders');
	make_folder(options.image_path);
	make_folder(path.join(options.image_path, options.collision));

	const names = new Array(256)
		.fill(0)
		.map((e, i) => i.toString(16).padStart(2, '0'));

	names.forEach((first, i) => {
		names.forEach((second, j) => {
			make_file_folder(first, second);

			const should_log = ((i * 256) + j) % (256 * 16) === 0;
			const print = should_log ? logger.log : logger.debug;
			print(`Creating folder ${first}_${second}`);
		});
	});
}

function make_file_folder (top, bottom) {
	make_folder(options.image_path);
	make_folder(path.join(options.image_path, top));
	make_folder(path.join(options.image_path, top, bottom));
}

function make_folder (folder_path) {
	if (!fs.existsSync(folder_path)) {
		fs.mkdirSync(folder_path);
	}
}

async function download_image_limited (args, site, iterator) {
	const limit = (() => {
		const site_obj = options.sites[site];
		if (site_obj === undefined) {
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

async function check_file_path (file_path) {
	return fsp.exists(file_path).then(e => true).catch(e => false);
}

async function check_image (md5, ext) {
	return check_file_path(create_image_path(md5, ext));
}

function create_filename (md5, ext) {
	const top = md5.substring(0, 2);
	const bottom = md5.substring(2, 4);
	const file_name = `${md5}.${ext}`;
	return path.join(top, bottom, file_name);
}

function create_image_path (md5, ext) {
	return path.join(options.image_path, create_filename(md5, ext));
}

module.exports = {
	request: {
		json: download_json
	},

	save: {
		url: download_image,
		json: save_json,
		multiple: download_image_limited,
		binary: save_binary
	},

	folders: {
		make: make_folder,
		make_files: make_image_folders
	},

	check: {
		path: check_file_path,
		image: check_image
	},

	fsp: fsp
};
