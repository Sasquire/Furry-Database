function fix_date(created_at){
	return new Date((created_at.s * 1000) + (created_at.n / 1000000000));
}

function rating(char){
	switch (char){
		case 'e': return 'explicit';
		case 'q': return 'questionable';
		case 's': return 'safe';
		default: return 'error'; // Shouldn't happen. Throws error for db
	}
}

function tag_type(type){
	switch (type){
		case 0: return 'general';
		case 1: return 'artist';
		case 3: return 'copyright';
		case 4: return 'character';
		case 5: return 'species';
		default: return 'error'; // Shouldn't happen. Throws error for db
	}
}

module.exports = {
	file: (e) => ({
		post_id: e.id,
		given_md5: e.md5,
		file_type: e.file_ext,

		actual_md5: null,
		status: null
	}),

	post: (e) => ({
		post_id: e.id,
		change_id: e.change,
		status: e.status,
		flag_message: e.delreason || '',
		created_at: fix_date(e.created_at),
		creator_id: e.creator_id || 0,

		rating: rating(e.rating),
		tags: (e.tags || '').split(' '),
		locked_tags: (e.locked_tags || '').split(' '),
		sources: e.sources || [],
		description: e.description,

		// Post #945332 has 0 width and height
		file_size: e.file_size || 0,
		width: e.width || 0,
		height: e.height || 0,

		fav_count: e.fav_count || 0,
		score: e.score || 0,
		parent_id: e.parent_id
	}),

	tag: (e) => ({
		tag_id: e.id,
		tag_name: e.name,
		tag_type: tag_type(e.type)
	})
};
