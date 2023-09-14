function rating (char) {
	switch (char) {
		case 'e': return 'explicit';
		case 'q': return 'questionable';
		case 's': return 'safe';
		default: return 'error'; // Shouldn't happen. Throws error for db
	}
}

// eslint-disable-next-line no-unused-vars
function tag_type (type) {
	switch (type) {
		case 0: return 'general';
		case 1: return 'artist';
		case 3: return 'copyright';
		case 4: return 'character';
		case 5: return 'species';
		case 6: return 'invalid';
		case 7: return 'meta';
		case 8: return 'lore';
		default: return 'error'; // Shouldn't happen. Throws error for db
	}
}

function tags (tag_object) {
	return Object.values(tag_object).reduce((acc, e) => acc.concat(e), []);
}

function parse_potentially_empty_date (date) {
	if (date === '') {
		// Site start
		return new Date('2006-01-01 00:00:00.0000+00:00');
	} else {
		return new Date(`${date}+00:00`);
	}
}

function convert_post (p) {
	return {
		post_id: p.id,
		change_seq: p.change_seq,
		created_at: new Date(p.created_at),
		updated_at: new Date(p.updated_at),
		uploader_id: p.uploader_id,
		approver_id: p.approver_id,
		is_pending: p.flags.pending,
		is_flagged: p.flags.flagged,
		is_deleted: p.flags.deleted,

		rating: rating(p.rating),
		tags: tags(p.tags),
		sources: p.sources,
		description: p.description,

		locked_tags: p.locked_tags,
		status_locked: p.flags.status_locked,
		rating_locked: p.flags.rating_locked,
		note_locked: p.flags.note_locked,

		fav_count: p.fav_count,
		score_up: p.score.up,
		score_down: p.score.down,
		comment_count: p.comment_count,

		parent_id: p.relationships.parent_id
	};
}

function convert_post_csv (p) {
	return {
		post_id: parseInt(p.id, 10),
		change_seq: parseInt(p.change_seq, 10),
		created_at: parse_potentially_empty_date(p.created_at),
		updated_at: parse_potentially_empty_date(p.updated_at),
		uploader_id: parseInt(p.uploader_id, 10),
		approver_id: parseInt(p.approver_id, 10),
		is_pending: p.is_pending === 't',
		is_flagged: p.is_flagged === 't',
		is_deleted: p.is_deleted === 't',

		rating: rating(p.rating),
		tags: p.tag_string.split(' ').filter(e => e),
		sources: p.source.split('\n').filter(e => e),
		description: p.description,

		locked_tags: p.locked_tags.split(' ').filter(e => e),
		status_locked: p.is_status_locked,
		rating_locked: p.is_rating_locked,
		note_locked: p.is_note_locked,

		fav_count: parseInt(p.fav_count, 10),
		score_up: parseInt(p.up_score, 10),
		score_down: parseInt(p.down_score, 10),
		comment_count: parseInt(p.comment_count, 10),

		parent_id: parseInt(p.parent_id, 10) || null
	};
}

function convert_file (p) {
	return {
		post_id: p.id,
		given_md5: p.file.md5,
		file_ext: p.file.ext.replace('del.', ''),

		file_size: p.file.size,
		width: p.file.width,
		height: p.file.height,

		status: null,
		actual_md5: null
	};
}

function convert_file_csv (p) {
	return {
		post_id: parseInt(p.id, 10),
		given_md5: p.md5,
		file_ext: p.file_ext.replace('del.', ''),

		file_size: parseInt(p.file_size, 10),
		width: parseInt(p.image_width, 10),
		height: parseInt(p.image_height, 10),

		status: null,
		actual_md5: null
	};
}

export default {
	post: convert_post,
	post_csv: convert_post_csv,

	file: convert_file,
	file_csv: convert_file_csv
};
