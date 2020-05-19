update e621.md5s set
	status = substring($2, 1, 4), -- ensure that is always 4 characters long
	actual_md5 = $3
where given_md5 = $1;
