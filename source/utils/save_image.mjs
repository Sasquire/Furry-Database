import { existsSync } from 'fs';
import { readFile, mkdir as mkDir, writeFile, rm as removeFile } from 'node:fs/promises';
import axios from 'axios';
import crypto from 'crypto';
import path from 'path';
import { customAlphabet } from 'nanoid';
import { eachLimit } from 'async';
import create_logger from './logger.js';

const log = create_logger('downloader');
const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 20);

async function download_image_limited (limit, all_image_objects, update_post) {
	const iterator = async function iterator (image_obj) {
		const { status, image_md5 } = await download_image(image_obj.url, image_obj.file_ext);
		await update_post({ ...image_obj, status, image_md5 });
	};

	return eachLimit(all_image_objects, limit, iterator);
}

async function download_image (url, extension) {
	log.debug(`Downloading image from ${url}`);
	const response = await axios.request({
		url,
		responseType: 'arraybuffer',
		responseEncoding: 'binary',
		method: 'GET'
	}).catch(e => e.response);

	if (response.status !== 200) {
		log.debug(`Response code of ${response.status} when downloading ${url}`);
		return { status: response.status, image_md5: null };
	}

	const { did_save, image_md5 } = await save_image(response.data, extension);
	return { status: did_save ? 'good' : 'err', image_md5 };
}

async function save_image (image_blob, extension) {
	const { image_path, image_md5 } = await get_file_path(image_blob, extension);
	if (image_path !== null) {
		log.debug(`Saving an image to ${image_path}`);
		await mkDir(path.dirname(image_path), { recursive: true });
		await writeFile(image_path, image_blob, 'binary');

		// Paranoia check
		const saved_correctly = await verify_file_contents(image_path, image_blob, image_md5);
		if (saved_correctly === false) {
			log.error(`File corrupted when trying to save ${image_path}`);
			await removeFile(image_path);
			return { did_save: false, image_md5: null };
		}
	}

	return { did_save: true, image_md5 };
}

function md5 (data) {
	return crypto
		.createHash('md5')
		.update(data)
		.digest('hex')
		.toString();
}

async function get_file_path (image_blob, extension) {
	const images_path = path.join('/', 'images');

	const image_md5 = md5(image_blob);
	const md5_upper = image_md5.substring(0, 2);
	const md5_lower = image_md5.substring(2, 4);
	const image_path = path.join(images_path, md5_upper, md5_lower, `${image_md5}.${extension}`);

	if (existsSync(image_path) === false) {
		return { image_md5, image_path };
	}

	const blob_on_disk = await readFile(image_path);
	if (image_blob.equals(blob_on_disk)) {
		return { image_md5, image_path: null };
	} else {
		return { image_md5, image_path: path.join(images_path, 'overflow', `${image_md5}.${extension}.${nanoid()}`) };
	}
}

async function verify_file_contents (file_path, true_data, true_md5) {
	const file_data = await readFile(file_path);
	const file_md5 = md5(file_data);

	const md5s_equal = true_md5 === file_md5;
	const data_equal = true_data.equals(file_data);

	return md5s_equal && data_equal;
}

export {
	download_image,
	download_image_limited
};
