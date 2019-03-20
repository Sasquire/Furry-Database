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

/* async function add_post_to_db(post){

} */

const add_posts_to_db_query = fs.readFileSync(dir+'/sql/insert_posts.sql', 'utf8').split('\n\n');
async function add_posts_to_db(post_array){
	const good_posts = JSON.stringify(post_array.map(convert_to_post_obj));
	const good_md5s  = JSON.stringify(post_array
		.filter(e => e.md5)
		.map(convert_to_post_md5_obj)
	);
	return db.query(add_posts_to_db_query[0], [good_posts])
		.then(() => db.query(add_posts_to_db_query[1], [good_md5s]))
		.catch(e => {
			console.log(e, ' error');
			throw e;
		});
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

destroy()
	.then(e => init())
	.then(e => e621.$before_id_dense(1000000))
	.then(e => add_posts_to_db(e))
	.then(e => init())
	.catch(e => console.log(e));
