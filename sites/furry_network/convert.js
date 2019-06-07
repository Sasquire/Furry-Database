/* eslint-disable no-underscore-dangle */
// Furrynetwork has a lot of underscore dangle

const utils = require('./../../utils/utils.js');
const md5 = utils.md5;

function updated_at(post){
	return new Date(Math.max(
		new Date(post._source.created),
		new Date(post._source.updated || 0),
		new Date(post._source.published || 0),
		new Date(post._source.made_public_date || 0)
	));
}

function get_url(e){
	switch (e._type){
		case 'photo':
		case 'artwork': return e._source.images.original;
		case 'multimedia': return e._source.url;
		case 'story': return null;
		default: return 'error'; // Shouldn't happen
	}
}

function rating(magic_value){
	switch (magic_value){
		case 0: return 'general';
		case 1: return 'mature';
		case 2: return 'explicit';
		default: return 'error'; // Shouldn't happen
	}
}

function file_size(e){
	return e._type == 'story' ? e._source.content.length : e._source.size;
}

// Ignore e._source.extension because unreliable
// https://www.iana.org/assignments/media-types/media-types.xhtml
function file_type(content_type){
	switch (content_type){
		case 'image/png': return 'png';
		case 'image/jpeg': return 'jpg';
		case 'image/gif': return 'gif';

		// Only stories have no content_type
		// the whole story is actually in the api
		case undefined: return 'txt';

		// https://stackoverflow.com/questions/10688588/which-mime-type-should-i-use-for-mp3#10688641
		case 'audio/mpeg': return 'mp3';
		case 'audio/x-wav': return 'wav';

		case 'application/x-shockwave-flash': return 'swf';
		case 'video/webm': return 'webm';
		case 'audio/mp4':
		case 'video/mp4': return 'mp4';

		case 'application/octet-stream':
		case 'text/html':
		default: return 'unknown';
	}
}

function find_md5(post){
	// Artwork 1560272 has no md5?
	if(post._source.md5){
		return post._source.md5;
	} else if(post._type == 'story'){
		return md5(post._source.content);
	} else {
		// Some md5's can be null because not supplied by API
		return null;
	}
}

module.exports = {
	file: (e) => ({
		post_type: e._type,
		post_id: e._source.id,

		url: get_url(e),
		given_md5: find_md5(e),
		file_type: file_type(e._source.content_type),

		status: null,
		actual_md5: e._type == 'story' ? md5(e._source.content) : null
	}),

	post: (e) => ({
		post_type: e._type,
		post_id: e._source.id,

		creator_id: e._source.character_id,
		created_at: new Date(e._source.created),
		updated_at: updated_at(e),

		title: e._source.title || '',
		description: e._source.description || '',
		rating: rating(e._source.rating),

		file_size: file_size(e),
		tags: e._source.tags,

		views: e._source.views,
		promotes: e._source.promotes,
		comments: e._source.comments,
		fav_count: e._source.favorites
	}),

	collections: (raw) => raw
		.filter(e => e._source.collection_ids.length != 0)
		.map(e => e._source.collection_ids.map(p => ({
			post_id: e._source.id,
			post_type: e._type,
			collection: p
		})))
		.reduce((acc, e) => [...acc, ...e], []),

	updated_at: updated_at
};
