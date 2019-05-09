insert into fn.files
select * from json_populate_recordset(null::fn.files, $1::json)
on conflict (post_id, post_type) do nothing;
-- should never replace md5s 