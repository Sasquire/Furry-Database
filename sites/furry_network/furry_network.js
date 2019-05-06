const opts = require('./../options.json').furry_network;
const raw_request = require('request');
let login_response = {};

async function request(options){
	return new Promise((resolve, reject) => {
		raw_request(options, (e, h, r) => {
			if(e || h.statusCode != 200){
				reject(e || h.statusCode);
			} else {
				resolve(JSON.parse(r || '[]'));
			}
		})
	})
}

async function download_page(type, page_num){
	const before = page_num * 72;
	const options = {
		// https://furrynetwork.com/api/search/artwork?size=72&&from=0
		url:`https://furrynetwork.com/api/search/${type}?size=72&&from=${before}`,
		headers: {
			'authorization': 'Bearer '+ login_response.access_token,
			'user-agent': opts.user_agent
		}
	}
	return Promise.all([
		request(options),
		new Promise(r => setTimeout(r, 3000))
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

// artwork
// photo
// story
// multimedia
async function download_until_id(type, id){
	try {
		await oauth('login');
		let min_known_id = 0;
		for(let page = 0; min_known_id < id; page++){
			const data = await download_page(type, page)
				.then(sort_join)
			min_known_id = data[0]._source.id;
			
			// insert into db here
			// also save data to a file
			// because the db is lossy
			// and we want to keep the data
			
			//console.log(data)
		}
	} catch(e){
		console.log(e)
	} finally {
		await oauth('logout').catch(console.log)
	}
}

function sort_join(json){
	return json.hits
		.concat(json.before)
		.concat(json.after)
		.sort((a, b) => b._source.id - a._source.id)
}

module.exports = {
	download: download_until_id
}

//download_until_id('artwork', 30)


