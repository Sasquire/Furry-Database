const fs = require('fs');
const { Pool } = require('pg');

const options = {
	user_agent: 'Here is a test user Agent',
	large_daily: {
		post: 5000,
		deleted: 10
	},
	postgres_info: {
		host: 'localhost',
		database: 'e621',
		port: 5432,
		user: '',
		password: '',
	
		multipleStatements: true
	}
}

const db = new Pool(options.postgres_info);
const e621 = new (require(__dirname+'/e621_api/api.js'))(options.user_agent);
require(__dirname+'/e621_api/extras.js');

const sql = {
	init: fs.readFileSync(__dirname+'/sql/init.sql', 'utf8'),
	destroy: fs.readFileSync(__dirname+'/sql/destroy.sql', 'utf8'),
	insert_posts: fs.readFileSync(__dirname+'/sql/insert_posts.sql', 'utf8'),
	insert_md5s: fs.readFileSync(__dirname+'/sql/insert_post_md5s.sql', 'utf8'),
	insert_tags: fs.readFileSync(__dirname+'/sql/insert_tags.sql', 'utf8')
}

async function init(){
	return db.query(sql.init)
		.then(() => stamped_message('Initiated'))
		.catch(console.log);
}

async function destroy(){
	return db.query(sql.destroy)
		.then(() => stamped_message('Database deleted'))
		.catch(console.log);
}

async function add_post_to_db(post_id){
	const data = await e621.post_show_id(post_id);
	return add_posts_to_db([data]);
}

async function add_posts_to_db(post_array){
	const good_posts = post_array.map(convert_to_post_obj);
	await db.query(sql.insert_posts, [JSON.stringify(good_posts)])

	const good_md5s  = post_array
		.filter(e => e.status != 'deleted' && e.status != 'destroyed')
		.map(convert_to_post_md5_obj)
	await db.query(sql.insert_md5s, [JSON.stringify(good_md5s)]);
}

function convert_to_post_md5_obj(raw_e621){ return {
	post_id:  raw_e621.id,
	md5:      raw_e621.md5,
	file_ext: raw_e621.file_ext,
}}

function convert_to_post_obj(raw_e621){ return {
	post_id:      raw_e621.id,
	change_id:    raw_e621.change,
	status:       raw_e621.status,
	flag_message: raw_e621.delreason || '',
	created_at:   new Date(raw_e621.created_at.s*1000 + (raw_e621.created_at.n/1000000000)),
	creator_id:   raw_e621.creator_id || 0,

	rating: (() => { switch(raw_e621.rating){
		case 'e': return 'explicit'
		case 'q': return 'questionable'
		case 's': return 'safe'
	}})(),
	tags:        (raw_e621.tags || '').split(' '),
	locked_tags: (raw_e621.locked_tags || '').split(' '),
	sources:     raw_e621.sources || [],
	description: raw_e621.description,

	// post #945332 has 0 width and height
	file_size: raw_e621.file_size || 0,
	width:     raw_e621.width || 0,
	height:    raw_e621.height || 0,

	fav_count: raw_e621.fav_count || 0,
	score:     raw_e621.score || 0,
	parent_id: raw_e621.parent_id
}}

