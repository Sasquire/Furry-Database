import { existsSync, createReadStream, createWriteStream } from 'fs';
import { mkdir as mkDir } from 'node:fs/promises';
import path from 'path';
import { parse } from 'csv-parse';
import { Inflate } from 'pako';
import ReadableStreamClone from 'readable-stream-clone';
import { Readable } from 'stream';
import axios from 'axios';

function inflate_stream (input_stream) {
	const inflator = new Inflate({ to: 'string' });

	const output_stream = new Readable({ read () {} });
	input_stream.on('data', chunk => inflator.push(chunk));
	inflator.onData = output_chunk => output_stream.push(output_chunk);
	inflator.onEnd = status => output_stream.push(null);

	return output_stream;
}

async function stream_file_url (url, file_path) {
	if (existsSync(file_path)) {
		return createReadStream(file_path);
	}

	const data_stream = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});

	await mkDir(path.dirname(file_path), { recursive: true });
	const read_stream = new ReadableStreamClone(data_stream.data);
	const write_stream = createWriteStream(file_path);
	read_stream.pipe(write_stream);

	return new ReadableStreamClone(data_stream.data);
}

async function stream_csv (options, row_callback) {
	let file_stream = await stream_file_url(options.url, options.file_path);
	if (options.is_compressed) {
		file_stream = inflate_stream(file_stream);
	}

	const parsed_rows = file_stream.pipe(parse({
		columns: true
	}));

	for await (const row of parsed_rows) {
		await row_callback(row);
	}
}

export default stream_csv;
