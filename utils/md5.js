const crypto = require('crypto');

// Preforms md5 on some data
// md5_f to mean md5_file
function md5 (data) {
	return crypto
		.createHash('md5')
		.update(data)
		.digest('hex')
		.toString();
}

module.exports = md5;
