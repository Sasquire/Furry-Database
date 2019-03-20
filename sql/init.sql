do $$ begin
	if not exists (select 1 from pg_type where typname = 'post_rating') then
		create type post_rating as enum (
			'explicit',
			'questionable',
			'safe'
		);
	end if;

	if not exists (select 1 from pg_type where typname = 'post_status') then
		create type post_status as enum (
			'pending',
			'active',
			'flagged',
			'deleted',
			'destroyed'
		);
	end if;
	
	if not exists (select 1 from pg_type where typname = 'file_type') then
		create type file_type as enum (
			'png',
			'jpg',
			'gif',
			'swf',
			'webm'
		);
	end if;
	--more types here...
end$$;

-- has_notes and has_comments are ignored because
-- if you really want those, just download the
-- comments. it can't be that large
create table if not exists posts (
	post_id      int not null,
	change_id    int not null,
	status       post_status not null,
	flag_message text not null default ''::text,
	created_at   timestamp without time zone not null,
	creator_id   int not null,
	-- 
	rating      post_rating not null,
	tags        text[] not null,
	locked_tags text[] not null default array[]::text[],
	sources     text[] not null default array[]::text[],
	description text not null default ''::text,
	--
	file_size int not null,
	width     int not null,
	height    int not null,
	--
	fav_count int not null,
	score     int not null,
	--
	parent_id int null,
	--
	constraint posts_pkey         primary key (post_id),
	constraint posts_un_change_id unique (change_id)
);

create table if not exists post_md5s (
	post_id  int not null,
	md5      char(32) not null,
	file_ext file_type not null,
	--
	constraint post_md5s_pk       primary key (post_id),
	constraint post_md5s_un_md5   unique (md5),
	constraint post_md5s_posts_fk foreign key (post_id) references posts(post_id)
);