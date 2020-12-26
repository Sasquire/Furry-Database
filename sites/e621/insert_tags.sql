insert into e621.tags 
select * from json_populate_recordset(null::e621.tags, $1::json)
on conflict (tag_id) do nothing;
