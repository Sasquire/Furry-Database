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

	if not exists (select 1 from enum_info where enum_name = 'post_status') then
		create type e621.post_status as enum (
			'pending',
			'active',
			'flagged',
			'deleted',
			'destroyed'
		);
	end if;

	if not exists (select 1 from enum_info where enum_name = 'file_type') then
		create type e621.file_type as enum (
			'png',
			'jpg',
			'gif',
			'swf',
			'webm'
		);
	end if;

	if not exists (select 1 from enum_info where enum_name = 'tag_type') then
		create type e621.tag_type as enum (
			'general',
			'artist',
			'copyright',
			'character',
			'species'
		);
	end if;

	drop view enum_info;
end $$;

-- has_notes and has_comments are ignored because
-- if you really want those, just download the
-- comments. it can't be that large
create table if not exists e621.change_history (
	post_id     int not null,
	change_seq  int not null,
	created_at  timestamp without time zone not null,
	updated_at  timestamp without time zone not null,
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
	file_size int not null,
	width     int not null,
	height    int not null,
	--
	fav_count     int not null,
	score_up      int not null,
	score_down    int not null,
	comment_count int not null,
	--
	parent_id int null,
	given_md5 char(32) not null,
	--
	constraint posts_pkey primary key (change_seq)
);

create table if not exists e621.files (
	given_md5  char(32) not null,
	file_type  e621.file_type not null,
	status     char(4),
	actual_md5 char(32),
	--
	constraint files_pk            primary key (given_md5),
	constraint files_un_actual_md5 unique (actual_md5)
);

create table if not exists e621.pools (
	post_id int not null,
	pool_id int not null
);

create table if not exists e621.tags (
	tag_id    int not null,
	tag_name  text not null,
	tag_type  e621.tag_type not null,
	--
	constraint tags_pk       primary key (tag_id) --,
	-- this is not true, do more research
--	constraint tags_un_name  unique (tag_name)
);

--do $$ begin
--	if not exists (select 1 from pg_class where relname = 'e621_post_tags_gin') then
--		create index post_tags_gin on e621.posts using gin(tags);
--	end if;
--	--more indexes here...
--end$$;

create or replace view e621.urls as (
	select
		given_md5,
		file_type,
		status,
		concat(
			'https://static1.e621.net/data/',
			substring(given_md5, 1, 2),
			'/',
			substring(given_md5, 3, 2),
			'/',
			given_md5,
			'.',
			file_type
		) as url
	from e621.files
);