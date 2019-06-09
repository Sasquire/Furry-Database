const utils = require('./../../utils/utils.js');
const updated_at = require('./convert.js').updated_at;
const logger = utils.logger('FNauth');
const settings = utils.options.furry_network;
let login_response = {};

async function download_page(type, page_num, tries = 0){
	const before = page_num * 72;
	const options = {
		url: `https://furrynetwork.com/api/search/${type}?size=72&&from=${before}`,
		headers: {
			authorization: `Bearer ${login_response.access_token}`,
			'user-agent': settings.user_agent
		}
	};

	try {
		const [data, _] = await Promise.all([
			utils.request(options),
			new Promise(resolve => setTimeout(resolve, settings.page_delay))
		]);
		return data;
	} catch(e) {
		if(e != 401){
			const err = `Page ${page_num} of ${type} -- errors\n${e}`;
			logger.error(err);
			throw new Error(err);
		} else if(tries >= 3){
			const err = `Page ${page_num} of ${type} too many retries`;
			logger.error(err);
			throw new Error(err);
		} else {
			logger.log('Attempting to refresh');
			await oauth('refresh');
			return download_page(type, page_num, tries + 1);
		}
	}
}

function oauth(oauth_method){
	// This is really ugly, but it is the cleanest I have found
	// i did not want three methods that looked almost the same
	// please make this good
	const methods = {
		login: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/token',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': settings.user_agent
			},
			formData: {
				username: settings.username,
				password: settings.password,
				grant_type: 'password',
				client_id: '123',
				client_secret: ''
			}
		},
		logout: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/logout',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': settings.user_agent,
				authorization: `Bearer ${login_response.access_token}`
			},
			form: `{"refresh_token":"${login_response.refresh_token}"}`
		},
		refresh: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/token',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': settings.user_agent,
				authorization: `Bearer ${login_response.access_token}`
			},
			formData: {
				grant_type: 'refresh_token',
				client_id: '123',
				refresh_token: login_response.refresh_token
			}
		}
	};

	logger.log(`${oauth_method}-ing`);
	const options = methods[oauth_method] || methods.login;

	return utils.request(options)
		.then(e => (login_response = e))
		.catch(e => {
			const err = `${oauth_method}ing !-- ${e} --!`;
			logger.error(err);
			throw new Error(err);
		});/* A
		if(oauth_method == 'logout' || oauth_method == 'refresh'){

		}
		if(oauth_method != 'login'){
			return;
		} else {

		}
		*/

}

async function download_until_date(type, given_date, callback){
	try {
		let min_date = new Date(new Date().getTime() + 1e12); // Large date
		await oauth('login');

		for(let page = 0; given_date < min_date; page++){
			logger.log(`Downloading page ${page}`);
			const data = await download_page(type, page);

			utils.save.json('furry_network', type, data);

			min_date = get_min_date(data);
			logger.log(`New min date is ${min_date}`);

			await callback(data); // Wait for the callback to finish
		}
	} catch(e){
		logger.error(e);
		throw new Error(e);
	} finally {
		await oauth('logout')
			.catch(e => {
				logger.error(e);
				throw new Error(e);
			});
	}
}

function get_min_date(json){
	return json.hits
		.concat(json.before)
		.concat(json.after)
		.map(updated_at)
		.sort((a, b) => a - b)
		.slice(0, 1)[0] || new Date(0);
}

module.exports = download_until_date;
