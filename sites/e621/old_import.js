/*
This is sort of meant to be a hidden feature.
I don't expect anyone to actually use it
It may make its way into the actual tools at
one point.

You need to edit this to have a path to
a json file, and edit the appropriate
insert_sql. The json is expected to be
exported from the database with the
following sql

select row_to_json(<table>) from <table>;
*/

// https://stackoverflow.com/questions/42896447/parse-large-json-file-in-nodejs-and-handle-each-object-independently
const utils = require('./../../utils/utils.js');
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const jsonStream = StreamArray.withParser();
const query = utils.db.query;

let insert_sql = null;
const filename = process.argv.slice(2)[0];
const type = process.argv.slice(2)[1];

function old_to_new_file(p){
	if(type == 'files'){
		return {
			post_id: p.post_id,
			file_type: p.file_ext,
			given_md5: p.md5,
			actual_md5: p.md5, // Fix post 815298 by hand
			status: null
		};
	} else {
		return p;
	}
}

let data = [];
jsonStream.on('data', async ({key, value}) => {
	if(data.length < 1000){
		data.push(JSON.parse(value.row_to_json));
	}
	if(data.length == 1000) {
		query(insert_sql, data.map(old_to_new_file))
			.then(() => console.log(`Imported ${key} entries`))
			.catch(console.log);
		data = [];
	}
});

jsonStream.on('end', () => {
	query(insert_sql, data.map(old_to_new_file))
		.then(() => console.log('All done'))
		.catch(console.log);
});

if(filename == undefined || filename == ''){
	console.log('No filename found on first argument');
} else if(['post', 'files'].includes(type) == false){
	console.log('No correct type on second argument');
} else {
	const sql_type = type == 'files' ? 'insert_files' : 'insert_posts';
	insert_sql = utils.sql.e621[sql_type];

	fs.createReadStream(filename).pipe(jsonStream.input);
}
