insert into posts 
select * from json_populate_recordset(null::posts, $1::json)
on conflict (post_id) do nothing;

insert into post_md5s
select * from json_populate_recordset(null::post_md5s, $1::json)
on conflict (post_id) do nothing;