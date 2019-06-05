update fn.files set
	status = substring($3, 1, 4), -- ensure that is always 4 characters long
	actual_md5 = $4
where
	post_id = $1
	and post_type = $2
-- call it like (post_id, post_type, status, md5)