const options = require('./options.js');
const { Pool } = require('pg');
const db = new Pool(options.postgres_info);
db.on('error', () => false);

// Used like query(sql.script, $1, $2, $3, $4);
async function query (script, ...fills) {
	// No catch, because we let other functions do that
	return db.query(script, fills.map(e => JSON.stringify(e)))
		.then(e => e.rows);
}

// Used for when you don't want to stringify
async function query_raw (script, ...fills) {
	// No catch, because we let other functions do that
	return db.query(script, fills)
		.then(e => e.rows);
}

module.exports = {
	query: query,
	query_raw: query_raw,
	close: () => db.end()
};
