insert into e621.posts 
	select *
	from json_populate_recordset(null::e621.posts, $1::json)
on conflict (post_id)
do update set
	change_seq = EXCLUDED.change_seq,
	created_at = EXCLUDED.created_at,
	updated_at = EXCLUDED.updated_at,
	uploader_id = EXCLUDED.uploader_id,
	approver_id = EXCLUDED.approver_id,
	is_pending = EXCLUDED.is_pending,
	is_flagged = EXCLUDED.is_flagged,
	is_deleted = EXCLUDED.is_deleted,
	-- 
	rating = EXCLUDED.rating,
	tags = EXCLUDED.tags,
	sources = EXCLUDED.sources,
	description = EXCLUDED.description,
	--
	locked_tags = EXCLUDED.locked_tags,
	status_locked = EXCLUDED.status_locked,
	rating_locked = EXCLUDED.rating_locked,
	note_locked = EXCLUDED.note_locked,
	--
	fav_count = EXCLUDED.fav_count,
	score_up = EXCLUDED.score_up,
	score_down = EXCLUDED.score_down,
	comment_count = EXCLUDED.comment_count,
	--
	parent_id = EXCLUDED.parent_id;