const { db, sql } = require('./utils.js');

function run_all_scripts_named(name){
	const scripts = Object.values(sql)
		.reduce((acc, e) => [...acc, ...Object.entries(e)], [])
		.filter(([n, v]) => n == name)
		.map(([n, v]) => v)
		.map(e => db.query(e));

	return Promise.all(scripts);
}

async function init(){
	return run_all_scripts_named('init')
		.then(() => stamped_message('Initiated'))
		.catch(console.log);
}

async function destroy(){
	return run_all_scripts_named('destroy')
		.then(() => stamped_message('Database deleted'))
		.catch(console.log);
}

const opts = {
	general: {
		init: () => true,
		"dont do this it drops the db": () => destroy()
	},
	e621: {
		post: {
			daily: (time_shift) => {
				time_shift = parseInt(time_shift, 10) || 0
				return require('./e621.js').daily(time_shift);
			},
			large: (starting) => {
				starting = parseInt(starting, 10) || 0
				return require('./e621.js').large(starting);
			},
			_: (...ids) => {
				ids = ids.map(e => parseInt(e, 10))
				const add_post = require('./e621.js').post
				return Promise.all(ids.map(e => add_post(e, true)))
			}
		},
		tags: (starting) => {
			starting = parseInt(starting, 10) || 1
			return require('./e621.js').tags(starting);
		}
	}
}

async function parse_args(){
	stamped_message('Started')
	await init(); // should this run every time?
	console.log('|----------------------------------|');
	await (() => {
		const args = process.argv.slice(2).map(e => e.toLowerCase());
		for(let i = 0, last = opts; i < args.length; i++){
			const arg = args[i];
			const next = last[arg];
			const generic = last['_'];
			const rest = args.slice(i);
			if(!next && !generic){
				const expected = Object.keys(last)
					.map(e => `'${e}'`)
					.join(', ');
				return console.log(`Error unknown argument '${arg}' at position ${i}. Expected one of [${expected}]`)
			} else if (!next && generic){
				return generic(...rest)
			} else if(typeof next == 'function'){
				return next(...rest.slice(1));
			} else if(i == args.length-1){
				const expected = Object.keys(next)
					.map(e => `'${e}'`)
					.join(', ');
				return console.log(`No argument at position ${i+1}. Expected one of [${expected}]`)
			} else {
				last = next
			}
		}
	})()
	await db.end()
	console.log('|----------------------------------|');
	stamped_message('Closing')
	console.log();
}

function stamped_message(msg){
	console.log(`${msg} - ${new Date().toISOString()}`)
}

parse_args();