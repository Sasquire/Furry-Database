/* eslint-disable no-unneeded-ternary */
function rating (char) {
	switch (char) {
		case 'e': return 'explicit';
		case 'q': return 'questionable';
		case 's': return 'safe';
		default: return 'error'; // Shouldn't happen. Throws error for db
	}
}

function tag_type (type) {
	switch (type) {
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
		given_md5: e.file.md5,
		file_type: e.file.ext,
		actual_md5: null,
		status: null
	}),

	change_history: (e) => ({
		change_seq: e.change_seq,
		created_at: new Date(e.created_at),
		updated_at: new Date(e.updated_at),
		is_pending: e.flags.pending ? true : false,
		is_flagged: e.flags.flagged ? true : false,
		is_deleted: e.flags.deleted ? true : false,
		approver_id: e.approver_id,

		rating: rating(e.rating),
		tags: Object.values(e.tags || ({ a: [] })).reduce((acc, e) => acc.concat(e)),
		sources: e.sources || [],
		description: e.description || '',

		locked_tags: e.locked_tags || [],
		status_locked: e.flags.status_locked ? true : false,
		rating_locked: e.flags.rating_locked ? true : false,
		note_locked: e.flags.note_locked ? true : false,

		file_size: e.file_size || 0,
		width: e.width || 0,
		height: e.height || 0,

		fav_count: e.fav_count || 0,
		score_up: e.score.up || 0,
		score_down: e.score.down || 0,
		comment_count: e.comment_count || 0,

		given_md5: e.file.md5,

		parent_id: e.parent_id
	}),

	post_change: (e) => ({
		post_id: e.id,
		change_seq: e.change_seq
	}),

	tag: (e) => ({
		tag_id: e.id,
		tag_name: e.name,
		tag_type: tag_type(e.type)
	})
};
