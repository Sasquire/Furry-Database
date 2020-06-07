const utils = require('./../../utils/utils.js');
const convert = require('./convert.js');
const options = utils.sites.e621;
const query = utils.db.query;
const sql = utils.sql.e621;
const e621 = utils.apis.e621;
const save_json = utils.save.json;
const logger = utils.logger('e621');
const save_multiple_url = utils.save.multiple_url;
const import_json_folder = utils.db.import_json;
const import_md5_file = utils.db.import_md5;

async function add_posts (post_array) {
	save_json('e621', 'posts', post_array);
	await insert_posts(post_array);
	return post_array;
}

async function insert_posts (post_array) {
	logger.all('Inserting post objects');
	await query(sql.insert_change_history, post_array.map(convert.change_history));

	logger.all('Insert file objects');
	await query(sql.insert_files, post_array.map(convert.file));
}

async function download_minimal_posts () {
	const max_id = await query(sql.max_change).then(e => e[0].max || 0);
	logger.log(`Max change is ${max_id}. Downloading posts in ascending order`);
	for (let page = 1; true; page++) {
		logger.debug(`Getting page ${page} of results`);
		const posts = await e621.post_search(`change:>${max_id} order:-change status:any`, page)
			.then(e => e.posts)
			.then(e => add_posts(e));
		const new_max_id = posts.reduce((acc, e) => Math.max(acc, e.change_seq), 0) || max_id;
		logger.log(`Got page ${page} of results with ${posts.length} changes. New max change is ${new_max_id}`);
		if (posts.length !== 320) {
			break;
		}
	}
}

async function download_bulk_posts () {
	const posts = [];
	const search = e621.post_search_iterator('status:any');
	for await (const post of search) {
		posts.push(post);
		if (posts.length >= 320) {
			const low_id = posts.reduce((acc, e) => Math.min(acc, e.id), 1e9);
			logger.log(`Downloaded 320 posts. New low post ${low_id}`);
			await add_posts(posts);
			posts.length = 0; // clear array
		}
	}
	await add_posts(posts);
}

async function download_images () {
	return save_multiple_url(sql.undownloaded_images, sql.update_image, options.file_concurrency);
}

async function import_files (folder_path) {
	return import_json_folder(folder_path, insert_posts);
}

async function import_md5_csv (file_path) {
	return import_md5_file(file_path, sql.update_image);
}

module.exports = {
	minimal: download_minimal_posts,
	bulk: download_bulk_posts,
	images: download_images,
	import_json: import_files,
	import_md5_csv: import_md5_csv
};
