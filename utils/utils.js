/* eslint-disable global-require */
/*
const fs = require('fs');
const path = require('path');
const options = require('./../options.json');
const logger_obj = require('./logger.js');
const logger = logger_obj.logger('utils');
const files = require('./files.js');

module.exports = {
	sql: make_all_sql(Object.keys(options.sites)),
	counter: make_percent_counter,
	all_options: options,
	options: options.sites,

	db: {
		query: nice_query,
		query_raw: nice_query_raw,
		close: () => db.end(),
		insert_files: insert_files
	},

	apis: {
		e621: (() => {
			const E621 = require('./apis/e621_API.node.js');
			const user_agent = options.sites.e621.user_agent;
			const username = options.sites.e621.username;
			const api_key = options.sites.e621.api_key;
			return new E621(user_agent, username, api_key);
		})(),

		furry_network: require('./apis/furry_network_api.js')
	},

	md5: require('./md5.js'),

	...files,
	...logger_obj
}; */

const options = require('./options.js');
const db = require('./database.js');
const network = require('./network.js');
const fs = require('./fs.js');
const logger_factory = require('./logger_factory.js');
const make_percent_counter = require('./counter.js');
const md5_f = require('./md5.js');
const misc = require('./misc.js');

module.exports = {
	sql: misc.make_all_sql(Object.keys(options.sites)),
	logger_level: logger_factory.logger_level,
	logger: logger_factory.logger,
	counter: make_percent_counter,
	options: options,
	sites: options.sites,
	md5: md5_f,
	fs: fs,

	apis: {
		e621: (() => {
			const E621 = require('./apis/e621_API.node.js');
			const user_agent = options.sites.e621.user_agent;
			const username = options.sites.e621.username;
			const api_key = options.sites.e621.api_key;
			return new E621(user_agent, username, api_key);
		})(),

		furry_network: require('./apis/furry_network_api.js')
	},

	db: {
		query: db.query,
		query_raw: db.query_raw,
		import_json: misc.import_files,
		import_md5: misc.import_md5_csv,
		close: db.close
	},

	save: {
		image: fs.save_image,
		image_url: network.save_image,
		multiple_url: misc.multiple_images,
		json: fs.save_json
		// generic: fs.write_binary
	},

	download: {
		json: network.download_json
	}
};
