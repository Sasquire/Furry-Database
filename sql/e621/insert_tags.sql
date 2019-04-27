insert into e621.tags 
select * from json_populate_recordset(null::e621.tags, $1::json)
on conflict (tag_id) do update set
	tag_type = EXCLUDED.tag_type;
-- tag_id and tag_name never change
-- they are stuck together