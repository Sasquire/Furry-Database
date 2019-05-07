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
	make_folder(options.json_path)
	const file_path = `${options.json_path}${site}_${new Date().toISOString()}.json`;
	fs.writeFileSync(file_path, JSON.stringify(json));
}

function make_folders(){
	make_folder(options.json_path);
	make_folder(options.image_path);
	const names = new Array(256)
		.fill(0)
		.map((e, i) => i.toString(16).padStart(2, '0'))
	names.forEach(e => {
		const folder_path = `${options.image_path}${e}/`
		make_folder(folder_path)
		names.map(p => `${folder_path}${p}/`).forEach(make_folder);
		console.log(`Made Folder ${e}`)
	});
}

function make_folder(path){
	if(fs.existsSync(path) == false){
		fs.mkdirSync(path)
	}
}

module.exports = {
	sql: make_all_sql(options.sites),
	db: db,
	e621_api: e621_api,
	request: request,
	raw_request: raw_request,
	save_json: save_json,
	make_folder: make_folder,
	make_folders: make_folders
}