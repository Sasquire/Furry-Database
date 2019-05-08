insert into fn.collections 
select * from json_populate_recordset(null::fn.collections, $1::json)
on conflict (post_id, post_type, collection) do nothing;