const fs = require('fs');
const { Pool } = require('pg');
const db = new Pool({
	host: 'localhost',
	database: 'e621',
	port: 5432,
	user: '',
	password: '',

	multipleStatements: true
});
const dir = __dirname;
const user_agent = 'Here is a test user Agent';
// todo switch to something else
const e621 = new (require(dir+'/e621_api/api.js'))(user_agent);
require(dir+'/e621_api/extras.js');

async function init(){
	return db.query(fs.readFileSync(dir+'/sql/init.sql', 'utf8'))
		.then(() => console.log('Initiated'))
		.catch(console.log);
}

async function destroy(){
	return db.query(fs.readFileSync(dir+'/sql/destroy.sql', 'utf8'))
		.then(() => console.log('Deleted'))
		.catch(console.log);
}

async function add_post_to_db(post_id){
	// todo handle when post 404's
	const data = await e621.post_show_id(post_id);
	const as_db_obj = [convert_to_post_obj(data)];
	await db.query(add_posts_to_db_query[0], [JSON.stringify(as_db_obj)]);
	if(data.status != 'deleted'){
		const as_md5_obj = [convert_to_post_md5_obj(data)];
		await db.query(add_posts_to_db_query[1], [JSON.stringify(as_md5_obj)]);
	}
}

// splitting it on \n\n isnt that great of an idea
// but pg can't insert multiple commands into a prepared statement 
// so this was the second best thing I could think of
// I'm not a fan of the global variable, but I don't
// wan't to read the file every time.
const add_posts_to_db_query = fs.readFileSync(dir+'/sql/insert_posts.sql', 'utf8').split('\n\n');
async function add_posts_to_db(post_array){
	const good_posts = post_array.map(convert_to_post_obj);
	const good_md5s  = post_array.filter(e => e.status != 'deleted')
		.map(convert_to_post_md5_obj)
	await db.query(add_posts_to_db_query[0], [JSON.stringify(good_posts)])
	await db.query(add_posts_to_db_query[1], [JSON.stringify(good_md5s)]);
	return;
}

function convert_to_post_md5_obj(raw_e621){
	return {
		post_id:  raw_e621.id,
		md5:      raw_e621.md5,
		file_ext: raw_e621.file_ext,
	}
}

function convert_to_post_obj(raw_e621){
	return {
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

		file_size: raw_e621.file_size,
		width:     raw_e621.width,
		height:    raw_e621.height,

		fav_count: raw_e621.fav_count,
		score:     raw_e621.score,
		parent_id: raw_e621.parent_id
	}
}

async function daily_post_adding(){
	const response = await db.query('select max(change_id) from posts;');
	const max_change = response.rows[0].max;
	console.log(`Max known change_id is ${max_change}`);

	let page_num = 1;
	while(true){
		console.log(`Downloading page ${page_num}`);
		const posts = await e621.post_list({
			tags: `change:>${max_change} order:change`,
			page: page_num
		});
		await add_posts_to_db(posts);

		if(posts.length <= 320){ break; }
		page_num++;
	}

	// todo check deleted_index / flagged_index
}

async function large_post_adding(){
	let lowest_id_known = 50; // 1 billion
	while(true){ // will force break;
		console.log(`Checking posts below id:${lowest_id_known}`);
		
		const raw_posts = await e621.$before_id_dense(lowest_id_known);
		const posts = raw_posts.filter(p => p.status != 'destroyed');
		if(posts.length == 0){ break; }
		
		await add_posts_to_db(posts);
		lowest_id_known = posts.sort((a, b) => b.id - a.id).slice(-1)[0].id;
	}
}

async function parse_args(){
	await init();

	const args = process.argv.slice(2).map(e => e.toLowerCase());
	switch(args[0]){
		case 'u':
		case 'a':
		case 'update':
		case 'add': (() => { switch(args[1]){
			case 'daily': return daily_post_adding();
			case 'large': return large_post_adding();
			case 'post' : return add_post_to_db(parseInt(args[2], 10));	
		}})(); break;
	}
}

parse_args();