import e621 from './sites/e621/e621.mjs';

const sites = [
	e621
];

async function init_all () {
	return Promise.allSettled(sites.map(e => e.init));
}

async function sleep (time_in_ms) {
	return new Promise(resolve => setTimeout(resolve, time_in_ms));
}

// TODO rework how these timers work, this just will not work for larger amounts
// of things. Some will need to trigger every minute, and if an hour long update
// gets in the way, that could be very bad for our program.
const timers = [{
	name: 'minutely',
	delay: 1000 * 60 * 3, // Every 3 minutes
	last_time_triggered: new Date().getTime(),
	trigger: () => Promise.allSettled(sites.map(e => e.update_minutely()))
}, {
	name: 'hourly',
	delay: 1000 * 60 * 50, // Every 50 minutes
	last_time_triggered: new Date().getTime(),
	trigger: () => Promise.allSettled(sites.map(e => e.update_hourly()))
}, {
	name: 'daily',
	delay: 1000 * 60 * 60 * 23, // Every 23 hours
	last_time_triggered: new Date().getTime(),
	trigger: () => Promise.allSettled(sites.map(e => e.update_daily()))
}];

async function main () {
	await init_all();

	while (true) {
		const now = new Date().getTime();
		const timers_to_trigger = timers.filter(e => (now - e.last_time_triggered) >= e.delay);

		timers_to_trigger.forEach((e, i) => (timers[i].last_time_triggered = now));
		await Promise.allSettled(timers_to_trigger.map(e => e.trigger()));

		await sleep(1000 * 10); // Wait 10s incase nothing triggered
	}
}

main();
