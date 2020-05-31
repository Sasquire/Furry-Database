/* eslint-disable no-underscore-dangle */
// Furrynetwork has a lot of underscore dangle
const utils = require('./../../utils/utils.js');
const download = utils.apis.furry_network.download;
const updated_at = utils.apis.furry_network.updated_at;
const convert = require('./convert.js');

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

async function all_minimal (bearer) {
	if (bearer === null || bearer === undefined || bearer === '') {
		throw new Error('Bearer option must be supplied');
	} else {
		for (const type of types) {
			logger.log(`Updating type ${type}`);
			await typed_minimal(bearer, type);
		}
	}
}

async function all_bulk (bearer) {
	if (bearer === null || bearer === undefined || bearer === '') {
		throw new Error('Bearer option must be supplied as first option');
	} else {
		for (const type of types) {
			logger.log(`Updating type ${type}`);
			await typed_bulk(bearer, type, 0);
		}
	}
}
// 1333
async function typed_bulk (bearer, type, starting_page) {
	if (bearer === null || bearer === undefined || bearer === '') {
		throw new Error('Bearer option must be supplied as first option');
	} else if (type === null || type === undefined || type === '') {
		throw new Error('Type option must be supplied as the second option');
	} else if (types.includes(type) === false) {
		throw new Error(`Type (${type}) is not supported. Try one of:\n\t[${types.join(', ')}]`);
	} else {
		const page_guess = parseInt(starting_page, 10);
		const page = Number.isNaN(page_guess) ? 0 : page_guess;
		return typed_date(bearer, type, new Date(0), page);
	}
}

async function typed_minimal (bearer, type) {
	const max = await utils.db.query_raw(sql.max_date, type);
	const max_date = new Date(max[0] ? max[0].max : 0);
	return typed_date(bearer, type, max_date, 0);
}

async function typed_date (bearer, type, max_date, starting_page) {
	logger.debug(`Max date of ${type} is ${max_date}`);
	const posts = [];
	for await (const post of download(type, max_date, starting_page, bearer)) {
		posts.push(post);
		if (posts.length >= 72) {
			await add_posts(posts, type);
			posts.length = 0; // Resets array
		}
	}
	await add_posts(posts, type);
}

async function add_posts (post_array, type) {
	const min_date = post_array
		.map(updated_at)
		.sort((a, b) => a - b)
		.slice(0, 1)[0] || new Date(0);
	const min_date_name = min_date.toISOString() + '.json';
	utils.save.json('furry_network', type, post_array, min_date_name);
	await insert_posts(post_array);
	return post_array;
}

async function insert_posts (post_array) {
	// de-duplicate array based on id
	post_array = post_array.filter((e, i, a) => i === a.findIndex(p => p._id === e._id));

	logger.debug('Inserting posts');
	await query(sql.insert_posts, post_array.map(convert.post));

	logger.debug('Inserting files');
	await query(sql.insert_files, post_array.map(convert.file));

	logger.debug('Inserting collection');
	await query(sql.insert_collection, convert.collections(post_array));

	if (utils.options.furry_network.save_stories) {
		logger.debug('Trying to save stories');
		await save_text(post_array);
	}
}

async function import_json (folder_path) {
	if (folder_path === undefined || folder_path === '' || folder_path === null) {
		throw new Error('Folder path must be supplied as an option');
	}
	return utils.db.insert_files(folder_path, e => {
		if (e.before !== undefined || e.hits !== undefined || e.after !== undefined) {
			return insert_posts([...e.before, ...e.hits, ...e.after]);
		} else {
			return insert_posts(e);
		}
	});
}

async function save_text (posts) {
	const stories = posts.filter(e => e._type === 'story');
	for (const story of stories) {
		const post_id = story._source.id;
		const post_type = story._type;
		const status = 'good';
		const text = Buffer.from(story._source.content);
		const md5 = await utils.save.binary(text, 'txt');
		await query_raw(sql.update_image, post_id, post_type, status, md5);
	}
}

async function download_images () {
	logger.log('Downloading un-downloaded images');
	const images = await query(sql.undownloaded_images);

	async function single_post (post, done) {
		logger.debug(`Saving post ${post.post_type} ${post.post_id}`);
		const post_type = post.post_type;
		const post_id = post.post_id;
		const [status, md5] = await utils.save.url(post.url, post.file_type);
		await query_raw(sql.update_image, post_id, post_type, status, md5);
		done(); // This is the format that neo-async uses
	}

	await utils.save.multiple(images, 'furry_network', single_post);
}

async function import_md5_csv (file_path) {
	// post_id, post_type, status, actual_md5
	if (file_path === undefined || file_path === '' || file_path === null) {
		throw new Error('File path must be supplied as an option');
	}

	const data = await utils.fsp.readFile(file_path, 'utf8');
	const values = data.split('\n')
		.map(e => e.split(','))
		.map(e => e.map(p => p.replace(/"/g, '')))
		.map(e => ({
			post_id: parseInt(e[0], 10),
			post_type: e[1],
			status: e[2],
			md5: e[3]
		}));

	const counter = utils.counter(values.length, 1000);
	for (const row of values) {
		counter.next();
		await query_raw(sql.update_image, row.post_id, row.post_type, row.status, row.md5);
	}
}

module.exports = {
	minimal: all_minimal,
	bulk: all_bulk,
	typed_bulk: typed_bulk,
	images: download_images,
	import_json: import_json,
	import_md5_csv: import_md5_csv
};
