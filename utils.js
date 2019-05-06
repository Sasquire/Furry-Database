const options = require('./options.json');
const fs = require('fs');
const e621_api = new (require('e621_api'))(options.e621_user_agent);
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);

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

module.exports = {
	sql: make_all_sql(options.sites),
	db: db,
	e621_api: e621_api
}