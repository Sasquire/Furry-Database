// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir as readDir } from 'node:fs/promises';
import { readFileSync } from 'fs';

async function read_sql (folder_location) {
	const __dirname = dirname(fileURLToPath(folder_location));
	const return_object = {};

	const files = await readDir(__dirname, 'utf8');
	const sql_files = files.filter(e => e.slice(-3) === 'sql');
	for (const raw_filename of sql_files) {
		const filename = raw_filename.slice(0, -4);
		const file_text = readFileSync(join(__dirname, raw_filename), 'utf8');
		return_object[filename] = file_text;
	}

	return return_object;
}

export default read_sql;
