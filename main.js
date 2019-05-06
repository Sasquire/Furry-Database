const args = require('minimist')(process.argv.slice(2));
const { db, sql } = require('./utils.js');

function run_all_scripts_named(name){
	const scripts = Object.values(sql)
		.reduce((acc, e) => [...acc, ...Object.entries(e)], [])
		.filter(([n, v]) => n == name)
		.map(([n, v]) => v)
		.map(e => db.query(e));

	return Promise.all(scripts);
}

function opt_string(obj){
	return `Expecting one of [${Object.keys(obj).map(e => `"${e}"`).join(', ')}]`
}

function stamped_message(msg){
	console.log(`${msg} - ${new Date().toISOString()}`)
}

const opts = {
	general: {
		maintenance: {
			init: () => run_all_scripts_named('init')
				.then(() => stamped_message('Initiated'))
				.catch(console.log),
			"don't do this it drops the db": () => run_all_scripts_named('destroy')
				.then(() => stamped_message('Database deleted'))
				.catch(console.log)
		}
	},
	e621: {
		post: {
			daily: (time_shift) => {
				time_shift = parseInt(time_shift, 10) || 0
				return require('./sites/e621/e621.js').daily(time_shift);
			},
			large: (starting) => {
				starting = parseInt(starting, 10) || 0
				return require('./sites/e621/e621.js').large(starting);
			},
			update: (...ids) => {
				ids = ids.map(e => parseInt(e, 10))
				const add_post = require('./sites/e621/e621.js').post
				return Promise.all(ids.map(e => add_post(e, true)))
			}
		},
		tags: {
			update: (starting) => {
				starting = parseInt(starting, 10) || 1
				return require('./sites/e621/e621.js').tags(starting);
			}
		}
	}
}

async function parse_args(){
	stamped_message('Started')
	await opts.general.maintenance.init(); // should this run every time?
	console.log('|----------------------------------|');
	
	try {
		const schema_string = args.s || args.schema || 'none';
		const group_string = args.g || args.group || 'none';
		const command_string = args.c || args.command || 'none';
		
		const schema = opts[schema_string];
		if(!schema){ throw `Unknown schema "${schema_string}". Use "-s". ${opt_string(opts)}`; }

		const group = schema[group_string];
		if(!group){ throw `Unknown group "${group_string}". Use "-g". ${opt_string(schema)}`; }

		const command = group[command_string];
		if(!command){ throw `Unknown command "${command_string}". Use "-c". ${opt_string(group)}`; }

		await command(...args._);
	} catch(e) {
		console.log(e)
	} finally {
		await db.end()
		console.log('|----------------------------------|');
		stamped_message('Closing')
		console.log();
	}
}

parse_args();