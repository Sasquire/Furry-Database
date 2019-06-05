const utils = require('./../../utils.js');
const convert = require('./convert.js');
const query = utils.query;
const query_raw = utils.query_raw;
const sql = utils.sql.e621;
const e621 = utils.apis.e621;
const save_json = utils.save.json;
const logger = utils.logger('e621');

async function add_post_id(post_id, message){
	logger.debug(`Downloading post ${post_id}`);
	const data = await e621.post_show_id(post_id);
	// Should errors here crash the whole thing?

	if(data.status == 'destroyed'){
		logger.debug(`Post ${post_id} is destroyed`);
		// Do nothing for destroyed posts
	} else {
		const print = message === true ? logger.log : logger.debug;
		print(`Adding post ${post_id} to db`);
		await add_posts([data]);
	}
}

async function add_posts(post_array){
	save_json('e621', 'posts', post_array);
	await insert_posts(post_array);
}

async function insert_posts(post_array){
	logger.all('Inserting post objects');
	await query(sql.insert_posts, post_array.map(convert.post));

	logger.all('Inserting file objects');
	await query(
		sql.insert_files,
		post_array
			.filter(e => e.status != 'deleted' && e.status != 'destroyed')
			.map(convert.file)
	);
}

async function daily_post_adding(time_shift = 0){
	await regular_update();
	// C console.log('### Checking the next half ###');
	// Todo flagged_check();
	await deleted_check();

	async function get_max_change(){
		return query(sql.max_change).then(e => e[0].max || 0);
	}

	async function post_status(post_id){
		return query_raw(sql.post_status, post_id)
			.then(e => ({
				status: e[0] ? e[0].status : 'unknown',
				post_id: post_id
			}));
	}

	async function non_deleted(posts){
		return Promise.all(
			posts
				.map(e => e.id)
				.map(post_status)
		).then(
			statuses => statuses
				.filter(e => e.status != 'deleted')
				.map(e => e.post_id)
		);
	}

	async function regular_update(){
		logger.log('Daily post update based on change_id');
		const max_known = await get_max_change();
		const max_change = max_known - (time_shift * 1000);
		logger.log(`Max change_id is ${max_known}. Starting at ${max_change}`);

		// Just keep increasing pages
		for(let page_num = 1; true; page_num++){
			logger.log(`Downloading page ${page_num} of post index`);
			const posts = await e621.post_list({
				tags: `change:>${max_change} order:change`,
				page: page_num
			});
			await add_posts(posts);

			// Page will have less than 320 results if
			// the next page will have 0 results
			if(posts.length < 320){ break; }
		}

		const new_max = await get_max_change();
		logger.log(`Max change_id is now ${new_max}`);
	}

	// Assumes that any post that may show up as
	// deleted is already in the database
	async function deleted_check(){
		// Increase pages until break
		for(let page_num = 1; true; page_num++){
			logger.log(`Downloading page ${page_num} of deleted index`);
			const deleted_ids = await e621.post_deleted_index(page_num)
				.then(non_deleted);

			// If theres a deleted post
			if(deleted_ids.length != 0){
				logger.log(`Updating ${deleted_ids.length} deleted posts`);
				logger.debug(`Posts ${deleted_ids.join(' ')}`);
				await Promise.all(deleted_ids.map(add_post_id));

				// If there is a non-deleted post and not going back in time
				if(deleted_ids.length != 25 && time_shift == 0){ break; }
			} else {
				logger.log('No posts to update');
				if(page_num > time_shift * 2){ break; }
			}
		}
	}
}

async function large_post_adding(lowest_id_known){
	lowest_id_known = lowest_id_known || 1e9; // 1 billion
	while(true){ // Will force break;
		logger.log(`Checking posts below id:${lowest_id_known}`);

		const raw_posts = await e621.$before_id_dense(lowest_id_known);
		const posts = raw_posts.filter(p => p.status != 'destroyed');
		if(posts.length == 0){ break; }

		await add_posts(posts);
		lowest_id_known = posts.sort((a, b) => b.id - a.id).slice(-1)[0].id;
	}
}

// Todo a method for specific tags?
// or even a daily tag update
async function update_tags(max_known_id){
	max_known_id = max_known_id || await max_tag() || 1;
	while(true){
		logger.log(`Downloading tags above tag_id ${max_known_id}`);
		const raw_tags = await e621.tag_list({
			order: 'id',
			show_empty_tags: 1,
			after_id: max_known_id
		});
		save_json('e621', 'tags', raw_tags);
		if(raw_tags.length == 0){ return; }
		max_known_id = await insert_tags(raw_tags);
	}

	function max_tag(){
		return query(sql.max_tag).then(e => (e[0] ? e[0].max : 0));
	}
}

async function insert_tags(tag_array){
	const tags = tag_array.map(convert.tag);
	await query(sql.insert_tags, tags);
	return tags.slice(-1)[0].tag_id;
}

// This function seems to be very slow
// try and figure out why it has random freezes
// could it be the md5?
async function download_images(){
	// Images has this structure
	// { post_id, status, file_type, url }
	const images = await query(sql.undownloaded_images);

	async function single_post(post, done){
		logger.debug(`Saving id:${post.post_id}`);
		const [status, md5] = await utils.save.url(post.url, post.file_type);
		await query_raw(sql.update_image, post.post_id, status, md5);
		done(); // This is the format that neo-async uses
	}

	return utils.save.multiple(images, 'e621', single_post);
}

async function restore_images(){
	const files = await query(sql.all_files)
		.then(r => r.map(e => ({
			md5: e.given_md5,
			ext: e.file_type,
			post_id: e.post_id
		})));

	let i = 0;
	for(const file of files){
		if(utils.save.test(file.md5, file.ext)){
			await query_raw(sql.update_image, file.post_id, 'good', file.md5);
		}

		i++;
		utils.counter(i, files.length, 100);
	}
}

module.exports = {
	none: () => {
		logger.error('Did not understand the command');
	},
	post_daily: async ($1) => {
		const time_shift = parseInt($1, 10) || 0;
		logger.debug(`Daily update shifted by ${time_shift}`);
		await daily_post_adding(time_shift);
	},
	post_large: async ($1) => {
		const starting_id = parseInt($1, 10) || 1e9;
		logger.debug(`Large update starting at ${starting_id}`);
		await large_post_adding(starting_id);
	},
	post_update: async (...args) => {
		const post_updates = args
			.map(e => parseInt(e, 10))
			.filter(e => !Number.isNaN(e))
			.map(e => add_post_id(e, true));

		logger.log(`Updating ${post_updates.length} posts`);
		await Promise.all(post_updates);
	},
	tags: async ($1) => {
		const starting_id = parseInt($1, 10);
		await update_tags(starting_id);
	},
	images: async () => {
		logger.debug('Going to download images');
		await download_images();
	},
	restore: async ($1) => {
		if($1 == undefined){
			logger.error('You must supply a directory');
		} else {
			logger.log('Inserting all json files from directory to db');
			await utils.insert_files($1, insert_posts);
		}
	},
	restore_images: async () => {
		logger.log('Updating image statuses');
		await restore_images();
	}
};
