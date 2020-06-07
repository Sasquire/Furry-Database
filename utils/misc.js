const path = require('path');
const async = require('neo-async');
const { save_image } = require('./network.js');
const logger = require('./logger.js');
const make_counter = require('./counter.js');
const fs = require('./fs.js');
const { query_raw } = require('./database.js');

async function insert_files (directory, insert_func) {
	logger.log(`Inserting json files from folder ${directory}`);
	const inserts = fs.readdirSync(directory);
	const counter = make_counter(inserts.length, 1000);
	for (const file_name of inserts) {
		const file_path = path.join(directory, file_name);

		logger.debug(`Reading ${file_name}`);
		const text = await fs.readFile(file_path, 'utf8');
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

async function import_md5_csv (file_path, update_script) {
	if (file_path === undefined || file_path === '' || file_path === null) {
		throw new Error('File path must be supplied as an option');
	}

	const data = await fs.readFile(file_path, 'utf8');
	const values = data.split('\n')
		.map(e => e.split(','))
		.map(e => e.map(p => p.replace(/"/g, '')))
		.map(e => e.map(p => p || null));

	const counter = make_counter(values.length, 1000);
	for (const row of values) {
		counter.next();
		await query_raw(update_script, ...row);
	}
}

async function download_image_limited (get_query, set_query, limit) {
	const images = await query_raw(get_query);
	const iterator = async function iterator (post, done) {
		logger.debug(`Saving file [${Object.values(post).join(', ')}]`);

		const [status, md5] = await save_image(post.url, post.file_type);
		const values = Object.entries(post)
			.filter(e => e[0] !== 'url' && e[0] !== 'file_type')
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map(e => e[1]);
		await query_raw(set_query, status, md5, ...values);
		done();
	};

	return new Promise((resolve, reject) => {
		async.eachLimit(images, limit, iterator, resolve);
	});
}

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
};

module.exports = {
	make_all_sql: make_all_sql,
	multiple_images: download_image_limited,
	import_md5_csv: import_md5_csv,
	import_files: insert_files
};
