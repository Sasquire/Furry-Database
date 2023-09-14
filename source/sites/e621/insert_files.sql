insert into e621.files
	select * 
	from json_populate_recordset(null::e621.files, $1::json)
on conflict do nothing;
