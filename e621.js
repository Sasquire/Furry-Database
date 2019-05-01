const utils = require('./utils.js');
const db = utils.db
const sql = utils.sql.e621;
const e621 = utils.e621_api;

function file_obj(e621_json){ return {
	post_id:  e621_json.id,
	md5:      e621_json.md5,
	file_ext: e621_json.file_ext,
}}

function post_obj(e621_json){ return {
	post_id:      e621_json.id,
	change_id:    e621_json.change,
	status:       e621_json.status,
	flag_message: e621_json.delreason || '',
	created_at:   new Date(e621_json.created_at.s*1000 + (e621_json.created_at.n/1000000000)),
	creator_id:   e621_json.creator_id || 0,

	rating: (() => { switch(e621_json.rating){
		case 'e': return 'explicit'
		case 'q': return 'questionable'
		case 's': return 'safe'
	}})(),
	tags:        (e621_json.tags || '').split(' '),
	locked_tags: (e621_json.locked_tags || '').split(' '),
	sources:     e621_json.sources || [],
	description: e621_json.description,

	// post #945332 has 0 width and height
	file_size: e621_json.file_size || 0,
	width:     e621_json.width || 0,
	height:    e621_json.height || 0,

	fav_count: e621_json.fav_count || 0,
	score:     e621_json.score || 0,
	parent_id: e621_json.parent_id
}}

function tag_obj(e621_json){ return {
	tag_id: e621_json.id,
	tag_name: e621_json.name,
	tag_type: (() => { switch(e621_json.type){
		case 0: return 'general';
		case 1: return 'artist';
		case 3: return 'copyright';
		case 4: return 'character';
		case 5: return 'species';
	}})()
}}

async function add_post_to_db(post_id, message){
	const data = await e621.post_show_id(post_id);
	if(message === true){ console.log(`Adding post ${post_id} to db`); }
	if(data.status == 'destroyed'){ return; }
	return add_posts_to_db([data]);
}

async function add_posts_to_db(raw_posts){
	const posts = raw_posts.map(post_obj);
	await db.query(sql.insert_posts, [JSON.stringify(posts)])

	const files = raw_posts
		.filter(e => e.status != 'deleted' && e.status != 'destroyed')
		.map(file_obj);
	
	await db.query(sql.insert_files, [JSON.stringify(files)]);
}

async function daily_post_adding(time_shift){
	await regular_update();
	console.log('### Checking the next half ###');
	// todo flagged_check();
	await deleted_check();

	async function get_max_change(){
		return db.query(sql.max_change)
			.then(e => e.rows[0].max)
	}

	async function get_post_status(post_id){
		return db.query(sql.post_status, [post_id])
			.then(p => ({
				status: p.rows[0] ? p.rows[0].status : 'unknown',
				post_id: post_id
			}))
	}

	async function regular_update(){
		console.log(`Doing the daily update based on change id.`);
		const max_known = await get_max_change();
		const max_change = max_known - (time_shift * 1000);
		console.log(`Max known change_id is ${max_known} starting at ${max_change}`);

		for(let page_num = 1; true; page_num++){
			console.log(`Downloading page ${page_num} of posts`);
			const posts = await e621.post_list({
				tags: `change:>${max_change} order:change`,
				page: page_num
			});
			await add_posts_to_db(posts);

			if(posts.length < 320){ break; }
		}

		const new_max = await get_max_change();
		console.log(`Caught up on posts. New max change_id is ${new_max}`);
	}

	// assumes that any post that may show up as
	// deleted is already in the database
	async function deleted_check(){
		for(let page_num = 1; true; page_num++){
			console.log(`Downloading page ${page_num} of deleted index`);
			const deleted = await e621.post_deleted_index(page_num);
			const db_status = await Promise.all(
				deleted
					.map(e => e.id)
					.map(get_post_status)
			)

			const to_update = db_status
				.filter(e => e.status != 'deleted')
				.map(e => e.post_id);
			if(to_update.length != 0){
				console.log(`Updating deleted posts ${to_update.join(' ')}`);
				await Promise.all(to_update.map(add_post_to_db));
			}

			const was_deleted = db_status.some(e => e.status == 'deleted')
			const because_deleted = was_deleted && time_shift == 0
			const because_page_lim = time_shift != 0 && page_num > (time_shift * 2)
			// only stop if there was a deleted an not time shifted
			// or because we hit the time shifted limit
			if(because_deleted || because_page_lim){ break; }
		}
		console.log('Caught up on deleted index.');
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
	max_known_id = max_known_id || await max_tag();
	while(true){
		console.log(`Downloading tags above tag_id:${max_known_id}`)
		const raw_tags = await e621.tag_list({
			order: 'id',
			show_empty_tags: 1,
			after_id: max_known_id
		});
		if(raw_tags.length == 0){ return; }

		const tags = raw_tags.map(tag_obj);
		await db.query(sql.insert_tags, [JSON.stringify(tags)]);
		max_known_id = tags.slice(-1)[0].tag_id;
	}

	function max_tag(){
		return db.query(sql.max_tag)
			.then(e => e.rows[0] ? e.rows[0].max : 0)
	}
}

module.exports = {
	post: add_post_to_db,
	daily: daily_post_adding,
	large: large_post_adding,
	tags: update_tags
}