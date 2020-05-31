const axios = require('axios');
const settings = require('./../../options.json').sites.furry_network;
const logger = require('./../logger.js').logger('FN API');

async function download_page (type, page_num, bearer, tries = 0) {
	const request_options = {
		method: 'GET',
		responseType: 'json',
		url: `https://furrynetwork.com/api/search/${type}?size=72&&from=${page_num * 72}`,
		headers: {
			authorization: `Bearer ${bearer}`,
			'user-agent': settings.user_agent
		}
	};

	try {
		return Promise.all([
			axios.request(request_options),
			new Promise(resolve => setTimeout(resolve, settings.page_delay))
		]).then(e => e[0].data);
	} catch (e) {
		if (e.response.status === 401) {
			logger.error(`Unauthorized request. Set the bearer!\n${e}`);
			throw new Error('Unauthorized request. Set the bearer!');
		} else if (tries >= 3) {
			const err = `Page ${page_num} of ${type} too many retries`;
			logger.error(err);
			throw new Error(err);
		} else {
			logger.log('Trying request a second time');
			return download_page(type, page_num, bearer, tries + 1);
		}
	}
}

async function* download_until_date (type, given_date, start_page, bearer) {
	let min_date = new Date(new Date().getTime() + 1e12); // Large date
	for (let page_num = start_page || 0; given_date < min_date; page_num++) {
		logger.log(`Downloading ${type} page ${page_num}`);
		const data = await download_page(type, page_num, bearer, 0);
		min_date = get_min_date(data);
		logger.debug(`New min date is ${min_date}`);
		for (const post of merge_posts(data)) {
			yield post;
		}
	}
}

function updated_at (post) {
	return new Date(Math.max(
		new Date(post._source.created),
		new Date(post._source.updated || 0),
		new Date(post._source.published || 0),
		new Date(post._source.made_public_date || 0)
	));
}

function get_min_date (json) {
	return merge_posts(json)
		.map(updated_at)
		.sort((a, b) => a - b)
		.slice(0, 1)[0] || new Date(0);
}

function merge_posts (raw_posts) {
	return []
		.concat(raw_posts.before)
		.concat(raw_posts.hits)
		.concat(raw_posts.after);
}

module.exports = {
	download: download_until_date,
	updated_at: updated_at
};
