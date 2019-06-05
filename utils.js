/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const fsp = {
	writeFile: promisify(fs.writeFile),
	readFile: promisify(fs.readFile)
};
const raw_request = require('request');
const async = require('neo-async');
const options = require('./options.json');
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
// Logger for this file is defined just below logger_utils

// The only two things that should be used from here are
// set to set the debug level (this is only used in the start) and
// create to create labeled loggers.
// Everything else will be from the functions given by `create`
const logger_utils = {
	// Lower level means more is printed
	level: 20,
	levels: {
		all: 40,
		debug: 30,
		info: 20,
		error: 10
	},

	// Key to identify this instance of the program
	key: Buffer.from(md5_f(new Date().toString()))
		.toString('base64')
		.substring(0, 4),

	set: (name) => (logger_utils.level = logger_utils.levels[name] || 20),
	get: (name) => logger_utils.levels[name] || 0,
	print: (string, level) => {
		// If current level is greater than target level
		if(logger_utils.level >= logger_utils.get(level)){
			console.log(string);
		}
	},

	create: (title) => ({
		error: logger_utils.make('error', title, false),
		log: logger_utils.make('info', title, false),
		debug: logger_utils.make('debug', title, false),
		all: logger_utils.make('all', title, false),
		d_error: logger_utils.make('error', title, true),
		d_log: logger_utils.make('info', title, true),
		d_debug: logger_utils.make('debug', title, true),
		d_all: logger_utils.make('all', title, false)
	}),

	make: (level, title, should_date) => {
		const key = logger_utils.key;
		const format = (str) => `${key}-${level}:\t${title}:\t${str}`;
		const add_date = (str) => `${str}\t${new Date().toISOString()}`;

		const this_logger = (text = '') => {
			const string = (text.stack || text.toString() || '')
				.split('\n')
				.map(e => format(e))
				.map(e => (should_date ? add_date(e) : e))
				.join('\n');
			logger_utils.print(string, level);
		};

		return this_logger;
	}
};
const logger = logger_utils.create('utils');

// Preforms md5 on some data
// md5_f to mean md5_file
function md5_f(data){
	return crypto
		.createHash('md5')
		.update(data)
		.digest("hex")
		.toString();
}

// Reads all sql files from each site
// {
//   "site_name": {
//     "file_name": // data
//     "file_name": // data
//   }, // more sites
// }
function make_all_sql(sites){
	const sql_obj = {};
	sites.forEach(site => {
		sql_obj[site] = {};

		// Path to sql scripts for this site
		const folder = path.join(__dirname, 'sites', site);
		fs.readdirSync(folder)
			.map(e => path.join(folder, e))
			.filter(e => path.extname(e) == '.sql')
			.map(e => ({
				name: path.basename(e).slice(0, -4), // Remove extension
				data: fs.readFileSync(e, 'utf8')
			}))
			.forEach(e => (sql_obj[site][e.name] = e.data));
	});
	return sql_obj;
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

function percent_counter(index, max, steps){
	const hit = new Array(steps)
		.fill(0)
		.map((e, i) => Math.round((i / steps) * max))
		.find(e => e == index);

	if(hit == undefined){ return; }
	logger.log(`Working, ${((index / max) * 100).toFixed(2)}% done`);
}

async function insert_files(directory, insert_func){
	const inserts = fs.readdirSync(directory);

	let i = 0; // Index counter
	for(const file_name of inserts){
		const file_path = path.join(directory, file_name);

		logger.debug(`Reading ${file_name}`);
		const text = await fsp.readFile(file_path);
		const data = JSON.parse(text);

		logger.debug(`Inserting ${file_name}`);
		await insert_func(data);

		i++;
		percent_counter(i, inserts.length, 100);
	}
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

// Used like nice_query(sql.script, $1, $2, $3, $4);
async function nice_query(script, ...fills){
	return db.query(script, fills.map(e => JSON.stringify(e)))
		.then(e => e.rows);
		// No catch, because we let other functions do that
}

// Used for when you dont want to stringify
async function nice_query_raw(script, ...fills){
	return db.query(script, fills)
		.then(e => e.rows);
		// No catch, because we let other functions do that
}

module.exports = {
	sql: make_all_sql(Object.keys(options.sites)),
	query: nice_query,
	query_raw: nice_query_raw,
	close: () => db.end(),
	insert_files: insert_files,
	counter: percent_counter,

	apis: {
		e621: (() => {
			const api_gen = require('e621_api');
			const user_agent = options.sites.e621.user_agent;
			const delay = options.sites.e621.page_delay;
			return new api_gen(user_agent, delay);
		})()

		// Disabled because it requires this file
		// before this file is finished
		// furry_network: require('./sites/furry_network/api.js')
	},

	request: request_json,
	raw_request: raw_request,
	save: {
		url: save_url,
		data: save_data,
		json: save_json,
		multiple: download_image_limited,
		test: test_file
	},

	logger: logger_utils.create,
	logger_level: logger_utils.set,

	folders: {
		make: make_folder,
		make_files: make_image_folders
	},

	md5: md5_f,
	options: options.sites
};
