import { query } from './../../utils/database.js';
import e621 from './../../utils/apis/e621.js';
import convert from './convert.mjs';
import create_logger from './../../utils/logger.js';
import { download_image_limited } from './../../utils/save_image.mjs';
import read_sql from './../../utils/read_sql.js';
import update_manually from './manual_rebuild.mjs';

const log = create_logger('e621');
const sql = await read_sql(import.meta.url);

function basic_error_log (type, error) {
	log.error(`Error updating ${type}`);
	log.error(error);
}

async function init () {
	return query(sql.init);
}

async function update_minutely () {
	await update_posts().catch(e => basic_error_log('posts', e));
	await update_images().catch(e => basic_error_log('images', e));
}

async function update_hourly () {

}

async function update_daily () {
	await update_tags().catch(e => basic_error_log('tags', e));
	await update_tag_aliases().catch(e => basic_error_log('tag_aliases', e));
	await update_tag_implications().catch(e => basic_error_log('tag_implications', e));

	await update_notes().catch(e => basic_error_log('notes', e));
	await update_pools().catch(e => basic_error_log('pools', e));
	await update_and_expunge_posts().catch(e => basic_error_log('expunged posts', e));
}

async function update_monthly () {
	await Promise.allSettled([
		update_favorites(),
		update_users()
	]);
}

// This is really only an issue if there are a large amount of posts
// to insert at the same time. This *shouldn't* be a problem because
// this command is meant to be RUN OFTEN.
// A simple test shows 5 days = 100,000 change = 50,000 posts = 150 pages
async function update_posts () {
	const max_change_result = await query('select max(change_seq) from e621.posts;');
	const max_change = max_change_result[0].max;

	const bulk_posts = [];
	const search = e621.post_search_iterator(`change:>${max_change} status:any`);
	for await (const post of search) {
		bulk_posts.push(post);

		if (bulk_posts.length % 100 === 0) {
			log.info(`Downloaded ${bulk_posts.length} posts`);
		}
	}

	log.info(`Downloaded ${bulk_posts.length} posts. Inserting into 'posts' and 'files' table`);
	await query(sql.insert_posts, bulk_posts.map(convert.post));
	await query(sql.insert_files, bulk_posts.map(convert.file));
}

async function update_images () {
	const links = await query('select url, file_ext, given_md5 from e621.urls where status is null;');

	log.info(`Downloading ${links.length} images`);
	await download_image_limited(5, links, update_image);

	async function update_image ({ status, image_md5, given_md5 }) {
		return query(sql.update_images, [{
			status: status.toString(),
			actual_md5: image_md5,
			given_md5
		}]);
	}
}

async function update_pools () {
	// TODO write update_pools
}

async function update_notes () {
	// TODO write update_notes
}

// Probably never going to happen. At 5 million posts, 3600 posts per hour
// That is 58 days to update from every single post.
async function update_favorites () {
	// TODO write update_favorites

	// Option A: Download the favorites of every single post
	// Option B: Download the favorites of every single user
}

// Same issue with update_favorites. Might never get written.
async function update_users () {
	// TODO write update_users
}

async function update_tags () {
	// TODO write update_tags
}

async function update_tag_aliases () {
	// TODO write update_tag_aliases
}

async function update_tag_implications () {
	// TODO write update_tag_implications
}

async function update_and_expunge_posts () {
	// TODO write update_and_expunge_posts
	// https://e621.net/post_events?commit=Search&search%5Baction%5D=expunged
	// Remove these posts
}

export default {
	init,
	update_minutely,
	update_hourly,
	update_daily,
	update_monthly,
	update_manually
};
