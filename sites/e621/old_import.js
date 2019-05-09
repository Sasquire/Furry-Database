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
const utils = require('./../../utils.js');
const db = utils.db
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const jsonStream = StreamArray.withParser();

const insert_sql = utils.sql.e621.insert_files;
const filename = '';

let data = [];
jsonStream.on('data', async ({key, value}) => {
	if(data.length < 1000){
		data.push(JSON.parse(value.row_to_json))
	}
	if(data.length == 1000) {
		db.query(insert_sql, [JSON.stringify(data)])
			.then(() => console.log(`Imported ${key} entries`))
			.catch(console.log)
		data = []
	}
});

jsonStream.on('end', () => {
	db.query(insert_sql, [JSON.stringify(data)])
		.then(() => db.end())
		.then(() => console.log('All done'))
		.catch(console.log)
});

fs.createReadStream(filename).pipe(jsonStream.input);