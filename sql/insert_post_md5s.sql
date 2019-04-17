insert into post_md5s
select * from json_populate_recordset(null::post_md5s, $1::json)
on conflict (post_id) do nothing;
-- should never replace md5s 