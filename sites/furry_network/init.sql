do $$ begin
	if not exists (select 1 from information_schema.schemata where schema_name = 'fn') then
		create schema fn;
	end if;
end$$;

do $$ begin
	-- https://stackoverflow.com/questions/9540681/list-postgres-enum-type
	create temporary view enum_info as (
		select 
			n.nspname as enum_schema,
			t.typname as enum_name
		from pg_type as t 
		join pg_catalog.pg_namespace as n on(n.oid = t.typnamespace)
		where n.nspname = 'fn'
	);

	if not exists (select 1 from enum_info where enum_name = 'post_rating') then
		create type fn.post_rating as enum (
			'general',
			'mature',
			'explicit'
		);
	end if;

	if not exists (select 1 from enum_info where enum_name = 'file_type') then
		create type fn.file_type as enum (
			'png',
			'jpg',
			'gif',
			'txt',
			'mp3',
			'swf',
			'webm',
			'wav',
			'mp4',
			'unknown'
		);
	end if;

	if not exists (select 1 from enum_info where enum_name = 'post_type') then
		create type fn.post_type as enum (
			'photo',
			'artwork',
			'multimedia',
			'story'
		);
	end if;

	drop view enum_info;
end$$;

create table if not exists fn.posts (
	post_type  fn.post_type not null,
	post_id    int not null,
	--
	created_at  timestamp without time zone not null,
	updated_at  timestamp without time zone not null,
	creator_id  int not null,
	--
	title        text not null default ''::text,
	description  text not null default ''::text,
	rating       fn.post_rating not null,
	--
	file_size  int not null,
	tags       text[] not null,
	--
	views     int not null,
	promotes  int not null,
	comments  int not null,
	fav_count int not null,
	--
	constraint posts_pkey  primary key (post_type, post_id)
);

create table if not exists fn.collections (
	post_type   fn.post_type not null,
	post_id     int not null,
	collection  int not null,
	--
	constraint collections_un_entry unique (post_type, post_id, collection),
	constraint collections_fk  foreign key (post_id, post_type) references fn.posts (post_id, post_type)
);