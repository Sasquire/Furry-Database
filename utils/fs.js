const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const md5_f = require('./md5.js');
const logger = require('./logger.js');
const options = require('./options.js');

const fo = { // File Operations
	writeFile: promisify(fs.writeFile),
	readFile: promisify(fs.readFile),
	exists: promisify(fs.stat),
	mkdir: promisify(fs.mkdir),
	check: null, // set later
	readdirSync: fs.readdirSync,
	readFileSync: fs.readFileSync
};

fo.check = async function check_file_path (file_path) {
	return fo.exists(file_path).then(e => true).catch(e => false);
};

// Todo handle errors in this function
async function save_image (data, ext) {
	const md5 = md5_f(data);
	const file_path = create_image_path(md5, ext);
	const did_save = await write_binary(file_path, data, false);

	if (did_save === false) {
		const new_file_name = path.join(options.image_path, options.collision, `${md5}.${ext}`);
		const saved_second = await write_binary(new_file_name, data, false);
		if (saved_second === false) { // Something is seriously fucked
			const foolproof_path = path.join(options.image_path, options.collision, `${md5}_${new Date().toISOString()}.${ext}`);
			await write_binary(foolproof_path, data, false);
		}
	}

	return md5;
}

// Returns true if file was saved
async function write_binary (file_path, data, quiet) {
	logger.debug(`Saving data at ${file_path}`);

	const file_exists = await fo.check(file_path);
	if (file_exists === true) {
		const on_disk_data = await fo.readFile(file_path);
		if (data.equals(on_disk_data)) {
			logger.debug(`Duplicate file ${file_path} not re-saving`);
			return true;
		} else {
			logger.error(`Filename collision with ${file_path}`);
			return false;
		}
	} else {
		try {
			logger.all(`Making folder path for ${file_path}`);
			await fo.mkdir(path.dirname(file_path), { recursive: true });
			(quiet ? logger.debug : logger.log)(`Writing data at ${file_path} to disk`);
			await fo.writeFile(file_path, data, 'binary');
			logger.all(`Wrote data at ${file_path} to disk`);
			return true;
		} catch (e) {
			logger.error(`Error file at ${file_path} to disk\n${e}`);
			return false;
		}
	}
}

async function save_json (site, subfolder, json, custom_name) {
	const site_setting = options.sites[site];
	if (site_setting === undefined) {
		logger.error(`Trying to save json for invalid site ${site}`);
		return false;
	} else if (site_setting.save_json !== true) {
		logger.debug(`JSON would have been saved for ${site}`);
		return true;
	} else {
		logger.all(`Saving json for /${site}/${subfolder}`);
		const folder_path = path.join(options.json_path, site, subfolder);
		const file_name = custom_name || `${new Date().toISOString()}.json`;
		const file_path = path.join(folder_path, file_name);
		const data_buffer = Buffer.from(JSON.stringify(json), 'utf-8');

		const did_save = await write_binary(file_path, data_buffer);
		if (did_save === false) {
			const new_file_path = path.join(folder_path, `${file_name}.${Math.random().toString()}.json`);
			await write_binary(new_file_path, data_buffer);
		}
		return true;
	}
}

function create_image_path (md5, ext) {
	const upper = md5.substring(0, 2);
	const lower = md5.substring(2, 4);
	return path.join(options.image_path, upper, lower, `${md5}.${ext}`);
}

module.exports = {
	...fo,
	save_image: save_image,
	write_binary: write_binary,
	save_json: save_json
};
