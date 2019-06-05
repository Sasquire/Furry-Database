update e621.files set
	status = substring($2, 1, 4), -- ensure that is always 4 characters long
	actual_md5 = $3
where post_id = $1
-- call it like (post_id, status, md5)