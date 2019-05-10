insert into e621.downloads values ($1, substring($2, 1, 4))
on conflict (post_id) do update set
	status = EXCLUDED.status;
-- ensure that is always 4 characters long
-- better safe than sorry