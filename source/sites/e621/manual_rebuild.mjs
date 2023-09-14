import { readdir as readDir } from 'node:fs/promises';
import binary_search from 'binary-search';
import stream_csv from '../../utils/stream_csv.mjs';
import read_sql from './../../utils/read_sql.js';
import { join } from 'path';
import convert from './convert.mjs';
import create_logger from './../../utils/logger.js';
import { query } from './../../utils/database.js';

const log = create_logger('e621');
const sql = await read_sql(import.meta.url);

async function bulk_insert_from_csv () {
	const today = get_today();
	const url = `https://e621.net/db_export/posts-${today}.csv.gz`;
	const file_path = join('/', 'csvs', `posts-${today}.csv.gz`);

	let total_rows = 0;
	const row_buffer = [];
	await stream_csv({ url, file_path, is_compressed: true }, add_to_row_buffer);
	await insert_row_buffer();

	async function add_to_row_buffer (row) {
		row_buffer.push(row);

		if (row_buffer.length >= 10000) {
			await insert_row_buffer();
		}
	}

	async function insert_row_buffer () {
		total_rows += row_buffer.length;
		log.debug(`Inserting ${row_buffer.length} rows into 'posts' and 'files' table. Total ${total_rows}`);
		await query(sql.insert_posts, row_buffer.map(convert.post_csv));
		await query(sql.insert_files, row_buffer.map(convert.file_csv));
		row_buffer.length = 0;
	}
}

function get_today () {
	// now is yesterday because we don't know when the site runs the
	// db_export functionality. This should be the safest option.
	const now = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
	const year = now.getFullYear().toString().padStart(4, '0');
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	const today = `${year}-${month}-${day}`;
	return today;
}

async function read_all_images_on_disk (complete_level_callback) {
	let counter = 0;
	const top_level_folders = await readDir(join('/', 'images'));
	for (const top_level of top_level_folders) {
		const bottom_level_folders = await readDir(join('/', 'images', top_level));
		for (const bottom_level of bottom_level_folders) {
			const files_in_level = await readDir(join('/', 'images', top_level, bottom_level));
			await complete_level_callback(files_in_level, top_level, bottom_level);

			const before_length = counter;
			counter += files_in_level.length;
			const after_length = counter;

			if (Math.floor(before_length / 10000) !== Math.floor(after_length / 10000)) {
				log.debug(`Checked a total of ${counter} images on disk`);
			}
		}
	}
}

// Using fs.existsSync or fs.stat is *really* slow. It is a lot faster
// to assume that the files stored on disk are accurate and then query
// their names. Reading directories *is* fast. Its then as simple as
// using binary search to lookup all the files on disk and see if they
// are supposed to be in the database. While slow for small inserts
// this is only supposed to be run ONCE (when migrating).
async function check_all_images_on_disk () {
	// Mozilla says to use this instead of string.localeCompare for repeated calls
	const compare_text = new Intl.Collator('en').compare;
	let total_updates = 0;

	const files_to_update_buffer = [];
	await read_all_images_on_disk(async function update_image_group (files, top, bottom) {
		const files_in_database = await query_filenames_starting_with(top, bottom);

		files
			.filter(filename => binary_search(files_in_database, filename, compare_text) >= 0)
			.map(filename => filename.substring(0, 32))
			.forEach(filename => files_to_update_buffer.push(filename));

		if (files_to_update_buffer.length > 10000) {
			await update_files_in_buffer();
		}
	});
	await update_files_in_buffer();

	async function update_files_in_buffer () {
		total_updates += files_to_update_buffer.length;
		log.debug(`Updating the status of ${files_to_update_buffer.length} files. Total ${total_updates}`);
		await query(sql.update_images, files_to_update_buffer.map(good_status_map));
		files_to_update_buffer.length = 0;
	}

	function good_status_map (md5) {
		return {
			status: 'good',
			given_md5: md5,
			actual_md5: md5
		};
	}
}

async function query_filenames_starting_with (top, bottom) {
	return query(`
		select concat(given_md5, '.', file_ext) as filename
		from e621.files
		where status is null
			and given_md5 >= '${top}${bottom}${new Array(28).fill(0).join('')}'
			and given_md5 <= '${top}${bottom}${new Array(28).fill('f').join('')}'
		order by given_md5 asc;
	`).then(e => e.map(p => p.filename));
}

async function update_manually () {
	await bulk_insert_from_csv();
	await check_all_images_on_disk();
	// TODO deal with post_replacements and download all historic MD5s
	// https://e621.net/post_replacements
}

export default update_manually;
