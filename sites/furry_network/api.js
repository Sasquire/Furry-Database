const opts = require('./../../options.json').furry_network;
const utils = require('./../../utils.js')
const { request } = require('./../../utils.js');
let login_response = {};

async function download_page(type, page_num){
	const before = page_num * 72;
	const options = {
		url:`https://furrynetwork.com/api/search/${type}?size=72&&from=${before}`,
		headers: {
			'authorization': 'Bearer '+ login_response.access_token,
			'user-agent': opts.user_agent
		}
	}
	return Promise.all([
		request(options),
		new Promise(r => setTimeout(r, opts.wait_time))
	])
	.then(e => e[0])
	.catch(async e => {
		if(e != 401){ throw `Page ${type}--${page_num}-- errors !-- ${e} --!`; }
		console.log('Attempting to refresh')
		return oauth('refresh')
			.then(() => download_page(type, page_num));
	});
}

function oauth(oauth_method){
	// this is really ugly, but it is the cleanest I have found
	// i did not want three methods that looked almost the same
	// please make this good
	const methods = {
		login: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/token',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': opts.user_agent
			},
			formData: {
				username: opts.username,
				password: opts.password,
				grant_type: 'password',
				client_id: '123',
				client_secret: opts.client_secret
			}
		},
		logout: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/logout',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': opts.user_agent,
				authorization: `Bearer ${login_response.access_token}`
			},
			form: `{"refresh_token":"${login_response.refresh_token}"}`
		},
		refresh: {
			method: "POST",
			url: 'https://furrynetwork.com/api/oauth/token',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'user-agent': opts.user_agent,
				authorization: `Bearer ${login_response.access_token}`
			},
			formData: {
				grant_type: 'refresh_token',
				client_id: '123',
				refresh_token: login_response.refresh_token
			}
		}
	}

	console.log(`oauth ${oauth_method}ing`);
	return request(methods[oauth_method]).then(e => {
		if(oauth_method != 'login'){ return; }
		login_response = e
	}).catch(e => {
		throw `Error with ${oauth_method}ing !-- ${e} --!`;
	})
}

async function download_until_id(type, max_db_date, callback){
	try {
		await oauth('login');
		let min_date = new Date(new Date().getTime() + 1e12);
		for(let page = 0; max_db_date < min_date; page++){
			console.log(`Downloading page ${page}`)
			const data = await download_page(type, page)
			utils.save_json('furry_network', type, data)
			min_date = get_min_date(data);
			callback(data);
		}
	} catch(e){
		console.log(e)
	} finally {
		await oauth('logout').catch(console.log)
	}
}

function get_min_date(json){
	return json.hits
		.concat(json.before)
		.concat(json.after)
		.map(updated_at)
		.sort((a, b) => a - b)
		.slice(0, 1)[0]
}

function updated_at(post){
	return new Date(Math.max.apply(Math, [
		new Date(post._source.created),
		new Date(post._source.updated || 0),
		new Date(post._source.published || 0),
		new Date(post._source.made_public_date || 0)
	]));
}

module.exports = {
	download: download_until_id
}