const md5_f = require('./md5.js');

// The only two things that should be used from here are
// set to set the debug level (this is only used in the start) and
// create to create labeled loggers.
// Everything else will be from the functions given by `create`
const logger_utils = {
	// Lower level means more is printed
	level: 20,
	levels: {
		all: 40,
		debug: 30,
		info: 20,
		error: 10
	},

	// Key to identify this instance of the program
	key: Buffer.from(md5_f(new Date().toString()))
		.toString('base64')
		.substring(0, 4),

	set: (name) => (logger_utils.level = logger_utils.levels[name] || 20),
	get: (name) => logger_utils.levels[name] || 0,
	print: (string, level) => {
		// If current level is greater than target level
		if (logger_utils.level >= logger_utils.get(level)) {
			console.log(string);
		}
	},

	create: (title) => ({
		error: logger_utils.make('error', title, false),
		log: logger_utils.make('info', title, false),
		debug: logger_utils.make('debug', title, false),
		all: logger_utils.make('all', title, false),
		d_error: logger_utils.make('error', title, true),
		d_log: logger_utils.make('info', title, true),
		d_debug: logger_utils.make('debug', title, true),
		d_all: logger_utils.make('all', title, false)
	}),

	make: (level, title, should_date) => {
		const key = logger_utils.key;
		const format = (str, should_date) => {
			const front = `${key}-${level}:\t${title}\t`;
			const date = `${new Date().toISOString()}\t`;
			const end = str;
			return front + (should_date ? date : '') + end;
		};

		const this_logger = (text = '') => {
			const string = (text.stack || text.toString() || '')
				.split('\n')
				.map(e => format(e, should_date))
				.join('\n');
			logger_utils.print(string, level);
		};

		return this_logger;
	}
};

module.exports = {
	logger: logger_utils.create,
	logger_level: logger_utils.set
};