async function daily_post_adding(download_extra){
	await regular_update();
	console.log();
	// todo flagged_check();
	await deleted_check();

	async function regular_update(){
		console.log(`Doing the daily update based on change id.${download_extra ? ' Extra posts are being downloaded.' : ''}`);
		const max_known = await db.query('select max(change_id) from posts;').then(e => e.rows[0].max)
		const max_change = max_known - (download_extra ? options.large_daily.post : 0)
		console.log(`Max known change_id is ${max_known} starting at ${max_change}`);

		let page_num = 1;
		while(true){
			console.log(`Downloading page ${page_num} of posts`);
			const posts = await e621.post_list({
				tags: `change:>${max_change} order:change`,
				page: page_num
			});
			await add_posts_to_db(posts);

			if(posts.length < 320){ break; }
			page_num++;
		}

		const new_max = await db.query('select max(change_id) from posts;').then(e => e.rows[0].max)
		console.log(`Caught up on posts. New max change_id is ${new_max}`);
	}

	// assumes that any post that may show up as
	// deleted is already in the database
	async function deleted_check(){
		let page_num = 1;
		while(true){
			console.log(`Downloading page ${page_num} of deleted index`);
			const deleted = await e621.post_deleted_index(page_num);
			const db_status = await Promise.all(
				deleted.map(e => 
					db.query(`select status from posts where post_id = ${e.id}`)
						.then(p => ({
							status: p.rows[0] ? p.rows[0].status : 'unknown',
							post_id: e.id
						}))
				)
			)

			const to_update = db_status
				.filter(e => e.status != 'deleted')
				.map(e => e.post_id)
			if(to_update.length != 0){
				console.log(`Updating deleted posts ${to_update.join(' ')}`);
				await Promise.all(to_update.map(add_post_to_db));
			}

			const was_deleted = db_status.some(e => e.status == 'deleted')
			const because_deleted = was_deleted && !download_extra
			const because_page_lim = download_extra && page_num > options.large_daily.deleted
			if(because_deleted || because_page_lim){
				console.log('Caught up on deleted index.');
				return;
			}
			page_num++;
		}
	}
}

async function large_post_adding(lowest_id_known){
	lowest_id_known = lowest_id_known || 1e9; // 1 billion
	while(true){ // will force break;
		console.log(`Checking posts below id:${lowest_id_known}`);
		
		const raw_posts = await e621.$before_id_dense(lowest_id_known);
		const posts = raw_posts.filter(p => p.status != 'destroyed');
		if(posts.length == 0){ break; }
		
		await add_posts_to_db(posts);
		lowest_id_known = posts.sort((a, b) => b.id - a.id).slice(-1)[0].id;
	}
}

// todo a method for specific tags?
// or even a daily tag update
async function update_tags(max_known_id){
	if(max_known_id < 0){
		max_known_id = await db.query('select max(tag_id) from tags').then(e => e.rows[0].max)
	}
	max_known_id = max_known_id || 0;
	while(true){
		console.log(`Downloading tags above tag_id:${max_known_id}`)
		const raw_tags = await e621.tag_list({
			order: 'id',
			show_empty_tags: 1,
			after_id: max_known_id
		});
		if(raw_tags.length == 0){ return; }

		const tags = raw_tags.map(to_db_tag);
		await db.query(sql.insert_tags, [JSON.stringify(tags)]);
		max_known_id = tags.slice(-1)[0].tag_id;
	}

	function to_db_tag(raw_e621){ return {
		tag_id: raw_e621.id,
		tag_name: raw_e621.name,
		tag_type: (() => { switch(raw_e621.type){
			case 0: return 'general';
			case 1: return 'artist';
			case 3: return 'copyright';
			case 4: return 'character';
			case 5: return 'species';
		}})()
	}}
}

async function parse_args(){
	stamped_message('Started')
	await init(); // should this run every time?
	console.log('|----------------------------------|');

	const args = process.argv.slice(2).map(e => e.toLowerCase());
	switch(args[0]){
		case 'post': await (() => { switch(args[1]){
			case 'daily': return daily_post_adding(args[2] || false);
			case 'large': return large_post_adding(parseInt(args[2], 10));
			default     : return add_post_to_db(parseInt(args[1], 10));	
		}})(); break;
		case 'tag': await update_tags(parseInt(args[1], 10)); break; 
		case 'dont do this it drops the db': await destroy(); break;
	}

	await db.end()
	console.log('|----------------------------------|');
	stamped_message('Closing')
	console.log();
}

function stamped_message(msg){
	console.log(`${msg} - ${new Date().toISOString()}`)
}

parse_args();