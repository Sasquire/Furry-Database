import pg from 'pg';
import environment_variables from './environment_variables.js';
const { Pool } = pg; // Because CommonJS Module

const db = new Pool({
	user: environment_variables.POSTGRES_USER,
	password: environment_variables.POSTGRES_PASSWORD,
	database: environment_variables.POSTGRES_DB,

	port: environment_variables.PORT ?? 5432,
	host: environment_variables.HOST ?? 'database'
});
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

function close () {
	return db.end();
}

export {
	query,
	query_raw,
	close
};
