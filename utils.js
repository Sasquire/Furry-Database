const options = require('./options.json');
const fs = require('fs');
const e621_api = new (require('e621_api'))(options.e621_user_agent);
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
const raw_request = require('request');
const { URL } = require('url');
const crypto = require('crypto');

function md5_f(data){
	return crypto
		.createHash('md5')
		.update(data)
		.digest("hex")
		.toString();
}

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
				resolve(r);
			}
		})
	})
}

async function request_json(options){
	return request(options)
		.then(e => JSON.parse(e))
}

function save_json(site, message, json){
	if(!options.save_json){ return; }
	make_folder(options.json_path)
	make_folder(options.json_path + site + '/')
	make_folder(options.json_path + site + '/' + message + '/')
	const file_path = `${options.json_path}${site}/${message}/${new Date().getTime()}.json`;
	fs.writeFileSync(file_path, JSON.stringify(json));
}

function make_folders(){
	make_folder(options.json_path);
	make_folder(options.image_path);
	make_folder(options.image_path + 'temp/');
	// todo make folders for json
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

async function insert_files(directory, insert_func){
	const file_names = fs.readdirSync(directory)
		.map(file => directory + file)

	for(const file_name of file_names){
		console.log(file_name)
		const text = fs.readFileSync(file_name, 'utf8');
		const data = JSON.parse(text)
		await insert_func(data)
	}
}

async function save_image(url, ext){
	url = new URL(url);
	const opts = {
		url: url.href,
		encoding: null
	}
	const blob = await request(opts);
	const md5 = md5_f(blob)
	const file = `${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}.${ext}`
	const full_path = options.image_path + file;
	if(fs.existsSync(full_path)){
		const already_file = fs.readFileSync(full_path)
		const same_file = already_file.equals(blob);
		if(same_file){ return; }
		console.log('md5 collision')
	} else {
		fs.writeFileSync(full_path, blob, 'binary')
	}
}

module.exports = {
	sql: make_all_sql(options.sites),
	db: db,
	e621_api: e621_api,
	md5: md5_f,
	request: request_json,
	raw_request: raw_request,
	save_image: save_image,
	save_json: save_json,
	make_folder: make_folder,
	make_folders: make_folders,
	insert_files: insert_files
}