insert into fn.posts 
select * from json_populate_recordset(null::fn.posts, $1::json)
on conflict (post_id, post_type) do update set
	creator_id = EXCLUDED.creator_id,
	created_at = EXCLUDED.created_at,
	--
	title = EXCLUDED.title,
	description = EXCLUDED.description,
	rating = EXCLUDED.rating,
	--
	file_size = EXCLUDED.file_size,
	tags = EXCLUDED.tags,
	--
	views = EXCLUDED.views,
	promotes = EXCLUDED.promotes,
	comments = EXCLUDED.comments,
	fav_count = EXCLUDED.fav_count;