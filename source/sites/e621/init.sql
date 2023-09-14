do $$ begin
	if not exists (select 1 from information_schema.schemata where schema_name = 'e621') then
		create schema e621;
	end if;
end $$;

do $$ begin
	-- https://stackoverflow.com/questions/9540681/list-postgres-enum-type
	create temporary view enum_info as (
		select 
			n.nspname as enum_schema,
			t.typname as enum_name
		from pg_type as t 
		join pg_catalog.pg_namespace as n on(n.oid = t.typnamespace)
		where n.nspname = 'e621'
	);

	if not exists (select 1 from enum_info where enum_name = 'post_rating') then
		create type e621.post_rating as enum (
			'explicit',
			'questionable',
			'safe'
		);
	end if;

	if not exists (select 1 from enum_info where enum_name = 'file_ext') then
		create type e621.file_ext as enum (
			'png',
			'jpg',
			'gif',
			'swf',
			'webm'
		);
	end if;

-- 	if not exists (select 1 from enum_info where enum_name = 'tag_type') then
-- 		create type e621.tag_type as enum (
-- 			'general', -- 0
-- 			'artist', -- 1
-- 			'copyright', -- 3
-- 			'character', -- 4
-- 			'species', -- 5
-- 			'invalid', --6
-- 			'meta', -- 7
-- 			'lore' -- 8
-- 		);
-- 	end if;

	drop view enum_info;
end $$;

create table if not exists e621.posts (
	post_id     int not null,
	change_seq  int not null,
	created_at  timestamp without time zone not null,
	updated_at  timestamp without time zone not null,
	uploader_id int not null,
	approver_id int null,
	is_pending  boolean not null,
	is_flagged  boolean not null,
	is_deleted  boolean not null,
	-- 
	rating      e621.post_rating not null,
	tags        text[] not null,
	sources     text[] not null default array[]::text[],
	description text not null default ''::text,
	--
	locked_tags   text[] not null default array[]::text[],
	status_locked boolean not null,
	rating_locked boolean not null,
	note_locked   boolean not null,
	--
	fav_count     int not null,
	score_up      int not null,
	score_down    int not null,
	comment_count int not null,
	--
	parent_id int null,
	--
	constraint posts_pkey primary key (post_id)
);

create table if not exists e621.files (
	post_id    int not null,
	given_md5  char(32) not null,
	file_ext  e621.file_ext not null,
	--
	file_size  int not null,
	width      int not null,
	height     int not null,
	--
	status     char(4),
	actual_md5 char(32),
	--
	constraint files_pk            primary key (given_md5),
	constraint files_un_actual_md5 unique (actual_md5),
	constraint files_fk_post_id    foreign key (post_id) references e621.posts (post_id)
);

-- create table if not exists e621.pools (
-- 	post_id int not null,
-- 	pool_id int not null
-- );
-- 
-- create table if not exists e621.tags (
-- 	tag_id    int not null,
-- 	tag_name  text not null,
-- 	tag_type  e621.tag_type not null,
-- 	--
-- 	constraint tags_pk       primary key (tag_id) --,
-- 	-- this is not true, do more research
-- --	constraint tags_un_name  unique (tag_name)
-- );

--do $$ begin
--	if not exists (select 1 from pg_class where relname = 'e621_post_tags_gin') then
--		create index post_tags_gin on e621.posts using gin(tags);
--	end if;
--	--more indexes here...
--end$$;

create or replace view e621.urls as (
	select
		given_md5,
		file_ext,
		status,
		concat(
			'https://static1.e621.net/data/',
			substring(given_md5, 1, 2),
			'/',
			substring(given_md5, 3, 2),
			'/',
			given_md5,
			'.',
			file_ext
		) as url,
		concat(
			'/',
			substring(given_md5, 1, 2),
			'/',
			substring(given_md5, 3, 2),
			'/',
			given_md5,
			'.',
			file_ext
		) as path
	from e621.files
);