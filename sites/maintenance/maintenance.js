const path = require('path');
const utils = require('./../../utils/utils.js');
const options = utils.options;
const fs = utils.fs;
const md5_f = utils.md5;
const query_raw = utils.db.query_raw;
const logger = utils.logger('Maint');

async function check_all_files () {
	const pairs = make_all_pairs();
	for (const pair of pairs) {
		const folder_path = path.join(options.image_path, pair[0], pair[1]);
		const files_in_folder = fs.readdirSync(folder_path);
		const results = await Promise.all(
			files_in_folder.map(e => verify_md5(path.join(folder_path, e), e.split('.')[0]))
		);

		results
			.filter(e => e[0] === false)
			.forEach(e => logger.error(`Error with ${e[1]} got ${e[2]} expected ${e[3]}`));
		logger.log(`${pair[0]}/${pair[1]} cleared`);
	}
}

async function verify_md5 (file_path, expected_md5) {
	const data = await fs.readFile(file_path);
	const md5 = md5_f(data);
	return [md5 === expected_md5, file_path, md5, expected_md5];
}

function make_all_pairs () {
	const names = new Array(256)
		.fill(0)
		.map((e, i) => i.toString(16).padStart(2, '0'));
	const all_names = [];
	for (const lower of names) {
		for (const upper of names) {
			all_names.push([lower, upper]);
		}
	}
	return all_names;
}

async function create_folder_structure () {
	for (const pair of make_all_pairs()) {
		const folder_path = path.join(options.image_path, pair[0], pair[1]);
		await fs.mkdir(folder_path, { recursive: true });
		if (pair[1] === 'ff' && pair[0].charAt(1) === 'f') {
			logger.log(`Finished making ${pair[0]}/**`);
		}
	}

	await fs.mkdir(path.join(options.image_path, options.collision), { recursive: true });
	logger.log('Made collisions folder');

	for (const site of Object.keys(options.sites)) {
		fs.mkdir(path.join(options.json_path, site), { recursive: true });
	}
	logger.log('Made json folders');
}

async function all_files_accounted_for () {
	const search_functions = Object.values(utils.sql)
		.map(e => e.find_actual_md5)
		.filter(e => e);
	for (const pair of make_all_pairs()) {
		logger.log(`Searching through pair ${pair.join('/')}`);
		const list = fs.readdirSync(path.join(options.image_path, pair[0], pair[1]))
			.map(e => e.substring(0, 32));
		for (const md5 of list) {
			logger.debug(`Searching for md5 ${md5}`);
			const results = await Promise.all(
				search_functions.map(e => query_raw(e, md5))
			);
			if (results.some(e => e.length !== 0) === false) {
				logger.error(`md5 ${md5} was not found in any database`);
			}
		}
	}
}

module.exports = {
	check_file_md5s: check_all_files,
	create_folders: create_folder_structure,
	all_files_accounted_for: all_files_accounted_for
};
