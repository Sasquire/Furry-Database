update e621.files set
	status = substring($1, 1, 4), -- ensure that is always 4 characters long
	actual_md5 = $2
where given_md5 = $3;
