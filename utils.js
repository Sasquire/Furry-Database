const options = require('./options.json');
const fs = require('fs');
const e621_api = new (require('e621_api'))(options.e621_user_agent);
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
const raw_request = require('request');

function make_all_sql(sites){
	const sql_obj = {};
	sites.forEach(site => {
		sql_obj[site] = {}
		const folder = `${__dirname}/sites/${site}/`;
		fs.readdirSync(folder).map(e => ({
				path: folder + e,
				data: fs.readFileSync(folder + e, 'utf8'),
				name: e.split('.')[0],
				type: e.split('.')[1]
			}))
			.filter(e => e.type == 'sql')
			.forEach(e => {
				sql_obj[site][e.name] = e.data
			});
	});
	return sql_obj
}

async function request(options){
	return new Promise((resolve, reject) => {
		raw_request(options, (e, h, r) => {
			if(e || h.statusCode != 200){
				reject(e || h.statusCode);
			} else {
				resolve(JSON.parse(r || '[]'));
			}
		})
	})
}

function save_json(site, json){
	const file_path = `${options.json_path}${site}_${new Date().toISOString()}.json`;
	fs.writeFileSync(file_path, JSON.stringify(json));
}

module.exports = {
	sql: make_all_sql(options.sites),
	db: db,
	e621_api: e621_api,
	request: request,
	raw_request: raw_request,
	save_json: save_json
}