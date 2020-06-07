const logger = require('./logger.js');

function * make_percent_counter (max, steps) {
	const spaced_hits = new Array(steps)
		.fill(0)
		.map((e, i) => Math.round((i / steps) * max));
	const every_hits = new Array(steps).fill(0).map((e, i) => i);
	const hits = steps >= max ? every_hits : spaced_hits;

	let counter = 0;
	let last_index = 0;
	while (true) {
		if (counter > max) {
			yield;
		} else if (hits[last_index] === counter) {
			logger.log(`Working, ${((counter / max) * 100).toFixed(2)}% done`);
			last_index++;
			counter++;
			yield;
		} else {
			counter++;
			yield;
		}
	}
};

module.exports = make_percent_counter;
