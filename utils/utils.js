/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const options = require('./../options.json');
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
db.on('error', () => false);
const logger_obj = require('./logger.js');
const logger = logger_obj.logger('utils');
const files = require('./files.js');
const e621_api_path = './../../E621-Api/distribution/e621_API.node.js';

// Reads all sql files from each site
// {
//   "site_name": {
//     "file_name": // data
//     "file_name": // data
//   }, // more sites
// }
function make_all_sql (sites) {
	const sql_obj = {};
	sites.forEach(site => {
		sql_obj[site] = {};

		// Path to sql scripts for this site
		const folder = path.join(path.dirname(__dirname), 'sites', site);
		fs.readdirSync(folder)
			.map(e => path.join(folder, e))
			.filter(e => path.extname(e) === '.sql')
			.map(e => ({
				name: path.basename(e).slice(0, -4), // Remove extension
				data: fs.readFileSync(e, 'utf8')
			}))
			.forEach(e => (sql_obj[site][e.name] = e.data));
	});
	return sql_obj;
}

function * make_percent_counter (max, steps) {
	const hits = new Array(steps)
		.fill(0)
		.map((e, i) => Math.round((i / steps) * max));
	let counter = 0;
	let last_index = 0;
	while (true) {
		if (counter > max) {
			yield;
		} else if (hits[last_index] === counter) {
			logger.log(`Working, ${((counter / max) * 100).toFixed(2)}% done`);
			last_index++;
			counter++;
			yield;
		} else {
			counter++;
			yield;
		}
	}
}

async function insert_files (directory, insert_func) {
	logger.log(`Reading folder ${directory}`);
	const inserts = fs.readdirSync(directory);
	const counter = make_percent_counter(inserts.length, 1000);
	for (const file_name of inserts) {
		const file_path = path.join(directory, file_name);

		logger.debug(`Reading ${file_name}`);
		const text = await files.fsp.readFile(file_path, 'utf8');
		if (text === '' || text === undefined || text === null) {
			logger.debug(`File ${file_name} was empty!`);
		} else {
			const data = JSON.parse(text);
			logger.debug(`Inserting ${file_name}`);
			await insert_func(data);
		}

		counter.next();
	}
}

// Used like nice_query(sql.script, $1, $2, $3, $4);
async function nice_query (script, ...fills) {
	// No catch, because we let other functions do that
	return db.query(script, fills.map(e => JSON.stringify(e)))
		.then(e => e.rows);
}

// Used for when you dont want to stringify
async function nice_query_raw (script, ...fills) {
	// No catch, because we let other functions do that
	return db.query(script, fills)
		.then(e => e.rows);
}

module.exports = {
	sql: make_all_sql(Object.keys(options.sites)),
	counter: make_percent_counter,
	options: options.sites,

	db: {
		query: nice_query,
		query_raw: nice_query_raw,
		close: () => db.end(),
		insert_files: insert_files
	},

	apis: {
		e621: (() => {
			const E621 = require(e621_api_path);
			const user_agent = options.sites.e621.user_agent;
			const username = options.sites.e621.username;
			const api_key = options.sites.e621.api_key;
			return new E621(user_agent, username, api_key);
		})()

		// Disabled because it requires this file
		// before this file is finished
		// furry_network: require('./sites/furry_network/api.js')
	},

	...files,
	...logger_obj
};
