insert into e621.change_history 
select * from json_populate_recordset(null::e621.change_history, $1::json)
on conflict (change_seq) do nothing;
