const axios = require('axios');
const logger = require('./logger.js');
const fs = require('./fs.js');

async function download (default_options, url_obj) {
	const request_options = default_options;
	if (typeof url_obj === 'string') {
		logger.debug(`Downloading ${url_obj}`);
		request_options.url = url_obj;
	} else if (typeof url_obj === 'object') {
		logger.debug(`Downloading ${url_obj.url}`);
		Object.entries(url_obj).forEach(([key, value]) => (request_options[key] = value));
	} else {
		logger.error(`Unknown type for url_obj ${url_obj}`);
		return null;
	}

	const response = await axios.request({
		method: 'GET',
		...request_options
	}).catch(e => e.response);

	if (response.status !== 200) {
		// logger.error(`Error downloading ${url_obj}. Status code ${response.status}\n${JSON.stringify(response, null, '\t')}`);
		logger.error(`Error downloading ${url_obj}. Status code ${response.status}`);
		return response.status;
	} else {
		logger.all(`Downloaded data from ${url_obj}`);
		return response.data;
	}
}

async function download_image (url, ext) {
	const data = await download({
		responseType: 'arraybuffer',
		responseEncoding: 'binary'
	}, url);

	if (typeof data === 'number') {
		return [data.toString().substring(0, 4), null];
	} else if (data === null) {
		return ['-100', null];
	} else {
		const md5 = await fs.save_image(data, ext);
		return ['good', md5];
	}
}

async function download_json (url) {
	const data = await download({
		responseType: 'json'
	}, url);

	if (data !== null && typeof data === 'object') {
		return data;
	} else {
		return null;
	}
}

module.exports = {
	save_image: download_image,
	download_json: download_json
};
