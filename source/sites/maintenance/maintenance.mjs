async function init () {}
async function update_minutely () {}
async function update_hourly () {}

async function update_daily () {
	await perform_database_dump();

	// Build a report and email it somewhere? Report how many saved etc. No idea
}

async function update_monthly () {
	// TODO write update_monthly
	await Promise.allSettled([
		find_orphaned_files(),
		verify_files_correct_md5s()
	]);
}

async function update_manually () {
	// TODO write update_manually
}

async function find_orphaned_files () {
	// TODO write find_orphaned_files
	// No idea how this will work. Will have to search each MD5 in all the databases.
	// Could be very complicated
}

async function verify_files_correct_md5s () {
	// TODO write verify_files_correct_md5s
	// Basically just search through all the files, read them from disk, and
	// verify that their md5 is accurate to their filename if it isn't, uhh, idk
}

async function perform_database_dump () {
	// TODO write perform_database_dump
	// Somehow trigger the postgres database to create a database dump.
	// Whether that is a CSV, a SQL file, or something else TBD

	// Something like if the day is Sunday then do something special?
}

export default {
	init,
	update_minutely,
	update_hourly,
	update_daily,
	update_monthly,
	update_manually
};
