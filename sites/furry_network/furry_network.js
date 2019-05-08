const md5 = require('js-md5')
const { download } = require('./api.js');
const utils = require('./../../utils.js');
const db = utils.db;
const sql = utils.sql.furry_network;

function file_obj(e){ return {
	url: (() => { switch(e._type){
		case 'photo':
		case 'artwork': return e._source.images.original
		case 'multimedia': return e._source.url
	//	case 'story': return things(e._source.content)
	}})(),
	orig_md5: e._source.md5 ? e._source.md5 : md5(e._source.content),
	
	// ignore e._source.extension because unreliable
	// https://www.iana.org/assignments/media-types/media-types.xhtml
	file_type: (() => { switch(e._source.content_type){
		case 'image/png': return 'png';
		case 'image/jpeg': return 'jpg';
		case 'image/gif': return 'gif';
		// only stories have no content_type
		// the whole story is actually in the api
		case undefined: return 'txt';
		// https://stackoverflow.com/questions/10688588/which-mime-type-should-i-use-for-mp3#10688641
		case 'audio/mpeg': return 'mp3';
		case 'application/x-shockwave-flash': return 'swf';
		case 'video/webm': return 'webm';
		case 'audio/x-wav': return 'wav';
		
		case 'audio/mp4':
		case 'video/mp4': return 'mp4';

		case 'application/octet-stream':
		case 'text/html':
		default: return 'unknown'
	}})()
}}

function updated_at(post){
	return new Date(Math.max.apply(Math, [
		new Date(post._source.created),
		new Date(post._source.updated || 0),
		new Date(post._source.published || 0),
		new Date(post._source.made_public_date || 0)
	]));
}

function post_obj(e){ return {
	post_type: e._type,
	post_id: e._source.id,

	creator_id: e._source.character_id,
	created_at: new Date(e._source.created),
	updated_at: updated_at(e),

	title: e._source.title || '',
	description: e._source.description || '',
	rating: (() => { switch(e._source.rating){
		case 0: return 'general';
		case 1: return 'mature';
		case 2: return 'explicit';
	}})(),

	file_size: e._type == 'story' ? e._source.content.length : e._source.size,
	tags: e._source.tags,

	views: e._source.views,
	promotes: e._source.promotes,
	comments: e._source.comments,
	fav_count: e._source.favorites
}}

// artwork
// photo
// story
// multimedia
async function update(type){
	const response = await db.query(sql.max_date, [type])
	const max = new Date(response.rows[0] ? response.rows[0].max : 0)
	console.log(max)
	await download(type, max, insert_posts)
}

async function insert_posts(raw_posts){
	raw_posts = raw_posts.hits
		.concat(raw_posts.before)
		.concat(raw_posts.after);
	const posts = raw_posts.map(post_obj);
	await db.query(sql.insert_posts, [JSON.stringify(posts)])
	// todo, files, collections etc
}

module.exports = {
	insert_posts: insert_posts,
	update: update
}