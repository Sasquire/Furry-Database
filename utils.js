const fs = require('fs');
const { Pool } = require('pg');
const options = require('./options.json');

const e621_api = new (require(__dirname+'/e621_api/api.js'))(options.e621_user_agent);
require(__dirname+'/e621_api/extras.js');

const db = new Pool(options.postgres_info);

function read_sql(folder){
	const files = fs.readdirSync(`${__dirname}/sql/${folder}/`)
	const sql_obj = {};
	files.forEach(e => {
		const name = e.split('.')[0];
		const path = `${__dirname}/sql/${folder}/${e}`
		sql_obj[name] = fs.readFileSync(path, 'utf8')
	});
	return sql_obj;
}

function make_all_sql(folders){
	const sql_obj = {};
	folders.forEach(e => sql_obj[e] = read_sql(e))
	return sql_obj
}

module.exports = {
	sql: make_all_sql(options.sql),
	db: db,
	e621_api: e621_api
}