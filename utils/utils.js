/* eslint-disable global-require */
const fs = require('fs');
const { promisify } = require('util');
const fsp = {
	writeFile: promisify(fs.writeFile),
	readFile: promisify(fs.readFile)
};
const path = require('path');
const options = require('./../options.json');
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
const logger_obj = require('./logger.js');
const logger = logger_obj.logger('utils');
const files = require('./files.js');

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
		const folder = path.join(path.dirname(__dirname), 'sites', site);
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
	counter: percent_counter,
	options: options.sites,

	db: {
		query: nice_query,
		query_raw: nice_query_raw,
		close: () => db.end(),
		insert_files: insert_files
	},

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

	...files, /* Object for this file
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

	md5: md5_f */

	...logger_obj /* Object for this file
	logger: logger_utils.create,
	logger_level: logger_utils.set */
};
