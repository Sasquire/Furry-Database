insert into e621.md5s
select * from json_populate_recordset(null::e621.md5s, $1::json)
on conflict do nothing;
