insert into e621.posts_change_seq 
select * from json_populate_recordset(null::e621.posts_change_seq, $1::json)
on conflict do nothing;
