/* eslint-disable global-require */
const args = require('minimist')(process.argv.slice(2));
const utils = require('./utils/utils.js');
const logger = utils.logger('start');
utils.logger_level(args.debug);

const sites = {
	e621: require('./sites/e621/e621.js'),
	furry_network: require('./sites/furry_network/furry_network.js'),
	general: {
		none: () => logger.error('Unknown command'),
		"don't do this it drops the db": async () => {
			logger.debug('Deleting the database');
			await run_all_scripts_named('destroy');
			logger.d_log('Database deleted');
		},
		every: async () => {
			logger.debug('Running all sql init scripts');
			await run_all_scripts_named('init');
			logger.d_log('Initiated');
		}
	}
};

async function run_all_scripts_named (script_name) {
	const scripts = Object.values(utils.sql)
		.reduce((acc, e) => [...acc, ...Object.entries(e)], [])
		.filter(([n, v]) => n === script_name)
		.map(([n, v]) => v)
		.map(e => utils.db.query(e));

	return Promise.all(scripts).catch(logger.d_error);
}

async function run () {
	logger.d_log('Started');
	await sites.general.every();

	const site_string = args.s || args.schema || 'none';
	const site = sites[site_string] || null;
	const command_string = args.c || args.command || 'none';
	const command = site === null ? null : (site[command_string] || null);

	try {
		if (site_string === 'none' || site === null) {
			logger.error('Incorrect site option (-s). Acceptable options are:');
			logger.error(`[${Object.keys(sites).join(', ')}]`);
		} else if (command_string === 'none' || command === null) {
			logger.error(`Incorrect command option (-c). Acceptable options for ${site_string} are:`);
			logger.error(`[${Object.keys(site).join(', ')}]`);
		} else {
			await command(...args._);
		}
	} catch (e) {
		logger.d_error('Something went wrong');
		logger.error(e);
	} finally {
		await utils.db.close();
		logger.d_log('Closing ');
		console.log(); // Log an actual newline
	}
}

run();
