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

init().then(destroy);
