update e621.files as old
set (status, actual_md5) = (substring(new.status, 1, 4), new.actual_md5)
from json_populate_recordset(null::e621.files, $1::json) as new
where new.given_md5 = old.given_md5;
