/* eslint-disable no-underscore-dangle */
// Furrynetwork has a lot of underscore dangle

const download = require('./api.js');
const convert = require('./convert.js');
const utils = require('./../../utils/utils.js');
const query = utils.db.query;
const query_raw = utils.db.query_raw;
const sql = utils.sql.furry_network;
const logger = utils.logger('FurryN');

const types = [
	'artwork',
	'photo',
	'story',
	'multimedia'
];

async function update(type){
	logger.debug(`Updating ${type}`);
	const max = await query_raw(sql.max_date, type);
	const max_date = new Date(max[0] ? max[0].max : 0);

	logger.log(`Updating ${type}, the max date is ${max_date}`);
	await download(type, max, insert_posts);
}

async function download_all(type){
	logger.log(`Downloading all posts of type ${type}`);
	await download(type, new Date(0), insert_posts);
}

async function save_text(posts){
	const stories = posts.filter(e => e._type == 'story');
	for(const story of stories){
		const post_id = story._source.id;
		const post_type = story._type;
		const status = 'good';
		const text = Buffer.from(story._source.content);
		const md5 = await utils.save.data(text, 'txt');
		await query_raw(sql.update_image, post_id, post_type, status, md5);
	}
}

function merge_posts(raw_posts){
	return []
		.concat(raw_posts.before)
		.concat(raw_posts.hits)
		.concat(raw_posts.after);
}

async function insert_posts(file_input){
	const raw_posts = merge_posts(file_input);

	logger.debug('Inserting posts');
	await query(sql.insert_posts, raw_posts.map(convert.post));

	logger.debug('Inserting files');
	await query(sql.insert_files, raw_posts.map(convert.file));

	logger.debug('Inserting collection');
	await query(sql.insert_collection, convert.collections(raw_posts));

	if(utils.options.furry_network.save_stories){
		logger.debug('Trying to save stories');
		await save_text(raw_posts);
	}
}

async function download_images(){
	const images = await query(sql.undownloaded_images);

	async function single_post(post, done){
		logger.debug(`Saving post ${post.post_type} ${post.post_id}`);
		const post_type = post.post_type;
		const post_id = post.post_id;
		const [status, md5] = await utils.save.url(post.url, post.file_type);
		await query_raw(sql.update_image, post_id, post_type, status, md5);
		done(); // This is the format that neo-async uses
	}

	await utils.save.multiple(images, 'furry_network', single_post);
}

module.exports = {
	none: () => {
		logger.error('Did not understand the command');
	},
	restore: async ($1) => {
		if($1 == undefined){
			logger.error('You must supply a directory');
		} else {
			logger.log('Inserting all json files from directory to db');
			await utils.db.insert_files($1, insert_posts);
		}
	},
	update: async ($1) => {
		const good = types.includes($1);
		if(good == false){
			logger.error('Unexpected type');
		} else {
			await update($1);
		}
	},
	download: async ($1) => {
		const good = types.includes($1);
		if(good == false){
			logger.error('Unexpected type');
		} else {
			await download_all($1);
		}
	},
	images: async () => {
		logger.log('Downloading un-downloaded images');
		await download_images();
	}
};
