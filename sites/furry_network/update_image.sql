update fn.files set
	status = substring($1, 1, 4), -- ensure that is always 4 characters long
	actual_md5 = $2
where
	post_id = $3
	and post_type = $4
-- call it like (post_id, post_type, status, md5)