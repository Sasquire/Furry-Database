import log4js from 'log4js';

log4js.configure({
	appenders: { out: { type: 'stdout', layout: { type: 'colored' } } },
	categories: { default: { appenders: ['out'], level: 'debug' } }
});

export default log4js.getLogger;
