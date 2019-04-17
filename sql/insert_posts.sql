insert into posts 
select * from json_populate_recordset(null::posts, $1::json)
on conflict (post_id) do update set
	change_id = EXCLUDED.change_id,
	created_at = EXCLUDED.created_at,
	status = EXCLUDED.status,
	flag_message = EXCLUDED.flag_message,
	rating = EXCLUDED.rating,
	tags = EXCLUDED.tags,
	locked_tags = EXCLUDED.locked_tags,
	sources = EXCLUDED.sources,
	fav_count = EXCLUDED.fav_count,
	score = EXCLUDED.score,
	description = EXCLUDED.description,
	parent_id = EXCLUDED.parent_id;
-- creator_id, file_size, width, and height never change