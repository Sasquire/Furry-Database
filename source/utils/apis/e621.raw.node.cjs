/* eslint-disable */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/blip/create/blip_create.js":
/*!*******************************************!*\
  !*** ./source/blip/create/blip_create.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blip_create": () => (/* binding */ blip_create)
/* harmony export */ });
const { raw_blip_create } = __webpack_require__(/*! ./raw_blip_create.js */ "./source/blip/create/raw_blip_create.js");

async function blip_create (text, in_response_to) {
	return raw_blip_create.call(this, {
		'blip[response_to]': in_response_to === undefined ? null : in_response_to,
		'blip[body]': text
	});
}




/***/ }),

/***/ "./source/blip/create/raw_blip_create.js":
/*!***********************************************!*\
  !*** ./source/blip/create/raw_blip_create.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_blip_create": () => (/* binding */ raw_blip_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_blip_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/blips',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings['blip[response_to]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['blip[response_to]'], 'blip[response_to]');
	}

	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['blip[body]'], 'blip[body]');
}

function make_data (settings) {
	const return_object = {
		'blip[body]': settings['blip[body]']
	};

	if (settings['blip[response_to]'] !== null) {
		return_object['blip[response_to]'] = settings['blip[response_to]'];
	}

	return return_object;
}




/***/ }),

/***/ "./source/comment/create/comment_create.js":
/*!*************************************************!*\
  !*** ./source/comment/create/comment_create.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment_create": () => (/* binding */ comment_create)
/* harmony export */ });
const { raw_comment_create } = __webpack_require__(/*! ./raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");

async function comment_create (post_id, text) {
	return raw_comment_create.call(this, {
		'comment[post_id]': post_id,
		'comment[body]': text
	});
}




/***/ }),

/***/ "./source/comment/create/raw_comment_create.js":
/*!*****************************************************!*\
  !*** ./source/comment/create/raw_comment_create.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_comment_create": () => (/* binding */ raw_comment_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// Add support for ['do_not_bump_post', 'is_sticky', 'is_hidden']

async function raw_comment_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/comments',
		response: 'JSON',

		format: 'FORM',
		data: {
			'comment[post_id]': settings['comment[post_id]'],
			'comment[body]': settings['comment[body]']
		},
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['comment[post_id]'], 'comment[post_id]');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['comment[body]'], 'comment[body]');
}




/***/ }),

/***/ "./source/download/download.node.js":
/*!******************************************!*\
  !*** ./source/download/download.node.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate_settings.js */ "./source/download/validate_settings.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! form-data */ "form-data");
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(form_data__WEBPACK_IMPORTED_MODULE_2__);




/* Input to this method is structured like this
{
	method: 'POST' | 'GET' // Defines how the request should be made
	path: <string> // The path of the URL that is being accessed
	response: 'JSON' | 'XML' | 'HTML' // Defines the response type

	format: 'URL' | 'FORM' | undefined // Defines how the data is passed
	data: <object> | undefined // Data being passed in the request
}

*/
async function download (settings) {
	_validate_settings_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, settings);
	const request_options = build_request_options.call(this, settings);
	return axios__WEBPACK_IMPORTED_MODULE_1___default().request(request_options)
		.then(response => response.data)
		.catch(handle_error);
}

function build_request_options (settings) {
	const request_options = {
		baseURL: 'https://e621.net/',
		url: `${settings.path}.${settings.response.toLowerCase()}`,
		method: settings.method,
		// Document is only valid for the browser. To fix this only
		// json is used for actual json. HTML and XML will have to be
		// parsed by other means.
		// https://github.com/axios/axios/issues/667#issuecomment-335013993
		responseType: settings.response === 'JSON' ? 'json' : 'text',
		headers: {
			'user-agent': this.useragent
		}
	};

	const has_credentials = (this.username !== undefined && this.api_key !== undefined);
	if (settings.authenticate || has_credentials) {
		request_options.auth = {
			username: this.username,
			password: this.api_key
		};
	}

	if (settings.format === 'URL') {
		request_options.params = settings.data;
	} else if (settings.format === 'FORM') {
		const form = new (form_data__WEBPACK_IMPORTED_MODULE_2___default())();
		Object.entries(settings.data).forEach(([key, value]) => {
			if (value.constructor === ArrayBuffer) {
				form.append(key, Buffer.from(value), {
					filename: 'upload.image',
					contentType: 'application/octet-stream'
				});
			} else {
				form.append(key, value);
			}
		});
		request_options.headers['content-type'] = form.getHeaders()['content-type'];
		request_options.data = form;
	} else {
		// Format is undefined. Apply no settings
	}

	return request_options;
}

function handle_error (error) {
	// TODO
	throw error;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (download);


/***/ }),

/***/ "./source/download/validate_settings.js":
/*!**********************************************!*\
  !*** ./source/download/validate_settings.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Validates the custom settings object for making requests.
// This object will have the same properties no matter the
// platform it is run on, streamlining the development of
// new methods to interface with the e621 api.

// The E621API class's context must be bound when calling this
// function so that it may access the useragent, username, and
// api_key.

function validate_settings (settings) {
	if (['POST', 'GET', 'PATCH', 'DELETE', 'PUT'].includes(settings.method) === false) {
		throw new Error('method must be one of [\'POST\', \'GET\', \'PATCH\', \'DELETE\', \'PUT\']');
	}

	if (typeof settings.path !== 'string') {
		throw new Error('path must be a string');
	}

	if (['JSON', 'XML', 'HTML'].includes(settings.response) === false) {
		throw new Error('response must be JSON or XML or HTML');
	}

	if (['URL', 'FORM', undefined].includes(settings.format) === false) {
		throw new Error('format must be URL or FORM or undefined');
	}

	if (['object', 'undefined'].includes(typeof settings.data) === false) {
		throw new Error('data must be an object or undefined');
	}

	if (typeof this.useragent !== 'string') {
		throw new Error('useragent must be a string');
	}

	if (settings.authenticate === true) {
		// If authenticating, then both username and api_key must be present
		if (typeof this.username !== 'string') {
			throw new Error('useragent must be a string');
		} else if (typeof this.api_key !== 'string') {
			throw new Error('api_key must be a string');
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate_settings);


/***/ }),

/***/ "./source/post/bvas/post_bvas.js":
/*!***************************************!*\
  !*** ./source/post/bvas/post_bvas.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_bvas": () => (/* binding */ post_bvas)
/* harmony export */ });
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");


// settings = {
//   post_id: id of the post to be replaced
//   replacement: the replacement file/URL
//   comment: boolean if a comment should be posted to the new post
//   description: boolean if the description should be edited.
//   message: message of superior quality. '%' replaced with old_id
//   delete: boolean. If true will try to delete post. if false will flag
// }

async function post_bvas (settings) {
	settings = apply_defaults(settings);
	const old_post = await this.post_show(settings.post_id);
	settings.message = settings.message.replace('%', old_post.id);

	const new_post = await this.post_create({
		tags: filter_tags(old_post.tags),
		sources: old_post.sources,
		description: settings.description === true ? `${settings.message}\n${old_post.description}` : old_post.description,
		rating: old_post.rating,
		parent_id: old_post.relationships.parent_id,

		upload: settings.replacement
	});

	if (settings.comment === true) {
		await this.comment_create(new_post.post_id, settings.message);
	}

	await set_parent.call(this, old_post.id, new_post.post_id);
	for (const child_id of old_post.relationships.children) {
		await set_parent.call(this, child_id, new_post.post_id);
	}
	// Fix with pool

	await this.post_copy_notes(old_post.id, new_post.post_id);

	// optionally delete the post
	await this.post_flag_create(this.post_flag_reasons.inferior, old_post.id, new_post.post_id);
}

function apply_defaults (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_0__.validate_counting_number)(settings.post_id, 'post_id');
	if (settings.replacement === undefined) {
		throw new Error('replacement must be defined');
	}

	return {
		post_id: settings.post_id,
		comment: nullish(settings.comment, false),
		description: nullish(settings.description, true),
		message: nullish(settings.message, 'Superior version of post #%'),
		delete: nullish(settings.delete, false),
		replacement: settings.replacement
	};
}

function nullish (value, replacement) {
	if (value === null || value === undefined) {
		return replacement;
	} else {
		return value;
	}
}

async function set_parent (post_id, new_parent) {
	return this.post_update({
		id: post_id,
		parent_id: new_parent
	});
}

function filter_tags (tag_object) {
	const tags_to_remove = [
		'better_version_at_source',
		'smaller_version_at_source',
		'compression_artifacts',
		'cropped',
		'upscale'
	];

	return Object.values(tag_object)
		.reduce((acc, e) => acc.concat(e))
		.filter(e => tags_to_remove.includes(e) === false);
}




/***/ }),

/***/ "./source/post/copy_notes/post_copy_notes.js":
/*!***************************************************!*\
  !*** ./source/post/copy_notes/post_copy_notes.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_copy_notes": () => (/* binding */ post_copy_notes)
/* harmony export */ });
const { raw_post_copy_notes } = __webpack_require__(/*! ./raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");

async function post_copy_notes (post_id, to_id) {
	return raw_post_copy_notes.call(this, {
		id: post_id,
		other_post_id: to_id
	});
}




/***/ }),

/***/ "./source/post/copy_notes/raw_post_copy_notes.js":
/*!*******************************************************!*\
  !*** ./source/post/copy_notes/raw_post_copy_notes.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_copy_notes": () => (/* binding */ raw_post_copy_notes)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_copy_notes (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PUT',
		path: `/posts/${settings.id}/copy_notes`,
		response: 'JSON',

		format: 'URL',
		data: {
			id: settings.id,
			other_post_id: settings.other_post_id
		}
	}).catch(handle_error);
}

function handle_error (error) {
	if (error.response.data.reason === 'Post has no notes') {
		return null; // Expected behavior is to have no errors thrown if post has no notes
	} else {
		// Todo
		console.log(error);
		throw error;
	}
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'id');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.other_post_id, 'other_post_id');
}




/***/ }),

/***/ "./source/post/create/post_create.js":
/*!*******************************************!*\
  !*** ./source/post/create/post_create.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_create": () => (/* binding */ post_create)
/* harmony export */ });
const { raw_post_create } = __webpack_require__(/*! ./raw_post_create.js */ "./source/post/create/raw_post_create.js");

async function post_create (settings) {
	validate_settings(settings);
	return raw_post_create.call(this, transform_settings(settings));
}

function validate_settings (settings) {
	if (settings.upload === undefined) {
		throw new Error('You must supply an upload file to upload a post');
	}

	if (typeof settings.rating !== 'string') {
		throw new Error('rating must be of type string');
	} else if (['e', 'q', 's'].includes(settings.rating.charAt(0)) === false) {
		throw new Error('first character of rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings.tags !== undefined) {
		if (Array.isArray(settings.tags === false)) {
			throw new Error('tags must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of tags must of of type string');
		}
	}

	if (settings.sources !== undefined) {
		if (Array.isArray(settings.sources === false)) {
			throw new Error('sources must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of sources must of of type string');
		}
	}
}

function transform_settings (settings) {
	const return_object = {
		'upload[tag_string]': (settings.tags || []).join(' '),
		'upload[rating]': settings.rating.charAt(0),
		'upload[source]': (settings.sources || []).join('\n'),
		'upload[description]': (settings.description || ''),
		'upload[parent_id]': (settings.parent_id || null)
	};

	if (settings.upload.constructor === ArrayBuffer) {
		return_object['upload[file]'] = settings.upload;
	} else {
		return_object['upload[direct_url]'] = settings.upload;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/create/raw_post_create.js":
/*!***********************************************!*\
  !*** ./source/post/create/raw_post_create.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_create": () => (/* binding */ raw_post_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// upload[tag_string] A space delimited list of tags.
// upload[file] The file data encoded as a multipart form.
// upload[rating] The rating for the post. Can be: s, q or e for safe, questionable, and explicit respectively.
// upload[direct_url] If this is a URL, e621 will download the file.
// upload[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of ten URLs
// upload[description] The description for the post.
// upload[parent_id] The ID of the parent post.
// upload[referer_url]         ?
// upload[md5_confirmation]    useless
// upload[as_pending] If true post will be posted as pending

// tag_string, rating, source (file || direct_ulr) are required
// all others should be null

async function raw_post_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/uploads',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function make_data (settings) {
	const new_settings = {
		'upload[tag_string]': settings['upload[tag_string]'],
		'upload[rating]': settings['upload[rating]'],
		'upload[source]': settings['upload[source]']
	};

	if (settings['upload[file]'] !== undefined) {
		new_settings['upload[file]'] = settings['upload[file]'];
	} else {
		new_settings['upload[direct_url]'] = settings['upload[direct_url]'];
	}

	if (settings['upload[description]'] !== null) {
		new_settings['upload[description]'] = settings['upload[description]'];
	}

	if (settings['upload[parent_id]'] !== null) {
		new_settings['upload[parent_id]'] = settings['upload[parent_id]'];
	}

	return new_settings;
}

function validate_settings (settings) {
	if (settings['upload[tag_string]'] === undefined) {
		throw new Error('upload[tag_string] must be present');
	} else if (typeof settings['upload[tag_string]'] !== 'string') {
		throw new Error('upload[tag_string] must be of type string');
	}

	if (settings['upload[file]'] !== undefined && settings['upload[direct_url]'] !== undefined) {
		throw new Error('Both upload[file] and upload[direct_url] can not be defined');
	} else if (settings['upload[file]'] === undefined && settings['upload[direct_url]'] === undefined) {
		throw new Error('Either upload[file] or upload[direct_url] must be defined');
	}

	// todo test this
	if (settings['upload[file]']) {
		if (settings['upload[file]'].constructor !== ArrayBuffer) {
			throw new Error('upload[file] must be of type ArrayBuffer');
		}

		// Check for data in the array buffer?
	}

	if (settings['upload[direct_url]']) {
		if (typeof settings['upload[direct_url]'] !== 'string') {
			throw new Error('upload[direct_url] must be of type string');
		}

		// Check it is an actual url?
	}

	if (['s', 'q', 'e'].includes(settings['upload[rating]']) === false) {
		throw new Error('upload[rating] must be one of [\'s\', \'q\', \'e\']');
	}

	if (settings['upload[source]'] === undefined) {
		throw new Error('upload[source] must be present');
	} else if (typeof settings['upload[source]'] !== 'string') {
		throw new Error('upload[source] must be undefined or of type string or null');
	}

	if (settings['upload[description]'] === undefined) {
		throw new Error('upload[description] must be present');
	} else if (typeof settings['upload[description]'] !== 'string') {
		throw new Error('upload[description] must be of type string');
	}

	if (settings['upload[parent_id]'] === undefined) {
		throw new Error('upload[parent_id] must present');
	} else if (settings['upload[parent_id]'] === null) {
		// It is fine if parent_id is null
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['upload[parent_id]'], 'upload[parent_id]');
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search.js":
/*!******************************************!*\
  !*** ./source/post/index/post_search.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_search": () => (/* binding */ post_search)
/* harmony export */ });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


async function post_search (tag_string, page = 0) {
	return _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
		limit: 320,
		tags: tag_string,
		page: page.toString()
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search_iterator.js":
/*!***************************************************!*\
  !*** ./source/post/index/post_search_iterator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_search_iterator": () => (/* binding */ post_search_iterator)
/* harmony export */ });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


const posts_per_page = 320;

// You can not have a different order when searching through posts like this
async function* post_search_iterator (search_string) {
	// "Providing arbitrarily large values to obtain the most recent posts
	// is not portable and may break in the future". (wiki)
	// I do what I want
	let max_id = 1e9;
	while (true) {
		// https://github.com/zwagoth/e621ng/issues/202
		const { posts } = await _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
			tags: search_string,
			limit: posts_per_page,
			page: `b${max_id}`
		}).catch(handle_error);

		yield* posts;
		max_id = posts.reduce((acc, e) => acc.id < e.id ? acc : e).id;

		if (posts.length < posts_per_page) {
			return;
		}
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/raw_post_search.js":
/*!**********************************************!*\
  !*** ./source/post/index/raw_post_search.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_search": () => (/* binding */ raw_post_search)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// There is an edge case where the data can be md5=<md5>

async function raw_post_search (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/posts',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings)
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings.tags !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings.tags, 'tags');
	}

	if (settings.limit !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_page_string)(settings.page, 'page');
	}
}

function make_data (settings) {
	const return_object = {};

	if (settings.limit !== null) {
		return_object.limit = settings.limit;
	}

	if (settings.tags !== null) {
		return_object.tags = settings.tags;
	}

	if (settings.page !== null) {
		return_object.page = settings.page;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/show/post_show.js":
/*!***************************************!*\
  !*** ./source/post/show/post_show.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_show_id": () => (/* binding */ post_show_id),
/* harmony export */   "post_show_md5": () => (/* binding */ post_show_md5),
/* harmony export */   "post_show": () => (/* binding */ post_show)
/* harmony export */ });
/* harmony import */ var _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");




async function post_show_id (post_id) {
	return _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__.raw_post_show.call(this, {
		id: post_id
	}).then(e => e.post);
}

async function post_show_md5 (md5) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_2__.validate_md5)(md5);
	return _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
		tags: `md5:${md5}`,
		limit: 1,
		page: null
	}).then(e => {
		if (e.posts.length === 0) {
			return null;
		} else {
			return e.posts[0];
		}
	});
}

async function post_show (id_md5) {
	if (typeof id_md5 === 'string' && id_md5.length === 32) {
		return post_show_md5.call(this, id_md5);
	} else {
		return post_show_id.call(this, Number(id_md5));
	}
}




/***/ }),

/***/ "./source/post/show/raw_post_show.js":
/*!*******************************************!*\
  !*** ./source/post/show/raw_post_show.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_show": () => (/* binding */ raw_post_show)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_show (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'post_id');

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: undefined,
		data: null
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/update/post_update.js":
/*!*******************************************!*\
  !*** ./source/post/update/post_update.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_update": () => (/* binding */ post_update)
/* harmony export */ });
/* harmony import */ var _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_update.js */ "./source/post/update/raw_post_update.js");


async function post_update (settings) {
	return _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_update.call(this, {
		id: settings.id,
		'post[tag_string_diff]': get_differences(settings, 'tags_to_add', 'tags_to_remove', ' '),
		'post[tag_string]': optional_join(settings.tags, ' '),
		'post[old_tag_string]': optional_join(settings.old_tags, ' '),
		'post[source_diff]': get_differences(settings, 'sources_to_add', 'sources_to_remove', '\n'),
		'post[source]': optional_join(settings.sources, '\n'),
		'post[old_source]': optional_join(settings.old_sources, '\n'),
		'post[description]': settings.description || null,
		'post[old_description]': settings.old_description || null,
		'post[parent_id]': settings.parent_id || null,
		'post[old_parent_id]': settings.old_parent_id || null,
		'post[rating]': get_rating(settings.rating),
		'post[old_rating]': get_rating(settings.old_rating),
		'post[edit_reason]': settings.reason || null
	});
}

// Idea for a different type of update function. Maybe its better in some cases
// async function transform_post (post_id, transform_function) {
//   const post = await get_post(post_id);
//   const new_post = await transform_function(post_id)
//   return post_update(post, new_post);
// }

function get_rating (rating) {
	if (rating !== undefined) {
		return rating.charAt(0);
	} else {
		return null;
	}
}

function optional_join (list, joiner) {
	if (list !== undefined) {
		return list.join(joiner);
	} else {
		return null;
	}
}

function get_differences (settings, add_string, remove_string, joiner) {
	if (settings[add_string] !== undefined || settings[remove_string] !== undefined) {
		const adds = (settings[add_string] || [])
			.join(joiner);
		const removes = (settings[remove_string] || [])
			.map(e => `-${e.toString()}`)
			.join(joiner);

		return `${adds}${joiner}${removes}`;
	} else {
		return null; // If no changes return null
	}
}




/***/ }),

/***/ "./source/post/update/raw_post_update.js":
/*!***********************************************!*\
  !*** ./source/post/update/raw_post_update.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_update": () => (/* binding */ raw_post_update)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_update (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PATCH',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'id');

	[
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		// parent_id
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
		// has_embedded_notes will be removed at some point.
	].forEach(e => {
		if (settings[e] === undefined) {
			throw new Error(`${e} must be present`);
		} else if (settings[e] === null) {
			// all of these can be null
		} else if (typeof settings[e] !== 'string') {
			throw new Error(`${e} must be of type string`);
		}
	});

	if (settings['post[parent_id]'] === undefined) {
		throw new Error('post[parent_id] must be present');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('post[old_parent_id] must be present');
	}

	[
		'tag_string',
		'source',
		'description',
		'parent_id',
		'rating'
	].forEach(e => {
		if (settings[`post[old_${e}]`] !== null && settings[`post[${e}]`] === null) {
			throw new Error(`old_${e} must not be present if ${e} is not present`);
		}
	});

	if (settings['post[tag_string]'] !== null && settings['post[tag_string_diff]'] !== null) {
		throw new Error('at most one of tag_string and tag_string_diff can be non-null');
	}

	if (settings['post[source]'] !== null && settings['post[source_diff]'] !== null) {
		throw new Error('at most one of source and source_diff can be non-null');
	}

	// Parent_id
	if (settings['post[parent_id]'] === undefined) {
		throw new Error('parent_id must be present');
	} else if (settings['post[parent_id]'] === null) {
		// it can be null without issue
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post[parent_id]'], 'parent_id');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('old_parent_id must be present');
	} else if (settings['post[old_parent_id]'] === null) {
		// it can be null without issue
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post[old_parent_id]'], 'old_parent_id');
	}

	// Rating
	if (settings['post[rating]'] !== null && ['e', 'q', 's'].includes(settings['post[rating]']) === false) {
		throw new Error('rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings['post[old_rating]'] !== null && ['e', 'q', 's'].includes(settings['post[old_rating]']) === false) {
		throw new Error('old_rating must be one of [\'e\', \'q\', \'s\']');
	}
}

function make_data (settings) {
	return [
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		'post[parent_id]',
		'post[old_parent_id]',
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
	].reduce((acc, e) => {
		if (settings[e] !== null) {
			acc[e] = settings[e];
		}

		return acc;
	}, {});
}




/***/ }),

/***/ "./source/post/vote/post_vote.js":
/*!***************************************!*\
  !*** ./source/post/vote/post_vote.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_vote_up": () => (/* binding */ post_vote_up),
/* harmony export */   "post_vote_down": () => (/* binding */ post_vote_down)
/* harmony export */ });
/* harmony import */ var _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");


async function post_vote_up (post_id) {
	return _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_vote.call(this, {
		id: post_id,
		score: 1,
		no_unvote: true
	});
}

async function post_vote_down (post_id) {
	_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_vote.call(this, {
		id: post_id,
		score: -1,
		no_unvote: true
	});
}




/***/ }),

/***/ "./source/post/vote/raw_post_vote.js":
/*!*******************************************!*\
  !*** ./source/post/vote/raw_post_vote.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_vote": () => (/* binding */ raw_post_vote),
/* harmony export */   "post_vote_remove": () => (/* binding */ post_vote_remove)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_vote (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: `/posts/${settings.id}/votes`,
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

async function post_vote_remove (id) {
	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'DELETE',
		path: `/posts/${id}/votes`,
		response: 'JSON',

		format: undefined,
		data: undefined,
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'post_id');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_vote_option)(settings.score);

	if (settings.no_unvote !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings.no_unvote, 'no_unvote');
	}
}

function make_data (settings) {
	const return_object = {
		score: settings.score
	};

	if (settings.no_unvote !== null) {
		return_object.no_unvote = settings.no_unvote;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post_flag/create/post_flag_create.js":
/*!*****************************************************!*\
  !*** ./source/post_flag/create/post_flag_create.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_flag_create": () => (/* binding */ post_flag_create),
/* harmony export */   "post_flag_reasons": () => (/* binding */ post_flag_reasons)
/* harmony export */ });
/* harmony import */ var _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");


const post_flag_reasons = {
	deletion: 'deletion',
	inferior: 'inferior',
	custom: 'user',
	dnp: 'dnp_artist',
	pay_content: 'pay_content',
	trace: 'trace',
	previously_deleted: 'previously_deleted',
	real: 'real_porn',
	corrupt: 'corrupt'
};

async function post_flag_create (reason, post_id, extra) {
	if (post_flag_reasons[reason] === undefined) {
		throw new Error(`Reason must be one of [${Object.keys(post_flag_reasons).join(', ')}]`);
	}

	const data = {
		'post_flag[post_id]': post_id,
		'post_flag[reason_name]': post_flag_reasons[reason],
		'post_flag[user_reason]': null,
		'post_flag[parent_id]': null
	};

	if (reason === post_flag_reasons.custom) {
		data['post_flag[user_reason]'] = extra;
	} else if (reason === post_flag_reasons.inferior) {
		data['post_flag[parent_id]'] = extra;
	}

	return _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_flag_create.call(this, data);
}




/***/ }),

/***/ "./source/post_flag/create/raw_post_flag_create.js":
/*!*********************************************************!*\
  !*** ./source/post_flag/create/raw_post_flag_create.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_flag_create": () => (/* binding */ raw_post_flag_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_flag_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/post_flags',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post_flag[post_id]'], 'post_flag[post_id]');
	const valid_reason = [
		'deletion',
		'inferior',
		'user',
		'dnp_artist',
		'pay_content',
		'trace',
		'previously_deleted',
		'real_porn',
		'corrupt'
	];

	if (valid_reason.includes(settings['post_flag[reason_name]']) === false) {
		throw new Error(`post_flag[reason_name] must be one of [${valid_reason.join(', ')}]`);
	}

	if (settings['post_flag[reason_name]'] === 'user') {
		if (typeof settings['post_flag[user_reason]'] !== 'string')	{
			throw new Error('if post_flag[reason_name] is \'user\' then post_flag[user_reason] must be a string');
		}
	} else if (settings['post_flag[user_reason]'] !== null) {
		throw new Error('post_flag[user_reason] must be null unless post_flag[reason_name] is \'user\'');
	}

	if (settings['post_flag[reason_name]'] === 'inferior') {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post_flag[parent_id]'], 'post_flag[parent_id]');
	} else if (settings['post_flag[parent_id]'] !== null) {
		throw new Error('post_flag[parent_id] must be null unless post_flag[parent_id] is \'inferior\'');
	}
}

function make_data (settings) {
	const return_object = {
		'post_flag[post_id]': settings['post_flag[post_id]'],
		'post_flag[reason_name]': settings['post_flag[reason_name]']
	};

	if (settings['post_flag[reason_name]'] === 'user') {
		return_object['post_flag[user_reason]'] = settings['post_flag[user_reason]'];
	} else if (settings['post_flag[reason_name]'] === 'inferior') {
		return_object['post_flag[parent_id]'] = settings['post_flag[parent_id]'];
	}

	return return_object;
}

function handle_error (err) {
	console.log(err);
	throw err;
};




/***/ }),

/***/ "./source/tags/index/raw_tag_search.js":
/*!*********************************************!*\
  !*** ./source/tags/index/raw_tag_search.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_tag_search": () => (/* binding */ raw_tag_search)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_tag_search (settings) {
	validate_settings(settings);
	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/tags',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings)
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings['search[id]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['search[id]'], 'search[id]');
	}

	if (settings['search[fuzzy_name_matches]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[fuzzy_name_matches]'], 'search[fuzzy_name_matches]');
	}

	if (settings['search[name_matches]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[name_matches]'], 'search[name_matches]');
	}

	if (settings['search[name]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[name]'], 'search[name]');
	}

	if (settings['search[category]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['search[category]'], 'search[category]');
	}

	if (settings['search[hide_empty]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[hide_empty]'], 'search[hide_empty]');
	}

	if (settings['search[has_wiki]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[has_wiki]'], 'search[has_wiki]');
	}

	if (settings['search[has_artist]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[has_artist]'], 'search[has_artist]');
	}

	if (settings['search[is_locked]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[is_locked]'], 'search[is_locked]');
	}

	if (settings['search[hide_wiki]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[hide_wiki]'], 'search[hide_wiki]');
	}

	if (settings['search[order]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_from_list)(settings['search[order]'], ['name', 'date', 'count', 'similarity'], 'search[order]');
	}

	if (settings.limit !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_page_string)(settings.page, 'page');
	}
}

function make_data (settings) {
	const return_object = {};

	if (settings['search[id]'] !== null) {
		return_object['search[id]'] = settings['search[id]'];
	}

	if (settings['search[fuzzy_name_matches]'] !== null) {
		return_object['search[fuzzy_name_matches]'] = settings['search[fuzzy_name_matches]'];
	}

	if (settings['search[name_matches]'] !== null) {
		return_object['search[name_matches]'] = settings['search[name_matches]'];
	}

	if (settings['search[name]'] !== null) {
		return_object['search[name]'] = settings['search[name]'];
	}

	if (settings['search[category]'] !== null) {
		return_object['search[category]'] = settings['search[category]'];
	}

	if (settings['search[hide_empty]'] !== null) {
		return_object['search[hide_empty]'] = settings['search[hide_empty]'];
	}

	if (settings['search[has_wiki]'] !== null) {
		return_object['search[has_wiki]'] = settings['search[has_wiki]'];
	}

	if (settings['search[has_artist]'] !== null) {
		return_object['search[has_artist]'] = settings['search[has_artist]'];
	}

	if (settings['search[is_locked]'] !== null) {
		return_object['search[is_locked]'] = settings['search[is_locked]'];
	}

	if (settings['search[order]'] !== null) {
		return_object['search[order]'] = settings['search[order]'];
	}

	if (settings.limit !== null) {
		return_object.limit = settings.limit;
	}

	if (settings.page !== null) {
		return_object.page = settings.page;
	}

	return return_object;
}




/***/ }),

/***/ "./source/tags/index/tag_search.js":
/*!*****************************************!*\
  !*** ./source/tags/index/tag_search.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag_search": () => (/* binding */ tag_search)
/* harmony export */ });
/* harmony import */ var _raw_tag_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_tag_search.js */ "./source/tags/index/raw_tag_search.js");


const tag_category = {
	general: 0,
	artist: 1,
	copyright: 3,
	character: 4,
	species: 5,
	invalid: 6,
	meta: 7,
	lore: 8
};

async function tag_search (settings, page = 0) {
	if (settings.page === null || settings.page === undefined) {
		settings.page = page.toString();
	} // else page is already set

	return _raw_tag_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_tag_search.call(this, make_settings(settings)).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function make_settings (settings) {
	const return_object = {
		'search[id]': null,
		'search[fuzzy_name_matches]': null,
		'search[name_matches]': null,
		'search[name]': null,
		'search[category]': null,
		'search[hide_empty]': null,
		'search[has_wiki]': null,
		'search[has_artist]': null,
		'search[is_locked]': null,
		'search[hide_wiki]': null,
		'search[order]': null,
		limit: null,
		page: settings.page
	};

	if (settings.id !== undefined && settings.id !== null) {
		return_object['search[id]'] = settings.id;
	} else if (settings.fuzzy_match !== undefined && settings.fuzzy_match !== null) {
		return_object['search[fuzzy_name_matches]'] = settings.fuzzy_match;
	} else if (settings.wild_match !== undefined && settings.wild_match !== null) {
		return_object['search[name_matches]'] = settings.wild_match;
	} else if (settings.exact_match !== undefined && settings.exact_match !== null) {
		return_object['search[name]'] = settings.exact_match;
	}

	for (const term of ['hide_empty', 'has_wiki', 'has_artist', 'is_locked', 'hide_wiki', 'order']) {
		if (settings[term] !== undefined && settings[term] !== null) {
			return_object[`search[${term}]`] = settings[term];
		}
	}

	if (settings.category !== null && settings.category !== undefined) {
		if (tag_category[settings.category] === undefined) {
			throw new Error(`Category must be one of [${Object.keys(tag_category).join(', ')}]`);
		} else {
			return_object['search[category]'] = settings.category;
		}
	}

	if (settings.limit !== null && settings.limit !== undefined) {
		return_object.limit = settings.limit;
	} else {
		return_object.limit = 1000;
	}

	return return_object;
}




/***/ }),

/***/ "./source/tags/index/tag_search_iterator.js":
/*!**************************************************!*\
  !*** ./source/tags/index/tag_search_iterator.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag_search_iterator": () => (/* binding */ tag_search_iterator)
/* harmony export */ });
/* harmony import */ var _tag_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag_search.js */ "./source/tags/index/tag_search.js");


const tags_per_page = 1000;

// You can not have a different order when searching through posts like this
async function* tag_search_iterator (search_options) {
	// "Providing arbitrarily large values to obtain the most recent posts
	// is not portable and may break in the future". (wiki)
	// I do what I want
	search_options.page = null;
	search_options.limit = null;

	let max_id = 1e9;
	while (true) {
		// https://github.com/zwagoth/e621ng/issues/202
		const tags = await _tag_search_js__WEBPACK_IMPORTED_MODULE_0__.tag_search.call(this, {
			...search_options,
			page: `b${max_id}`,
			limit: 1000
		}).catch(handle_error);

		yield* tags;
		max_id = tags.reduce((acc, e) => acc.id < e.id ? acc : e).id;

		if (tags.length < tags_per_page) {
			return;
		}
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/validation/validation.js":
/*!*****************************************!*\
  !*** ./source/validation/validation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate_md5": () => (/* binding */ validate_md5),
/* harmony export */   "validate_counting_number": () => (/* binding */ validate_counting_number),
/* harmony export */   "validate_string": () => (/* binding */ validate_string),
/* harmony export */   "validate_vote_option": () => (/* binding */ validate_vote_option),
/* harmony export */   "validate_page_string": () => (/* binding */ validate_page_string),
/* harmony export */   "validate_boolean": () => (/* binding */ validate_boolean),
/* harmony export */   "validate_from_list": () => (/* binding */ validate_from_list)
/* harmony export */ });
function validate_md5 (md5) {
	if (typeof md5 !== 'string') {
		throw new Error('md5 must be of type string');
	}

	if (md5.length !== 32) {
		throw new Error('md5 must be of length 32');
	}

	const contains_non_hex = /[^0-9a-fA-F]/g;
	if (contains_non_hex.test(md5)) {
		throw new Error('md5 contains non-hexadecimal character');
	}
}

function validate_counting_number (number, name) {
	if (typeof number !== 'number') {
		throw new Error(`${name} must be a number`);
	}

	if (Number.isInteger(number) === false) {
		throw new Error(`${name}must be an integer`);
	}

	if (number < 0) {
		throw new Error(`${name} must be greater than zero`);
	}
}

function validate_string (string, name) {
	if (typeof string !== 'string') {
		throw new Error(`${name} is not a string`);
	}
}

function validate_vote_option (vote) {
	if (vote !== -1 && vote !== 0 && vote !== 1) {
		throw new Error('vote is not of the values [-1, 1]');
	}
}

function validate_page_string (string, name) {
	validate_string(string, name);

	if ((/[ab]?\d+/).test(string) === false) {
		throw new Error(`${name} does not match the format /[ab]?\\d+/`);
	}
}

function validate_boolean (boolean, name) {
	if (boolean !== false && boolean !== true) {
		throw new Error(`${name} is not of the type boolean`);
	}
}

function validate_from_list (value, list, name) {
	if (list.some(e => e === value) === false) {
		throw new Error(`Value ${value} not in list [${list.join(', ')}] for ${name}`);
	}
}




/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("form-data");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post/show/raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post/show/post_show.js */ "./source/post/show/post_show.js");
/* harmony import */ var _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post/index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post/index/post_search.js */ "./source/post/index/post_search.js");
/* harmony import */ var _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post/index/post_search_iterator.js */ "./source/post/index/post_search_iterator.js");
/* harmony import */ var _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post/vote/raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");
/* harmony import */ var _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post/vote/post_vote.js */ "./source/post/vote/post_vote.js");
/* harmony import */ var _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./post/create/raw_post_create.js */ "./source/post/create/raw_post_create.js");
/* harmony import */ var _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post/create/post_create.js */ "./source/post/create/post_create.js");
/* harmony import */ var _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./post/update/raw_post_update.js */ "./source/post/update/raw_post_update.js");
/* harmony import */ var _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./post/update/post_update.js */ "./source/post/update/post_update.js");
/* harmony import */ var _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post/copy_notes/raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");
/* harmony import */ var _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./post/copy_notes/post_copy_notes.js */ "./source/post/copy_notes/post_copy_notes.js");
/* harmony import */ var _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./post_flag/create/raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");
/* harmony import */ var _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./post_flag/create/post_flag_create.js */ "./source/post_flag/create/post_flag_create.js");
/* harmony import */ var _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./comment/create/raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");
/* harmony import */ var _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./comment/create/comment_create.js */ "./source/comment/create/comment_create.js");
/* harmony import */ var _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./post/bvas/post_bvas.js */ "./source/post/bvas/post_bvas.js");
/* harmony import */ var _blip_create_raw_blip_create_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./blip/create/raw_blip_create.js */ "./source/blip/create/raw_blip_create.js");
/* harmony import */ var _blip_create_blip_create_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./blip/create/blip_create.js */ "./source/blip/create/blip_create.js");
/* harmony import */ var _tags_index_raw_tag_search_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tags/index/raw_tag_search.js */ "./source/tags/index/raw_tag_search.js");
/* harmony import */ var _tags_index_tag_search_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tags/index/tag_search.js */ "./source/tags/index/tag_search.js");
/* harmony import */ var _tags_index_tag_search_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./tags/index/tag_search_iterator.js */ "./source/tags/index/tag_search_iterator.js");


































class E621API {
	// Any of these can be anything, but errors will be thrown
	// when any requests are trying to be made.
	constructor (useragent, username, api_key) {
		this.useragent = useragent;
		this.username = username;
		this.api_key = api_key;
	}
}

E621API.prototype.version = '1.00100';

E621API.prototype.raw_post_show = _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_show;
E621API.prototype.post_show_id = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show_id;
E621API.prototype.post_show_md5 = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show_md5;
E621API.prototype.post_show = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show;

E621API.prototype.raw_post_search = _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__.raw_post_search;
E621API.prototype.post_search = _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__.post_search;
E621API.prototype.post_search_iterator = _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__.post_search_iterator;

E621API.prototype.raw_post_vote = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__.raw_post_vote;
E621API.prototype.post_vote_up = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__.post_vote_up;
E621API.prototype.post_vote_down = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__.post_vote_down;
E621API.prototype.post_vote_remove = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__.post_vote_remove;

E621API.prototype.raw_post_create = _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__.raw_post_create;
E621API.prototype.post_create = _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__.post_create;

E621API.prototype.raw_post_update = _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__.raw_post_update;
E621API.prototype.post_update = _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__.post_update;

E621API.prototype.raw_post_copy_notes = _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__.raw_post_copy_notes;
E621API.prototype.post_copy_notes = _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__.post_copy_notes;

E621API.prototype.raw_post_flag_create = _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__.raw_post_flag_create;
E621API.prototype.post_flag_create = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__.post_flag_create;
E621API.prototype.post_flag_reasons = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__.post_flag_reasons;

E621API.prototype.raw_comment_create = _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__.raw_comment_create;
E621API.prototype.comment_create = _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__.comment_create;

E621API.prototype.post_bvas = _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__.post_bvas;

E621API.prototype.raw_blip_create = _blip_create_raw_blip_create_js__WEBPACK_IMPORTED_MODULE_18__.raw_blip_create;
E621API.prototype.blip_create = _blip_create_blip_create_js__WEBPACK_IMPORTED_MODULE_19__.blip_create;

E621API.prototype.raw_tag_search = _tags_index_raw_tag_search_js__WEBPACK_IMPORTED_MODULE_20__.raw_tag_search;
E621API.prototype.tag_search = _tags_index_tag_search_js__WEBPACK_IMPORTED_MODULE_21__.tag_search;
E621API.prototype.tag_search_iterator = _tags_index_tag_search_iterator_js__WEBPACK_IMPORTED_MODULE_22__.tag_search_iterator;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (E621API);

})();

module.exports.E621API = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0Qsb0NBQW9DLGlGQUFlOztBQUVuRCx5Q0FBeUMsNEZBQW9CO0FBQzdELHFDQUFxQyxvRkFBZ0I7QUFDckQsc0NBQXNDLHFGQUFpQjs7QUFFdkQsdUNBQXVDLHNGQUFrQjtBQUN6RCxtQ0FBbUMsOEVBQWM7O0FBRWpELDhCQUE4QiwrREFBUzs7QUFFdkMsb0NBQW9DLDZFQUFlO0FBQ25ELGdDQUFnQyxxRUFBVzs7QUFFM0MsbUNBQW1DLDBFQUFjO0FBQ2pELCtCQUErQixrRUFBVTtBQUN6Qyx3Q0FBd0Msb0ZBQW1COztBQUUzRCxpRUFBZSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL2JsaXAvY3JlYXRlL2JsaXBfY3JlYXRlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvYmxpcC9jcmVhdGUvcmF3X2JsaXBfY3JlYXRlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvY29tbWVudC9jcmVhdGUvY29tbWVudF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9jb21tZW50L2NyZWF0ZS9yYXdfY29tbWVudF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9kb3dubG9hZC9kb3dubG9hZC5ub2RlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvZG93bmxvYWQvdmFsaWRhdGVfc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2J2YXMvcG9zdF9idmFzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jb3B5X25vdGVzL3Bvc3RfY29weV9ub3Rlcy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvY29weV9ub3Rlcy9yYXdfcG9zdF9jb3B5X25vdGVzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jcmVhdGUvcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2NyZWF0ZS9yYXdfcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9pbmRleC9wb3N0X3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9zaG93L3Bvc3Rfc2hvdy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3Qvc2hvdy9yYXdfcG9zdF9zaG93LmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC91cGRhdGUvcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3VwZGF0ZS9yYXdfcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3ZvdGUvcG9zdF92b3RlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC92b3RlL3Jhd19wb3N0X3ZvdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Bvc3RfZmxhZ19jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Jhd19wb3N0X2ZsYWdfY3JlYXRlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvdGFncy9pbmRleC9yYXdfdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJL2V4dGVybmFsIGNvbW1vbmpzIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9FNjIxQVBJL2V4dGVybmFsIGNvbW1vbmpzIFwiZm9ybS1kYXRhXCIiLCJ3ZWJwYWNrOi8vRTYyMUFQSS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0U2MjFBUEkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0U2MjFBUEkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgcmF3X2JsaXBfY3JlYXRlIH0gPSByZXF1aXJlKCcuL3Jhd19ibGlwX2NyZWF0ZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBibGlwX2NyZWF0ZSAodGV4dCwgaW5fcmVzcG9uc2VfdG8pIHtcblx0cmV0dXJuIHJhd19ibGlwX2NyZWF0ZS5jYWxsKHRoaXMsIHtcblx0XHQnYmxpcFtyZXNwb25zZV90b10nOiBpbl9yZXNwb25zZV90byA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGluX3Jlc3BvbnNlX3RvLFxuXHRcdCdibGlwW2JvZHldJzogdGV4dFxuXHR9KTtcbn1cblxuZXhwb3J0IHsgYmxpcF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV9zdHJpbmdcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfYmxpcF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9ibGlwcycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddLCAnYmxpcFtyZXNwb25zZV90b10nKTtcblx0fVxuXG5cdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snYmxpcFtib2R5XSddLCAnYmxpcFtib2R5XScpO1xufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0J2JsaXBbYm9keV0nOiBzZXR0aW5nc1snYmxpcFtib2R5XSddXG5cdH07XG5cblx0aWYgKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnYmxpcFtyZXNwb25zZV90b10nXSA9IHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHJhd19ibGlwX2NyZWF0ZSB9O1xuIiwiY29uc3QgeyByYXdfY29tbWVudF9jcmVhdGUgfSA9IHJlcXVpcmUoJy4vcmF3X2NvbW1lbnRfY3JlYXRlLmpzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbW1lbnRfY3JlYXRlIChwb3N0X2lkLCB0ZXh0KSB7XG5cdHJldHVybiByYXdfY29tbWVudF9jcmVhdGUuY2FsbCh0aGlzLCB7XG5cdFx0J2NvbW1lbnRbcG9zdF9pZF0nOiBwb3N0X2lkLFxuXHRcdCdjb21tZW50W2JvZHldJzogdGV4dFxuXHR9KTtcbn1cblxuZXhwb3J0IHsgY29tbWVudF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV9zdHJpbmdcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyBBZGQgc3VwcG9ydCBmb3IgWydkb19ub3RfYnVtcF9wb3N0JywgJ2lzX3N0aWNreScsICdpc19oaWRkZW4nXVxuXG5hc3luYyBmdW5jdGlvbiByYXdfY29tbWVudF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9jb21tZW50cycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IHtcblx0XHRcdCdjb21tZW50W3Bvc3RfaWRdJzogc2V0dGluZ3NbJ2NvbW1lbnRbcG9zdF9pZF0nXSxcblx0XHRcdCdjb21tZW50W2JvZHldJzogc2V0dGluZ3NbJ2NvbW1lbnRbYm9keV0nXVxuXHRcdH0sXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydjb21tZW50W3Bvc3RfaWRdJ10sICdjb21tZW50W3Bvc3RfaWRdJyk7XG5cdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snY29tbWVudFtib2R5XSddLCAnY29tbWVudFtib2R5XScpO1xufVxuXG5leHBvcnQgeyByYXdfY29tbWVudF9jcmVhdGUgfTtcbiIsImltcG9ydCB2YWxpZGF0ZV9zZXR0aW5ncyBmcm9tICcuL3ZhbGlkYXRlX3NldHRpbmdzLmpzJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcblxuLyogSW5wdXQgdG8gdGhpcyBtZXRob2QgaXMgc3RydWN0dXJlZCBsaWtlIHRoaXNcbntcblx0bWV0aG9kOiAnUE9TVCcgfCAnR0VUJyAvLyBEZWZpbmVzIGhvdyB0aGUgcmVxdWVzdCBzaG91bGQgYmUgbWFkZVxuXHRwYXRoOiA8c3RyaW5nPiAvLyBUaGUgcGF0aCBvZiB0aGUgVVJMIHRoYXQgaXMgYmVpbmcgYWNjZXNzZWRcblx0cmVzcG9uc2U6ICdKU09OJyB8ICdYTUwnIHwgJ0hUTUwnIC8vIERlZmluZXMgdGhlIHJlc3BvbnNlIHR5cGVcblxuXHRmb3JtYXQ6ICdVUkwnIHwgJ0ZPUk0nIHwgdW5kZWZpbmVkIC8vIERlZmluZXMgaG93IHRoZSBkYXRhIGlzIHBhc3NlZFxuXHRkYXRhOiA8b2JqZWN0PiB8IHVuZGVmaW5lZCAvLyBEYXRhIGJlaW5nIHBhc3NlZCBpbiB0aGUgcmVxdWVzdFxufVxuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWQgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzLmNhbGwodGhpcywgc2V0dGluZ3MpO1xuXHRjb25zdCByZXF1ZXN0X29wdGlvbnMgPSBidWlsZF9yZXF1ZXN0X29wdGlvbnMuY2FsbCh0aGlzLCBzZXR0aW5ncyk7XG5cdHJldHVybiBheGlvcy5yZXF1ZXN0KHJlcXVlc3Rfb3B0aW9ucylcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKVxuXHRcdC5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBidWlsZF9yZXF1ZXN0X29wdGlvbnMgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IHtcblx0XHRiYXNlVVJMOiAnaHR0cHM6Ly9lNjIxLm5ldC8nLFxuXHRcdHVybDogYCR7c2V0dGluZ3MucGF0aH0uJHtzZXR0aW5ncy5yZXNwb25zZS50b0xvd2VyQ2FzZSgpfWAsXG5cdFx0bWV0aG9kOiBzZXR0aW5ncy5tZXRob2QsXG5cdFx0Ly8gRG9jdW1lbnQgaXMgb25seSB2YWxpZCBmb3IgdGhlIGJyb3dzZXIuIFRvIGZpeCB0aGlzIG9ubHlcblx0XHQvLyBqc29uIGlzIHVzZWQgZm9yIGFjdHVhbCBqc29uLiBIVE1MIGFuZCBYTUwgd2lsbCBoYXZlIHRvIGJlXG5cdFx0Ly8gcGFyc2VkIGJ5IG90aGVyIG1lYW5zLlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvNjY3I2lzc3VlY29tbWVudC0zMzUwMTM5OTNcblx0XHRyZXNwb25zZVR5cGU6IHNldHRpbmdzLnJlc3BvbnNlID09PSAnSlNPTicgPyAnanNvbicgOiAndGV4dCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J3VzZXItYWdlbnQnOiB0aGlzLnVzZXJhZ2VudFxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBoYXNfY3JlZGVudGlhbHMgPSAodGhpcy51c2VybmFtZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYXBpX2tleSAhPT0gdW5kZWZpbmVkKTtcblx0aWYgKHNldHRpbmdzLmF1dGhlbnRpY2F0ZSB8fCBoYXNfY3JlZGVudGlhbHMpIHtcblx0XHRyZXF1ZXN0X29wdGlvbnMuYXV0aCA9IHtcblx0XHRcdHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuXHRcdFx0cGFzc3dvcmQ6IHRoaXMuYXBpX2tleVxuXHRcdH07XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MuZm9ybWF0ID09PSAnVVJMJykge1xuXHRcdHJlcXVlc3Rfb3B0aW9ucy5wYXJhbXMgPSBzZXR0aW5ncy5kYXRhO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzLmZvcm1hdCA9PT0gJ0ZPUk0nKSB7XG5cdFx0Y29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdE9iamVjdC5lbnRyaWVzKHNldHRpbmdzLmRhdGEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRmb3JtLmFwcGVuZChrZXksIEJ1ZmZlci5mcm9tKHZhbHVlKSwge1xuXHRcdFx0XHRcdGZpbGVuYW1lOiAndXBsb2FkLmltYWdlJyxcblx0XHRcdFx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSdcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3JtLmFwcGVuZChrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXF1ZXN0X29wdGlvbnMuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBmb3JtLmdldEhlYWRlcnMoKVsnY29udGVudC10eXBlJ107XG5cdFx0cmVxdWVzdF9vcHRpb25zLmRhdGEgPSBmb3JtO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEZvcm1hdCBpcyB1bmRlZmluZWQuIEFwcGx5IG5vIHNldHRpbmdzXG5cdH1cblxuXHRyZXR1cm4gcmVxdWVzdF9vcHRpb25zO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRPRE9cblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvd25sb2FkO1xuIiwiLy8gVmFsaWRhdGVzIHRoZSBjdXN0b20gc2V0dGluZ3Mgb2JqZWN0IGZvciBtYWtpbmcgcmVxdWVzdHMuXG4vLyBUaGlzIG9iamVjdCB3aWxsIGhhdmUgdGhlIHNhbWUgcHJvcGVydGllcyBubyBtYXR0ZXIgdGhlXG4vLyBwbGF0Zm9ybSBpdCBpcyBydW4gb24sIHN0cmVhbWxpbmluZyB0aGUgZGV2ZWxvcG1lbnQgb2Zcbi8vIG5ldyBtZXRob2RzIHRvIGludGVyZmFjZSB3aXRoIHRoZSBlNjIxIGFwaS5cblxuLy8gVGhlIEU2MjFBUEkgY2xhc3MncyBjb250ZXh0IG11c3QgYmUgYm91bmQgd2hlbiBjYWxsaW5nIHRoaXNcbi8vIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IGFjY2VzcyB0aGUgdXNlcmFnZW50LCB1c2VybmFtZSwgYW5kXG4vLyBhcGlfa2V5LlxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKFsnUE9TVCcsICdHRVQnLCAnUEFUQ0gnLCAnREVMRVRFJywgJ1BVVCddLmluY2x1ZGVzKHNldHRpbmdzLm1ldGhvZCkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZXRob2QgbXVzdCBiZSBvbmUgb2YgW1xcJ1BPU1RcXCcsIFxcJ0dFVFxcJywgXFwnUEFUQ0hcXCcsIFxcJ0RFTEVURVxcJywgXFwnUFVUXFwnXScpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBzZXR0aW5ncy5wYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigncGF0aCBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoWydKU09OJywgJ1hNTCcsICdIVE1MJ10uaW5jbHVkZXMoc2V0dGluZ3MucmVzcG9uc2UpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmVzcG9uc2UgbXVzdCBiZSBKU09OIG9yIFhNTCBvciBIVE1MJyk7XG5cdH1cblxuXHRpZiAoWydVUkwnLCAnRk9STScsIHVuZGVmaW5lZF0uaW5jbHVkZXMoc2V0dGluZ3MuZm9ybWF0KSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdCBtdXN0IGJlIFVSTCBvciBGT1JNIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0aWYgKFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLmluY2x1ZGVzKHR5cGVvZiBzZXR0aW5ncy5kYXRhKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3Qgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHRoaXMudXNlcmFnZW50ICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXNlcmFnZW50IG11c3QgYmUgYSBzdHJpbmcnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5hdXRoZW50aWNhdGUgPT09IHRydWUpIHtcblx0XHQvLyBJZiBhdXRoZW50aWNhdGluZywgdGhlbiBib3RoIHVzZXJuYW1lIGFuZCBhcGlfa2V5IG11c3QgYmUgcHJlc2VudFxuXHRcdGlmICh0eXBlb2YgdGhpcy51c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndXNlcmFnZW50IG11c3QgYmUgYSBzdHJpbmcnKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmFwaV9rZXkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2FwaV9rZXkgbXVzdCBiZSBhIHN0cmluZycpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZV9zZXR0aW5ncztcbiIsImltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuLy8gc2V0dGluZ3MgPSB7XG4vLyAgIHBvc3RfaWQ6IGlkIG9mIHRoZSBwb3N0IHRvIGJlIHJlcGxhY2VkXG4vLyAgIHJlcGxhY2VtZW50OiB0aGUgcmVwbGFjZW1lbnQgZmlsZS9VUkxcbi8vICAgY29tbWVudDogYm9vbGVhbiBpZiBhIGNvbW1lbnQgc2hvdWxkIGJlIHBvc3RlZCB0byB0aGUgbmV3IHBvc3Rcbi8vICAgZGVzY3JpcHRpb246IGJvb2xlYW4gaWYgdGhlIGRlc2NyaXB0aW9uIHNob3VsZCBiZSBlZGl0ZWQuXG4vLyAgIG1lc3NhZ2U6IG1lc3NhZ2Ugb2Ygc3VwZXJpb3IgcXVhbGl0eS4gJyUnIHJlcGxhY2VkIHdpdGggb2xkX2lkXG4vLyAgIGRlbGV0ZTogYm9vbGVhbi4gSWYgdHJ1ZSB3aWxsIHRyeSB0byBkZWxldGUgcG9zdC4gaWYgZmFsc2Ugd2lsbCBmbGFnXG4vLyB9XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfYnZhcyAoc2V0dGluZ3MpIHtcblx0c2V0dGluZ3MgPSBhcHBseV9kZWZhdWx0cyhzZXR0aW5ncyk7XG5cdGNvbnN0IG9sZF9wb3N0ID0gYXdhaXQgdGhpcy5wb3N0X3Nob3coc2V0dGluZ3MucG9zdF9pZCk7XG5cdHNldHRpbmdzLm1lc3NhZ2UgPSBzZXR0aW5ncy5tZXNzYWdlLnJlcGxhY2UoJyUnLCBvbGRfcG9zdC5pZCk7XG5cblx0Y29uc3QgbmV3X3Bvc3QgPSBhd2FpdCB0aGlzLnBvc3RfY3JlYXRlKHtcblx0XHR0YWdzOiBmaWx0ZXJfdGFncyhvbGRfcG9zdC50YWdzKSxcblx0XHRzb3VyY2VzOiBvbGRfcG9zdC5zb3VyY2VzLFxuXHRcdGRlc2NyaXB0aW9uOiBzZXR0aW5ncy5kZXNjcmlwdGlvbiA9PT0gdHJ1ZSA/IGAke3NldHRpbmdzLm1lc3NhZ2V9XFxuJHtvbGRfcG9zdC5kZXNjcmlwdGlvbn1gIDogb2xkX3Bvc3QuZGVzY3JpcHRpb24sXG5cdFx0cmF0aW5nOiBvbGRfcG9zdC5yYXRpbmcsXG5cdFx0cGFyZW50X2lkOiBvbGRfcG9zdC5yZWxhdGlvbnNoaXBzLnBhcmVudF9pZCxcblxuXHRcdHVwbG9hZDogc2V0dGluZ3MucmVwbGFjZW1lbnRcblx0fSk7XG5cblx0aWYgKHNldHRpbmdzLmNvbW1lbnQgPT09IHRydWUpIHtcblx0XHRhd2FpdCB0aGlzLmNvbW1lbnRfY3JlYXRlKG5ld19wb3N0LnBvc3RfaWQsIHNldHRpbmdzLm1lc3NhZ2UpO1xuXHR9XG5cblx0YXdhaXQgc2V0X3BhcmVudC5jYWxsKHRoaXMsIG9sZF9wb3N0LmlkLCBuZXdfcG9zdC5wb3N0X2lkKTtcblx0Zm9yIChjb25zdCBjaGlsZF9pZCBvZiBvbGRfcG9zdC5yZWxhdGlvbnNoaXBzLmNoaWxkcmVuKSB7XG5cdFx0YXdhaXQgc2V0X3BhcmVudC5jYWxsKHRoaXMsIGNoaWxkX2lkLCBuZXdfcG9zdC5wb3N0X2lkKTtcblx0fVxuXHQvLyBGaXggd2l0aCBwb29sXG5cblx0YXdhaXQgdGhpcy5wb3N0X2NvcHlfbm90ZXMob2xkX3Bvc3QuaWQsIG5ld19wb3N0LnBvc3RfaWQpO1xuXG5cdC8vIG9wdGlvbmFsbHkgZGVsZXRlIHRoZSBwb3N0XG5cdGF3YWl0IHRoaXMucG9zdF9mbGFnX2NyZWF0ZSh0aGlzLnBvc3RfZmxhZ19yZWFzb25zLmluZmVyaW9yLCBvbGRfcG9zdC5pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5X2RlZmF1bHRzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MucG9zdF9pZCwgJ3Bvc3RfaWQnKTtcblx0aWYgKHNldHRpbmdzLnJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JlcGxhY2VtZW50IG11c3QgYmUgZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwb3N0X2lkOiBzZXR0aW5ncy5wb3N0X2lkLFxuXHRcdGNvbW1lbnQ6IG51bGxpc2goc2V0dGluZ3MuY29tbWVudCwgZmFsc2UpLFxuXHRcdGRlc2NyaXB0aW9uOiBudWxsaXNoKHNldHRpbmdzLmRlc2NyaXB0aW9uLCB0cnVlKSxcblx0XHRtZXNzYWdlOiBudWxsaXNoKHNldHRpbmdzLm1lc3NhZ2UsICdTdXBlcmlvciB2ZXJzaW9uIG9mIHBvc3QgIyUnKSxcblx0XHRkZWxldGU6IG51bGxpc2goc2V0dGluZ3MuZGVsZXRlLCBmYWxzZSksXG5cdFx0cmVwbGFjZW1lbnQ6IHNldHRpbmdzLnJlcGxhY2VtZW50XG5cdH07XG59XG5cbmZ1bmN0aW9uIG51bGxpc2ggKHZhbHVlLCByZXBsYWNlbWVudCkge1xuXHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiByZXBsYWNlbWVudDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0X3BhcmVudCAocG9zdF9pZCwgbmV3X3BhcmVudCkge1xuXHRyZXR1cm4gdGhpcy5wb3N0X3VwZGF0ZSh7XG5cdFx0aWQ6IHBvc3RfaWQsXG5cdFx0cGFyZW50X2lkOiBuZXdfcGFyZW50XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJfdGFncyAodGFnX29iamVjdCkge1xuXHRjb25zdCB0YWdzX3RvX3JlbW92ZSA9IFtcblx0XHQnYmV0dGVyX3ZlcnNpb25fYXRfc291cmNlJyxcblx0XHQnc21hbGxlcl92ZXJzaW9uX2F0X3NvdXJjZScsXG5cdFx0J2NvbXByZXNzaW9uX2FydGlmYWN0cycsXG5cdFx0J2Nyb3BwZWQnLFxuXHRcdCd1cHNjYWxlJ1xuXHRdO1xuXG5cdHJldHVybiBPYmplY3QudmFsdWVzKHRhZ19vYmplY3QpXG5cdFx0LnJlZHVjZSgoYWNjLCBlKSA9PiBhY2MuY29uY2F0KGUpKVxuXHRcdC5maWx0ZXIoZSA9PiB0YWdzX3RvX3JlbW92ZS5pbmNsdWRlcyhlKSA9PT0gZmFsc2UpO1xufVxuXG5leHBvcnQgeyBwb3N0X2J2YXMgfTtcbiIsImNvbnN0IHsgcmF3X3Bvc3RfY29weV9ub3RlcyB9ID0gcmVxdWlyZSgnLi9yYXdfcG9zdF9jb3B5X25vdGVzLmpzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfY29weV9ub3RlcyAocG9zdF9pZCwgdG9faWQpIHtcblx0cmV0dXJuIHJhd19wb3N0X2NvcHlfbm90ZXMuY2FsbCh0aGlzLCB7XG5cdFx0aWQ6IHBvc3RfaWQsXG5cdFx0b3RoZXJfcG9zdF9pZDogdG9faWRcblx0fSk7XG59XG5cbmV4cG9ydCB7IHBvc3RfY29weV9ub3RlcyB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X2NvcHlfbm90ZXMgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUFVUJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9L2NvcHlfbm90ZXNgLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdVUkwnLFxuXHRcdGRhdGE6IHtcblx0XHRcdGlkOiBzZXR0aW5ncy5pZCxcblx0XHRcdG90aGVyX3Bvc3RfaWQ6IHNldHRpbmdzLm90aGVyX3Bvc3RfaWRcblx0XHR9XG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0aWYgKGVycm9yLnJlc3BvbnNlLmRhdGEucmVhc29uID09PSAnUG9zdCBoYXMgbm8gbm90ZXMnKSB7XG5cdFx0cmV0dXJuIG51bGw7IC8vIEV4cGVjdGVkIGJlaGF2aW9yIGlzIHRvIGhhdmUgbm8gZXJyb3JzIHRocm93biBpZiBwb3N0IGhhcyBubyBub3Rlc1xuXHR9IGVsc2Uge1xuXHRcdC8vIFRvZG9cblx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5pZCwgJ2lkJyk7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5vdGhlcl9wb3N0X2lkLCAnb3RoZXJfcG9zdF9pZCcpO1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9jb3B5X25vdGVzIH07XG4iLCJjb25zdCB7IHJhd19wb3N0X2NyZWF0ZSB9ID0gcmVxdWlyZSgnLi9yYXdfcG9zdF9jcmVhdGUuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblx0cmV0dXJuIHJhd19wb3N0X2NyZWF0ZS5jYWxsKHRoaXMsIHRyYW5zZm9ybV9zZXR0aW5ncyhzZXR0aW5ncykpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKHNldHRpbmdzLnVwbG9hZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzdXBwbHkgYW4gdXBsb2FkIGZpbGUgdG8gdXBsb2FkIGEgcG9zdCcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBzZXR0aW5ncy5yYXRpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyYXRpbmcgbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9IGVsc2UgaWYgKFsnZScsICdxJywgJ3MnXS5pbmNsdWRlcyhzZXR0aW5ncy5yYXRpbmcuY2hhckF0KDApKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ZpcnN0IGNoYXJhY3RlciBvZiByYXRpbmcgbXVzdCBiZSBvbmUgb2YgW1xcJ2VcXCcsIFxcJ3FcXCcsIFxcJ3NcXCddJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MudGFncyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3MudGFncyA9PT0gZmFsc2UpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3RhZ3MgbXVzdCBiZSBvZiB0eXBlIGFycmF5Jyk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy50YWdzLmV2ZXJ5KGUgPT4gdHlwZW9mIGUgPT09ICdzdHJpbmcnKSA9PT0gZmFsc2UpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignZXZlcnkgZWxlbWVudCBvZiB0YWdzIG11c3Qgb2Ygb2YgdHlwZSBzdHJpbmcnKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoc2V0dGluZ3Muc291cmNlcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3Muc291cmNlcyA9PT0gZmFsc2UpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZXMgbXVzdCBiZSBvZiB0eXBlIGFycmF5Jyk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy50YWdzLmV2ZXJ5KGUgPT4gdHlwZW9mIGUgPT09ICdzdHJpbmcnKSA9PT0gZmFsc2UpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignZXZlcnkgZWxlbWVudCBvZiBzb3VyY2VzIG11c3Qgb2Ygb2YgdHlwZSBzdHJpbmcnKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge1xuXHRcdCd1cGxvYWRbdGFnX3N0cmluZ10nOiAoc2V0dGluZ3MudGFncyB8fCBbXSkuam9pbignICcpLFxuXHRcdCd1cGxvYWRbcmF0aW5nXSc6IHNldHRpbmdzLnJhdGluZy5jaGFyQXQoMCksXG5cdFx0J3VwbG9hZFtzb3VyY2VdJzogKHNldHRpbmdzLnNvdXJjZXMgfHwgW10pLmpvaW4oJ1xcbicpLFxuXHRcdCd1cGxvYWRbZGVzY3JpcHRpb25dJzogKHNldHRpbmdzLmRlc2NyaXB0aW9uIHx8ICcnKSxcblx0XHQndXBsb2FkW3BhcmVudF9pZF0nOiAoc2V0dGluZ3MucGFyZW50X2lkIHx8IG51bGwpXG5cdH07XG5cblx0aWYgKHNldHRpbmdzLnVwbG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcblx0XHRyZXR1cm5fb2JqZWN0Wyd1cGxvYWRbZmlsZV0nXSA9IHNldHRpbmdzLnVwbG9hZDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm5fb2JqZWN0Wyd1cGxvYWRbZGlyZWN0X3VybF0nXSA9IHNldHRpbmdzLnVwbG9hZDtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyBwb3N0X2NyZWF0ZSB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIHVwbG9hZFt0YWdfc3RyaW5nXSBBIHNwYWNlIGRlbGltaXRlZCBsaXN0IG9mIHRhZ3MuXG4vLyB1cGxvYWRbZmlsZV0gVGhlIGZpbGUgZGF0YSBlbmNvZGVkIGFzIGEgbXVsdGlwYXJ0IGZvcm0uXG4vLyB1cGxvYWRbcmF0aW5nXSBUaGUgcmF0aW5nIGZvciB0aGUgcG9zdC4gQ2FuIGJlOiBzLCBxIG9yIGUgZm9yIHNhZmUsIHF1ZXN0aW9uYWJsZSwgYW5kIGV4cGxpY2l0IHJlc3BlY3RpdmVseS5cbi8vIHVwbG9hZFtkaXJlY3RfdXJsXSBJZiB0aGlzIGlzIGEgVVJMLCBlNjIxIHdpbGwgZG93bmxvYWQgdGhlIGZpbGUuXG4vLyB1cGxvYWRbc291cmNlXSBUaGlzIHdpbGwgYmUgdXNlZCBhcyB0aGUgcG9zdCdzICdTb3VyY2UnIHRleHQuIFNlcGFyYXRlIG11bHRpcGxlIFVSTHMgd2l0aCAlMEEgKHVybC1lbmNvZGVkIG5ld2xpbmUpIHRvIGRlZmluZSBtdWx0aXBsZSBzb3VyY2VzLiBMaW1pdCBvZiB0ZW4gVVJMc1xuLy8gdXBsb2FkW2Rlc2NyaXB0aW9uXSBUaGUgZGVzY3JpcHRpb24gZm9yIHRoZSBwb3N0LlxuLy8gdXBsb2FkW3BhcmVudF9pZF0gVGhlIElEIG9mIHRoZSBwYXJlbnQgcG9zdC5cbi8vIHVwbG9hZFtyZWZlcmVyX3VybF0gICAgICAgICA/XG4vLyB1cGxvYWRbbWQ1X2NvbmZpcm1hdGlvbl0gICAgdXNlbGVzc1xuLy8gdXBsb2FkW2FzX3BlbmRpbmddIElmIHRydWUgcG9zdCB3aWxsIGJlIHBvc3RlZCBhcyBwZW5kaW5nXG5cbi8vIHRhZ19zdHJpbmcsIHJhdGluZywgc291cmNlIChmaWxlIHx8IGRpcmVjdF91bHIpIGFyZSByZXF1aXJlZFxuLy8gYWxsIG90aGVycyBzaG91bGQgYmUgbnVsbFxuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy91cGxvYWRzJyxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnRk9STScsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCBuZXdfc2V0dGluZ3MgPSB7XG5cdFx0J3VwbG9hZFt0YWdfc3RyaW5nXSc6IHNldHRpbmdzWyd1cGxvYWRbdGFnX3N0cmluZ10nXSxcblx0XHQndXBsb2FkW3JhdGluZ10nOiBzZXR0aW5nc1sndXBsb2FkW3JhdGluZ10nXSxcblx0XHQndXBsb2FkW3NvdXJjZV0nOiBzZXR0aW5nc1sndXBsb2FkW3NvdXJjZV0nXVxuXHR9O1xuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10gIT09IHVuZGVmaW5lZCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10gPSBzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ107XG5cdH0gZWxzZSB7XG5cdFx0bmV3X3NldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSA9IHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddICE9PSBudWxsKSB7XG5cdFx0bmV3X3NldHRpbmdzWyd1cGxvYWRbZGVzY3JpcHRpb25dJ10gPSBzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddICE9PSBudWxsKSB7XG5cdFx0bmV3X3NldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ107XG5cdH1cblxuXHRyZXR1cm4gbmV3X3NldHRpbmdzO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbdGFnX3N0cmluZ10nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbdGFnX3N0cmluZ10gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbdGFnX3N0cmluZ10nXSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFt0YWdfc3RyaW5nXSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddICE9PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0JvdGggdXBsb2FkW2ZpbGVdIGFuZCB1cGxvYWRbZGlyZWN0X3VybF0gY2FuIG5vdCBiZSBkZWZpbmVkJyk7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddID09PSB1bmRlZmluZWQgJiYgc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciB1cGxvYWRbZmlsZV0gb3IgdXBsb2FkW2RpcmVjdF91cmxdIG11c3QgYmUgZGVmaW5lZCcpO1xuXHR9XG5cblx0Ly8gdG9kbyB0ZXN0IHRoaXNcblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSkge1xuXHRcdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10uY29uc3RydWN0b3IgIT09IEFycmF5QnVmZmVyKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtmaWxlXSBtdXN0IGJlIG9mIHR5cGUgQXJyYXlCdWZmZXInKTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBmb3IgZGF0YSBpbiB0aGUgYXJyYXkgYnVmZmVyP1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSkge1xuXHRcdGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddICE9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZGlyZWN0X3VybF0gbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGl0IGlzIGFuIGFjdHVhbCB1cmw/XG5cdH1cblxuXHRpZiAoWydzJywgJ3EnLCAnZSddLmluY2x1ZGVzKHNldHRpbmdzWyd1cGxvYWRbcmF0aW5nXSddKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtyYXRpbmddIG11c3QgYmUgb25lIG9mIFtcXCdzXFwnLCBcXCdxXFwnLCBcXCdlXFwnXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbc291cmNlXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtzb3VyY2VdIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW3NvdXJjZV0nXSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtzb3VyY2VdIG11c3QgYmUgdW5kZWZpbmVkIG9yIG9mIHR5cGUgc3RyaW5nIG9yIG51bGwnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtkZXNjcmlwdGlvbl0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbZGVzY3JpcHRpb25dJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZGVzY3JpcHRpb25dIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbcGFyZW50X2lkXSBtdXN0IHByZXNlbnQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSA9PT0gbnVsbCkge1xuXHRcdC8vIEl0IGlzIGZpbmUgaWYgcGFyZW50X2lkIGlzIG51bGxcblx0fSBlbHNlIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10sICd1cGxvYWRbcGFyZW50X2lkXScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9jcmVhdGUgfTtcbiIsImltcG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9IGZyb20gJy4vcmF3X3Bvc3Rfc2VhcmNoLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9zZWFyY2ggKHRhZ19zdHJpbmcsIHBhZ2UgPSAwKSB7XG5cdHJldHVybiByYXdfcG9zdF9zZWFyY2guY2FsbCh0aGlzLCB7XG5cdFx0bGltaXQ6IDMyMCxcblx0XHR0YWdzOiB0YWdfc3RyaW5nLFxuXHRcdHBhZ2U6IHBhZ2UudG9TdHJpbmcoKVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcG9zdF9zZWFyY2ggfTtcbiIsImltcG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9IGZyb20gJy4vcmF3X3Bvc3Rfc2VhcmNoLmpzJztcblxuY29uc3QgcG9zdHNfcGVyX3BhZ2UgPSAzMjA7XG5cbi8vIFlvdSBjYW4gbm90IGhhdmUgYSBkaWZmZXJlbnQgb3JkZXIgd2hlbiBzZWFyY2hpbmcgdGhyb3VnaCBwb3N0cyBsaWtlIHRoaXNcbmFzeW5jIGZ1bmN0aW9uKiBwb3N0X3NlYXJjaF9pdGVyYXRvciAoc2VhcmNoX3N0cmluZykge1xuXHQvLyBcIlByb3ZpZGluZyBhcmJpdHJhcmlseSBsYXJnZSB2YWx1ZXMgdG8gb2J0YWluIHRoZSBtb3N0IHJlY2VudCBwb3N0c1xuXHQvLyBpcyBub3QgcG9ydGFibGUgYW5kIG1heSBicmVhayBpbiB0aGUgZnV0dXJlXCIuICh3aWtpKVxuXHQvLyBJIGRvIHdoYXQgSSB3YW50XG5cdGxldCBtYXhfaWQgPSAxZTk7XG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3p3YWdvdGgvZTYyMW5nL2lzc3Vlcy8yMDJcblx0XHRjb25zdCB7IHBvc3RzIH0gPSBhd2FpdCByYXdfcG9zdF9zZWFyY2guY2FsbCh0aGlzLCB7XG5cdFx0XHR0YWdzOiBzZWFyY2hfc3RyaW5nLFxuXHRcdFx0bGltaXQ6IHBvc3RzX3Blcl9wYWdlLFxuXHRcdFx0cGFnZTogYGIke21heF9pZH1gXG5cdFx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcblxuXHRcdHlpZWxkKiBwb3N0cztcblx0XHRtYXhfaWQgPSBwb3N0cy5yZWR1Y2UoKGFjYywgZSkgPT4gYWNjLmlkIDwgZS5pZCA/IGFjYyA6IGUpLmlkO1xuXG5cdFx0aWYgKHBvc3RzLmxlbmd0aCA8IHBvc3RzX3Blcl9wYWdlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyBwb3N0X3NlYXJjaF9pdGVyYXRvciB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZV9zdHJpbmcsXG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfcGFnZV9zdHJpbmdcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyBUaGVyZSBpcyBhbiBlZGdlIGNhc2Ugd2hlcmUgdGhlIGRhdGEgY2FuIGJlIG1kNT08bWQ1PlxuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF9zZWFyY2ggKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRwYXRoOiAnL3Bvc3RzJyxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKHNldHRpbmdzLnRhZ3MgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9zdHJpbmcoc2V0dGluZ3MudGFncywgJ3RhZ3MnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5saW1pdCwgJ2xpbWl0Jyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MucGFnZSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nKHNldHRpbmdzLnBhZ2UsICdwYWdlJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge307XG5cblx0aWYgKHNldHRpbmdzLmxpbWl0ICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5saW1pdCA9IHNldHRpbmdzLmxpbWl0O1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnRhZ3MgIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0LnRhZ3MgPSBzZXR0aW5ncy50YWdzO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0LnBhZ2UgPSBzZXR0aW5ncy5wYWdlO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3Rfc2VhcmNoIH0gZnJvbSAnLi8uLi9pbmRleC9yYXdfcG9zdF9zZWFyY2guanMnO1xuaW1wb3J0IHsgcmF3X3Bvc3Rfc2hvdyB9IGZyb20gJy4vcmF3X3Bvc3Rfc2hvdy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9tZDUgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2hvd19pZCAocG9zdF9pZCkge1xuXHRyZXR1cm4gcmF3X3Bvc3Rfc2hvdy5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZFxuXHR9KS50aGVuKGUgPT4gZS5wb3N0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9zaG93X21kNSAobWQ1KSB7XG5cdHZhbGlkYXRlX21kNShtZDUpO1xuXHRyZXR1cm4gcmF3X3Bvc3Rfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdHRhZ3M6IGBtZDU6JHttZDV9YCxcblx0XHRsaW1pdDogMSxcblx0XHRwYWdlOiBudWxsXG5cdH0pLnRoZW4oZSA9PiB7XG5cdFx0aWYgKGUucG9zdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGUucG9zdHNbMF07XG5cdFx0fVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9zaG93IChpZF9tZDUpIHtcblx0aWYgKHR5cGVvZiBpZF9tZDUgPT09ICdzdHJpbmcnICYmIGlkX21kNS5sZW5ndGggPT09IDMyKSB7XG5cdFx0cmV0dXJuIHBvc3Rfc2hvd19tZDUuY2FsbCh0aGlzLCBpZF9tZDUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBwb3N0X3Nob3dfaWQuY2FsbCh0aGlzLCBOdW1iZXIoaWRfbWQ1KSk7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0cG9zdF9zaG93X2lkLFxuXHRwb3N0X3Nob3dfbWQ1LFxuXHRwb3N0X3Nob3dcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfc2hvdyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmlkLCAncG9zdF9pZCcpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHBhdGg6IGAvcG9zdHMvJHtzZXR0aW5ncy5pZH1gLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6IHVuZGVmaW5lZCxcblx0XHRkYXRhOiBudWxsXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9zaG93IH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF91cGRhdGUgfSBmcm9tICcuL3Jhd19wb3N0X3VwZGF0ZS5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfdXBkYXRlIChzZXR0aW5ncykge1xuXHRyZXR1cm4gcmF3X3Bvc3RfdXBkYXRlLmNhbGwodGhpcywge1xuXHRcdGlkOiBzZXR0aW5ncy5pZCxcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJzogZ2V0X2RpZmZlcmVuY2VzKHNldHRpbmdzLCAndGFnc190b19hZGQnLCAndGFnc190b19yZW1vdmUnLCAnICcpLFxuXHRcdCdwb3N0W3RhZ19zdHJpbmddJzogb3B0aW9uYWxfam9pbihzZXR0aW5ncy50YWdzLCAnICcpLFxuXHRcdCdwb3N0W29sZF90YWdfc3RyaW5nXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Mub2xkX3RhZ3MsICcgJyksXG5cdFx0J3Bvc3Rbc291cmNlX2RpZmZdJzogZ2V0X2RpZmZlcmVuY2VzKHNldHRpbmdzLCAnc291cmNlc190b19hZGQnLCAnc291cmNlc190b19yZW1vdmUnLCAnXFxuJyksXG5cdFx0J3Bvc3Rbc291cmNlXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Muc291cmNlcywgJ1xcbicpLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJzogb3B0aW9uYWxfam9pbihzZXR0aW5ncy5vbGRfc291cmNlcywgJ1xcbicpLFxuXHRcdCdwb3N0W2Rlc2NyaXB0aW9uXSc6IHNldHRpbmdzLmRlc2NyaXB0aW9uIHx8IG51bGwsXG5cdFx0J3Bvc3Rbb2xkX2Rlc2NyaXB0aW9uXSc6IHNldHRpbmdzLm9sZF9kZXNjcmlwdGlvbiB8fCBudWxsLFxuXHRcdCdwb3N0W3BhcmVudF9pZF0nOiBzZXR0aW5ncy5wYXJlbnRfaWQgfHwgbnVsbCxcblx0XHQncG9zdFtvbGRfcGFyZW50X2lkXSc6IHNldHRpbmdzLm9sZF9wYXJlbnRfaWQgfHwgbnVsbCxcblx0XHQncG9zdFtyYXRpbmddJzogZ2V0X3JhdGluZyhzZXR0aW5ncy5yYXRpbmcpLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJzogZ2V0X3JhdGluZyhzZXR0aW5ncy5vbGRfcmF0aW5nKSxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nOiBzZXR0aW5ncy5yZWFzb24gfHwgbnVsbFxuXHR9KTtcbn1cblxuLy8gSWRlYSBmb3IgYSBkaWZmZXJlbnQgdHlwZSBvZiB1cGRhdGUgZnVuY3Rpb24uIE1heWJlIGl0cyBiZXR0ZXIgaW4gc29tZSBjYXNlc1xuLy8gYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtX3Bvc3QgKHBvc3RfaWQsIHRyYW5zZm9ybV9mdW5jdGlvbikge1xuLy8gICBjb25zdCBwb3N0ID0gYXdhaXQgZ2V0X3Bvc3QocG9zdF9pZCk7XG4vLyAgIGNvbnN0IG5ld19wb3N0ID0gYXdhaXQgdHJhbnNmb3JtX2Z1bmN0aW9uKHBvc3RfaWQpXG4vLyAgIHJldHVybiBwb3N0X3VwZGF0ZShwb3N0LCBuZXdfcG9zdCk7XG4vLyB9XG5cbmZ1bmN0aW9uIGdldF9yYXRpbmcgKHJhdGluZykge1xuXHRpZiAocmF0aW5nICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gcmF0aW5nLmNoYXJBdCgwKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBvcHRpb25hbF9qb2luIChsaXN0LCBqb2luZXIpIHtcblx0aWYgKGxpc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBsaXN0LmpvaW4oam9pbmVyKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRfZGlmZmVyZW5jZXMgKHNldHRpbmdzLCBhZGRfc3RyaW5nLCByZW1vdmVfc3RyaW5nLCBqb2luZXIpIHtcblx0aWYgKHNldHRpbmdzW2FkZF9zdHJpbmddICE9PSB1bmRlZmluZWQgfHwgc2V0dGluZ3NbcmVtb3ZlX3N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IGFkZHMgPSAoc2V0dGluZ3NbYWRkX3N0cmluZ10gfHwgW10pXG5cdFx0XHQuam9pbihqb2luZXIpO1xuXHRcdGNvbnN0IHJlbW92ZXMgPSAoc2V0dGluZ3NbcmVtb3ZlX3N0cmluZ10gfHwgW10pXG5cdFx0XHQubWFwKGUgPT4gYC0ke2UudG9TdHJpbmcoKX1gKVxuXHRcdFx0LmpvaW4oam9pbmVyKTtcblxuXHRcdHJldHVybiBgJHthZGRzfSR7am9pbmVyfSR7cmVtb3Zlc31gO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBudWxsOyAvLyBJZiBubyBjaGFuZ2VzIHJldHVybiBudWxsXG5cdH1cbn1cblxuZXhwb3J0IHtcblx0cG9zdF91cGRhdGVcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfdXBkYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BBVENIJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9YCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnRk9STScsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdpZCcpO1xuXG5cdFtcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJyxcblx0XHQncG9zdFt0YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbb2xkX3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtzb3VyY2VfZGlmZl0nLFxuXHRcdCdwb3N0W3NvdXJjZV0nLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJyxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nLFxuXHRcdC8vIHBhcmVudF9pZFxuXHRcdCdwb3N0W3JhdGluZ10nLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJyxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nXG5cdFx0Ly8gaGFzX2VtYmVkZGVkX25vdGVzIHdpbGwgYmUgcmVtb3ZlZCBhdCBzb21lIHBvaW50LlxuXHRdLmZvckVhY2goZSA9PiB7XG5cdFx0aWYgKHNldHRpbmdzW2VdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtlfSBtdXN0IGJlIHByZXNlbnRgKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzW2VdID09PSBudWxsKSB7XG5cdFx0XHQvLyBhbGwgb2YgdGhlc2UgY2FuIGJlIG51bGxcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1tlXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtlfSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nYCk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RbcGFyZW50X2lkXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3Rbb2xkX3BhcmVudF9pZF0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH1cblxuXHRbXG5cdFx0J3RhZ19zdHJpbmcnLFxuXHRcdCdzb3VyY2UnLFxuXHRcdCdkZXNjcmlwdGlvbicsXG5cdFx0J3BhcmVudF9pZCcsXG5cdFx0J3JhdGluZydcblx0XS5mb3JFYWNoKGUgPT4ge1xuXHRcdGlmIChzZXR0aW5nc1tgcG9zdFtvbGRfJHtlfV1gXSAhPT0gbnVsbCAmJiBzZXR0aW5nc1tgcG9zdFske2V9XWBdID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYG9sZF8ke2V9IG11c3Qgbm90IGJlIHByZXNlbnQgaWYgJHtlfSBpcyBub3QgcHJlc2VudGApO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3RhZ19zdHJpbmddJ10gIT09IG51bGwgJiYgc2V0dGluZ3NbJ3Bvc3RbdGFnX3N0cmluZ19kaWZmXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdhdCBtb3N0IG9uZSBvZiB0YWdfc3RyaW5nIGFuZCB0YWdfc3RyaW5nX2RpZmYgY2FuIGJlIG5vbi1udWxsJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbc291cmNlXSddICE9PSBudWxsICYmIHNldHRpbmdzWydwb3N0W3NvdXJjZV9kaWZmXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdhdCBtb3N0IG9uZSBvZiBzb3VyY2UgYW5kIHNvdXJjZV9kaWZmIGNhbiBiZSBub24tbnVsbCcpO1xuXHR9XG5cblx0Ly8gUGFyZW50X2lkXG5cdGlmIChzZXR0aW5nc1sncG9zdFtwYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncGFyZW50X2lkIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSA9PT0gbnVsbCkge1xuXHRcdC8vIGl0IGNhbiBiZSBudWxsIHdpdGhvdXQgaXNzdWVcblx0fSBlbHNlIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddLCAncGFyZW50X2lkJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdvbGRfcGFyZW50X2lkIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBpdCBjYW4gYmUgbnVsbCB3aXRob3V0IGlzc3VlXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10sICdvbGRfcGFyZW50X2lkJyk7XG5cdH1cblxuXHQvLyBSYXRpbmdcblx0aWYgKHNldHRpbmdzWydwb3N0W3JhdGluZ10nXSAhPT0gbnVsbCAmJiBbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3RbcmF0aW5nXSddKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JhdGluZyBtdXN0IGJlIG9uZSBvZiBbXFwnZVxcJywgXFwncVxcJywgXFwnc1xcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcmF0aW5nXSddICE9PSBudWxsICYmIFsnZScsICdxJywgJ3MnXS5pbmNsdWRlcyhzZXR0aW5nc1sncG9zdFtvbGRfcmF0aW5nXSddKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ29sZF9yYXRpbmcgbXVzdCBiZSBvbmUgb2YgW1xcJ2VcXCcsIFxcJ3FcXCcsIFxcJ3NcXCddJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRyZXR1cm4gW1xuXHRcdCdwb3N0W3RhZ19zdHJpbmdfZGlmZl0nLFxuXHRcdCdwb3N0W3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtvbGRfdGFnX3N0cmluZ10nLFxuXHRcdCdwb3N0W3NvdXJjZV9kaWZmXScsXG5cdFx0J3Bvc3Rbc291cmNlXScsXG5cdFx0J3Bvc3Rbb2xkX3NvdXJjZV0nLFxuXHRcdCdwb3N0W2Rlc2NyaXB0aW9uXScsXG5cdFx0J3Bvc3Rbb2xkX2Rlc2NyaXB0aW9uXScsXG5cdFx0J3Bvc3RbcGFyZW50X2lkXScsXG5cdFx0J3Bvc3Rbb2xkX3BhcmVudF9pZF0nLFxuXHRcdCdwb3N0W3JhdGluZ10nLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJyxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nXG5cdF0ucmVkdWNlKChhY2MsIGUpID0+IHtcblx0XHRpZiAoc2V0dGluZ3NbZV0gIT09IG51bGwpIHtcblx0XHRcdGFjY1tlXSA9IHNldHRpbmdzW2VdO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2M7XG5cdH0sIHt9KTtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF92b3RlIH0gZnJvbSAnLi9yYXdfcG9zdF92b3RlLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX3VwIChwb3N0X2lkKSB7XG5cdHJldHVybiByYXdfcG9zdF92b3RlLmNhbGwodGhpcywge1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdHNjb3JlOiAxLFxuXHRcdG5vX3Vudm90ZTogdHJ1ZVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX2Rvd24gKHBvc3RfaWQpIHtcblx0cmF3X3Bvc3Rfdm90ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRzY29yZTogLTEsXG5cdFx0bm9fdW52b3RlOiB0cnVlXG5cdH0pO1xufVxuXG5leHBvcnQge1xuXHRwb3N0X3ZvdGVfdXAsXG5cdHBvc3Rfdm90ZV9kb3duXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3ZvdGVfb3B0aW9uLFxuXHR2YWxpZGF0ZV9ib29sZWFuXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfdm90ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9L3ZvdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3ZvdGVfcmVtb3ZlIChpZCkge1xuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7aWR9L3ZvdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiB1bmRlZmluZWQsXG5cdFx0ZGF0YTogdW5kZWZpbmVkLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5pZCwgJ3Bvc3RfaWQnKTtcblx0dmFsaWRhdGVfdm90ZV9vcHRpb24oc2V0dGluZ3Muc2NvcmUpO1xuXG5cdGlmIChzZXR0aW5ncy5ub191bnZvdGUgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzLm5vX3Vudm90ZSwgJ25vX3Vudm90ZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHRzY29yZTogc2V0dGluZ3Muc2NvcmVcblx0fTtcblxuXHRpZiAoc2V0dGluZ3Mubm9fdW52b3RlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5ub191bnZvdGUgPSBzZXR0aW5ncy5ub191bnZvdGU7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZXhwb3J0IHtcblx0cmF3X3Bvc3Rfdm90ZSxcblx0cG9zdF92b3RlX3JlbW92ZVxufTtcbiIsImltcG9ydCB7IHJhd19wb3N0X2ZsYWdfY3JlYXRlIH0gZnJvbSAnLi9yYXdfcG9zdF9mbGFnX2NyZWF0ZS5qcyc7XG5cbmNvbnN0IHBvc3RfZmxhZ19yZWFzb25zID0ge1xuXHRkZWxldGlvbjogJ2RlbGV0aW9uJyxcblx0aW5mZXJpb3I6ICdpbmZlcmlvcicsXG5cdGN1c3RvbTogJ3VzZXInLFxuXHRkbnA6ICdkbnBfYXJ0aXN0Jyxcblx0cGF5X2NvbnRlbnQ6ICdwYXlfY29udGVudCcsXG5cdHRyYWNlOiAndHJhY2UnLFxuXHRwcmV2aW91c2x5X2RlbGV0ZWQ6ICdwcmV2aW91c2x5X2RlbGV0ZWQnLFxuXHRyZWFsOiAncmVhbF9wb3JuJyxcblx0Y29ycnVwdDogJ2NvcnJ1cHQnXG59O1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2ZsYWdfY3JlYXRlIChyZWFzb24sIHBvc3RfaWQsIGV4dHJhKSB7XG5cdGlmIChwb3N0X2ZsYWdfcmVhc29uc1tyZWFzb25dID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFJlYXNvbiBtdXN0IGJlIG9uZSBvZiBbJHtPYmplY3Qua2V5cyhwb3N0X2ZsYWdfcmVhc29ucykuam9pbignLCAnKX1dYCk7XG5cdH1cblxuXHRjb25zdCBkYXRhID0ge1xuXHRcdCdwb3N0X2ZsYWdbcG9zdF9pZF0nOiBwb3N0X2lkLFxuXHRcdCdwb3N0X2ZsYWdbcmVhc29uX25hbWVdJzogcG9zdF9mbGFnX3JlYXNvbnNbcmVhc29uXSxcblx0XHQncG9zdF9mbGFnW3VzZXJfcmVhc29uXSc6IG51bGwsXG5cdFx0J3Bvc3RfZmxhZ1twYXJlbnRfaWRdJzogbnVsbFxuXHR9O1xuXG5cdGlmIChyZWFzb24gPT09IHBvc3RfZmxhZ19yZWFzb25zLmN1c3RvbSkge1xuXHRcdGRhdGFbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSA9IGV4dHJhO1xuXHR9IGVsc2UgaWYgKHJlYXNvbiA9PT0gcG9zdF9mbGFnX3JlYXNvbnMuaW5mZXJpb3IpIHtcblx0XHRkYXRhWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddID0gZXh0cmE7XG5cdH1cblxuXHRyZXR1cm4gcmF3X3Bvc3RfZmxhZ19jcmVhdGUuY2FsbCh0aGlzLCBkYXRhKTtcbn1cblxuZXhwb3J0IHtcblx0cG9zdF9mbGFnX2NyZWF0ZSxcblx0cG9zdF9mbGFnX3JlYXNvbnNcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfZmxhZ19jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9wb3N0X2ZsYWdzJyxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0X2ZsYWdbcG9zdF9pZF0nXSwgJ3Bvc3RfZmxhZ1twb3N0X2lkXScpO1xuXHRjb25zdCB2YWxpZF9yZWFzb24gPSBbXG5cdFx0J2RlbGV0aW9uJyxcblx0XHQnaW5mZXJpb3InLFxuXHRcdCd1c2VyJyxcblx0XHQnZG5wX2FydGlzdCcsXG5cdFx0J3BheV9jb250ZW50Jyxcblx0XHQndHJhY2UnLFxuXHRcdCdwcmV2aW91c2x5X2RlbGV0ZWQnLFxuXHRcdCdyZWFsX3Bvcm4nLFxuXHRcdCdjb3JydXB0J1xuXHRdO1xuXG5cdGlmICh2YWxpZF9yZWFzb24uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIG11c3QgYmUgb25lIG9mIFske3ZhbGlkX3JlYXNvbi5qb2luKCcsICcpfV1gKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAndXNlcicpIHtcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gIT09ICdzdHJpbmcnKVx0e1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdpZiBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIGlzIFxcJ3VzZXJcXCcgdGhlbiBwb3N0X2ZsYWdbdXNlcl9yZWFzb25dIG11c3QgYmUgYSBzdHJpbmcnKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncG9zdF9mbGFnW3VzZXJfcmVhc29uXSBtdXN0IGJlIG51bGwgdW5sZXNzIHBvc3RfZmxhZ1tyZWFzb25fbmFtZV0gaXMgXFwndXNlclxcJycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICdpbmZlcmlvcicpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ10sICdwb3N0X2ZsYWdbcGFyZW50X2lkXScpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0X2ZsYWdbcGFyZW50X2lkXSBtdXN0IGJlIG51bGwgdW5sZXNzIHBvc3RfZmxhZ1twYXJlbnRfaWRdIGlzIFxcJ2luZmVyaW9yXFwnJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge1xuXHRcdCdwb3N0X2ZsYWdbcG9zdF9pZF0nOiBzZXR0aW5nc1sncG9zdF9mbGFnW3Bvc3RfaWRdJ10sXG5cdFx0J3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nOiBzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddXG5cdH07XG5cblx0aWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICd1c2VyJykge1xuXHRcdHJldHVybl9vYmplY3RbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSA9IHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ107XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSA9PT0gJ2luZmVyaW9yJykge1xuXHRcdHJldHVybl9vYmplY3RbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ10gPSBzZXR0aW5nc1sncG9zdF9mbGFnW3BhcmVudF9pZF0nXTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycikge1xuXHRjb25zb2xlLmxvZyhlcnIpO1xuXHR0aHJvdyBlcnI7XG59O1xuXG5leHBvcnQgeyByYXdfcG9zdF9mbGFnX2NyZWF0ZSB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZV9zdHJpbmcsXG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfcGFnZV9zdHJpbmcsXG5cdHZhbGlkYXRlX2Jvb2xlYW4sXG5cdHZhbGlkYXRlX2Zyb21fbGlzdFxufSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd190YWdfc2VhcmNoIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHBhdGg6ICcvdGFncycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lkXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydzZWFyY2hbaWRdJ10sICdzZWFyY2hbaWRdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9zdHJpbmcoc2V0dGluZ3NbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10sICdzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbbmFtZV9tYXRjaGVzXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydzZWFyY2hbbmFtZV9tYXRjaGVzXSddLCAnc2VhcmNoW25hbWVfbWF0Y2hlc10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVdJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9zdHJpbmcoc2V0dGluZ3NbJ3NlYXJjaFtuYW1lXSddLCAnc2VhcmNoW25hbWVdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtjYXRlZ29yeV0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1snc2VhcmNoW2NhdGVnb3J5XSddLCAnc2VhcmNoW2NhdGVnb3J5XScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Jvb2xlYW4oc2V0dGluZ3NbJ3NlYXJjaFtoaWRlX2VtcHR5XSddLCAnc2VhcmNoW2hpZGVfZW1wdHldJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtoYXNfd2lraV0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Jvb2xlYW4oc2V0dGluZ3NbJ3NlYXJjaFtoYXNfd2lraV0nXSwgJ3NlYXJjaFtoYXNfd2lraV0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hhc19hcnRpc3RdJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGFzX2FydGlzdF0nXSwgJ3NlYXJjaFtoYXNfYXJ0aXN0XScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaXNfbG9ja2VkXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXSwgJ3NlYXJjaFtpc19sb2NrZWRdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtoaWRlX3dpa2ldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGlkZV93aWtpXSddLCAnc2VhcmNoW2hpZGVfd2lraV0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfZnJvbV9saXN0KHNldHRpbmdzWydzZWFyY2hbb3JkZXJdJ10sIFsnbmFtZScsICdkYXRlJywgJ2NvdW50JywgJ3NpbWlsYXJpdHknXSwgJ3NlYXJjaFtvcmRlcl0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5saW1pdCwgJ2xpbWl0Jyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MucGFnZSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nKHNldHRpbmdzLnBhZ2UsICdwYWdlJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge307XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaWRdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaWRdJ10gPSBzZXR0aW5nc1snc2VhcmNoW2lkXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXSA9IHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbbmFtZV9tYXRjaGVzXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW25hbWVfbWF0Y2hlc10nXSA9IHNldHRpbmdzWydzZWFyY2hbbmFtZV9tYXRjaGVzXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbbmFtZV0nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtuYW1lXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbY2F0ZWdvcnldJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbY2F0ZWdvcnldJ10gPSBzZXR0aW5nc1snc2VhcmNoW2NhdGVnb3J5XSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtoaWRlX2VtcHR5XSddID0gc2V0dGluZ3NbJ3NlYXJjaFtoaWRlX2VtcHR5XSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGFzX3dpa2ldJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaGFzX3dpa2ldJ10gPSBzZXR0aW5nc1snc2VhcmNoW2hhc193aWtpXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGFzX2FydGlzdF0nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtoYXNfYXJ0aXN0XSddID0gc2V0dGluZ3NbJ3NlYXJjaFtoYXNfYXJ0aXN0XSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaXNfbG9ja2VkXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2lzX2xvY2tlZF0nXSA9IHNldHRpbmdzWydzZWFyY2hbaXNfbG9ja2VkXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbb3JkZXJdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbb3JkZXJdJ10gPSBzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLmxpbWl0ICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5saW1pdCA9IHNldHRpbmdzLmxpbWl0O1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0LnBhZ2UgPSBzZXR0aW5ncy5wYWdlO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHJhd190YWdfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyByYXdfdGFnX3NlYXJjaCB9IGZyb20gJy4vcmF3X3RhZ19zZWFyY2guanMnO1xuXG5jb25zdCB0YWdfY2F0ZWdvcnkgPSB7XG5cdGdlbmVyYWw6IDAsXG5cdGFydGlzdDogMSxcblx0Y29weXJpZ2h0OiAzLFxuXHRjaGFyYWN0ZXI6IDQsXG5cdHNwZWNpZXM6IDUsXG5cdGludmFsaWQ6IDYsXG5cdG1ldGE6IDcsXG5cdGxvcmU6IDhcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHRhZ19zZWFyY2ggKHNldHRpbmdzLCBwYWdlID0gMCkge1xuXHRpZiAoc2V0dGluZ3MucGFnZSA9PT0gbnVsbCB8fCBzZXR0aW5ncy5wYWdlID09PSB1bmRlZmluZWQpIHtcblx0XHRzZXR0aW5ncy5wYWdlID0gcGFnZS50b1N0cmluZygpO1xuXHR9IC8vIGVsc2UgcGFnZSBpcyBhbHJlYWR5IHNldFxuXG5cdHJldHVybiByYXdfdGFnX3NlYXJjaC5jYWxsKHRoaXMsIG1ha2Vfc2V0dGluZ3Moc2V0dGluZ3MpKS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gbWFrZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHQnc2VhcmNoW2lkXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJzogbnVsbCxcblx0XHQnc2VhcmNoW25hbWVfbWF0Y2hlc10nOiBudWxsLFxuXHRcdCdzZWFyY2hbbmFtZV0nOiBudWxsLFxuXHRcdCdzZWFyY2hbY2F0ZWdvcnldJzogbnVsbCxcblx0XHQnc2VhcmNoW2hpZGVfZW1wdHldJzogbnVsbCxcblx0XHQnc2VhcmNoW2hhc193aWtpXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoYXNfYXJ0aXN0XSc6IG51bGwsXG5cdFx0J3NlYXJjaFtpc19sb2NrZWRdJzogbnVsbCxcblx0XHQnc2VhcmNoW2hpZGVfd2lraV0nOiBudWxsLFxuXHRcdCdzZWFyY2hbb3JkZXJdJzogbnVsbCxcblx0XHRsaW1pdDogbnVsbCxcblx0XHRwYWdlOiBzZXR0aW5ncy5wYWdlXG5cdH07XG5cblx0aWYgKHNldHRpbmdzLmlkICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MuaWQgIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaWRdJ10gPSBzZXR0aW5ncy5pZDtcblx0fSBlbHNlIGlmIChzZXR0aW5ncy5mdXp6eV9tYXRjaCAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzLmZ1enp5X21hdGNoICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXSA9IHNldHRpbmdzLmZ1enp5X21hdGNoO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzLndpbGRfbWF0Y2ggIT09IHVuZGVmaW5lZCAmJiBzZXR0aW5ncy53aWxkX21hdGNoICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW25hbWVfbWF0Y2hlc10nXSA9IHNldHRpbmdzLndpbGRfbWF0Y2g7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3MuZXhhY3RfbWF0Y2ggIT09IHVuZGVmaW5lZCAmJiBzZXR0aW5ncy5leGFjdF9tYXRjaCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lXSddID0gc2V0dGluZ3MuZXhhY3RfbWF0Y2g7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHRlcm0gb2YgWydoaWRlX2VtcHR5JywgJ2hhc193aWtpJywgJ2hhc19hcnRpc3QnLCAnaXNfbG9ja2VkJywgJ2hpZGVfd2lraScsICdvcmRlciddKSB7XG5cdFx0aWYgKHNldHRpbmdzW3Rlcm1dICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3NbdGVybV0gIT09IG51bGwpIHtcblx0XHRcdHJldHVybl9vYmplY3RbYHNlYXJjaFske3Rlcm19XWBdID0gc2V0dGluZ3NbdGVybV07XG5cdFx0fVxuXHR9XG5cblx0aWYgKHNldHRpbmdzLmNhdGVnb3J5ICE9PSBudWxsICYmIHNldHRpbmdzLmNhdGVnb3J5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAodGFnX2NhdGVnb3J5W3NldHRpbmdzLmNhdGVnb3J5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENhdGVnb3J5IG11c3QgYmUgb25lIG9mIFske09iamVjdC5rZXlzKHRhZ19jYXRlZ29yeSkuam9pbignLCAnKX1dYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtjYXRlZ29yeV0nXSA9IHNldHRpbmdzLmNhdGVnb3J5O1xuXHRcdH1cblx0fVxuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCAmJiBzZXR0aW5ncy5saW1pdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuX29iamVjdC5saW1pdCA9IHNldHRpbmdzLmxpbWl0O1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSAxMDAwO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHRhZ19zZWFyY2ggfTtcbiIsImltcG9ydCB7IHRhZ19zZWFyY2ggfSBmcm9tICcuL3RhZ19zZWFyY2guanMnO1xuXG5jb25zdCB0YWdzX3Blcl9wYWdlID0gMTAwMDtcblxuLy8gWW91IGNhbiBub3QgaGF2ZSBhIGRpZmZlcmVudCBvcmRlciB3aGVuIHNlYXJjaGluZyB0aHJvdWdoIHBvc3RzIGxpa2UgdGhpc1xuYXN5bmMgZnVuY3Rpb24qIHRhZ19zZWFyY2hfaXRlcmF0b3IgKHNlYXJjaF9vcHRpb25zKSB7XG5cdC8vIFwiUHJvdmlkaW5nIGFyYml0cmFyaWx5IGxhcmdlIHZhbHVlcyB0byBvYnRhaW4gdGhlIG1vc3QgcmVjZW50IHBvc3RzXG5cdC8vIGlzIG5vdCBwb3J0YWJsZSBhbmQgbWF5IGJyZWFrIGluIHRoZSBmdXR1cmVcIi4gKHdpa2kpXG5cdC8vIEkgZG8gd2hhdCBJIHdhbnRcblx0c2VhcmNoX29wdGlvbnMucGFnZSA9IG51bGw7XG5cdHNlYXJjaF9vcHRpb25zLmxpbWl0ID0gbnVsbDtcblxuXHRsZXQgbWF4X2lkID0gMWU5O1xuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96d2Fnb3RoL2U2MjFuZy9pc3N1ZXMvMjAyXG5cdFx0Y29uc3QgdGFncyA9IGF3YWl0IHRhZ19zZWFyY2guY2FsbCh0aGlzLCB7XG5cdFx0XHQuLi5zZWFyY2hfb3B0aW9ucyxcblx0XHRcdHBhZ2U6IGBiJHttYXhfaWR9YCxcblx0XHRcdGxpbWl0OiAxMDAwXG5cdFx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcblxuXHRcdHlpZWxkKiB0YWdzO1xuXHRcdG1heF9pZCA9IHRhZ3MucmVkdWNlKChhY2MsIGUpID0+IGFjYy5pZCA8IGUuaWQgPyBhY2MgOiBlKS5pZDtcblxuXHRcdGlmICh0YWdzLmxlbmd0aCA8IHRhZ3NfcGVyX3BhZ2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHRhZ19zZWFyY2hfaXRlcmF0b3IgfTtcbiIsImZ1bmN0aW9uIHZhbGlkYXRlX21kNSAobWQ1KSB7XG5cdGlmICh0eXBlb2YgbWQ1ICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWQ1IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0fVxuXG5cdGlmIChtZDUubGVuZ3RoICE9PSAzMikge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWQ1IG11c3QgYmUgb2YgbGVuZ3RoIDMyJyk7XG5cdH1cblxuXHRjb25zdCBjb250YWluc19ub25faGV4ID0gL1teMC05YS1mQS1GXS9nO1xuXHRpZiAoY29udGFpbnNfbm9uX2hleC50ZXN0KG1kNSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBjb250YWlucyBub24taGV4YWRlY2ltYWwgY2hhcmFjdGVyJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIChudW1iZXIsIG5hbWUpIHtcblx0aWYgKHR5cGVvZiBudW1iZXIgIT09ICdudW1iZXInKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9IG11c3QgYmUgYSBudW1iZXJgKTtcblx0fVxuXG5cdGlmIChOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcikgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9bXVzdCBiZSBhbiBpbnRlZ2VyYCk7XG5cdH1cblxuXHRpZiAobnVtYmVyIDwgMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc3RyaW5nIChzdHJpbmcsIG5hbWUpIHtcblx0aWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9IGlzIG5vdCBhIHN0cmluZ2ApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3ZvdGVfb3B0aW9uICh2b3RlKSB7XG5cdGlmICh2b3RlICE9PSAtMSAmJiB2b3RlICE9PSAwICYmIHZvdGUgIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3ZvdGUgaXMgbm90IG9mIHRoZSB2YWx1ZXMgWy0xLCAxXScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3BhZ2Vfc3RyaW5nIChzdHJpbmcsIG5hbWUpIHtcblx0dmFsaWRhdGVfc3RyaW5nKHN0cmluZywgbmFtZSk7XG5cblx0aWYgKCgvW2FiXT9cXGQrLykudGVzdChzdHJpbmcpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBkb2VzIG5vdCBtYXRjaCB0aGUgZm9ybWF0IC9bYWJdP1xcXFxkKy9gKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9ib29sZWFuIChib29sZWFuLCBuYW1lKSB7XG5cdGlmIChib29sZWFuICE9PSBmYWxzZSAmJiBib29sZWFuICE9PSB0cnVlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9IGlzIG5vdCBvZiB0aGUgdHlwZSBib29sZWFuYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfZnJvbV9saXN0ICh2YWx1ZSwgbGlzdCwgbmFtZSkge1xuXHRpZiAobGlzdC5zb21lKGUgPT4gZSA9PT0gdmFsdWUpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgVmFsdWUgJHt2YWx1ZX0gbm90IGluIGxpc3QgWyR7bGlzdC5qb2luKCcsICcpfV0gZm9yICR7bmFtZX1gKTtcblx0fVxufVxuXG5leHBvcnQge1xuXHR2YWxpZGF0ZV9tZDUsXG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV92b3RlX29wdGlvbixcblx0dmFsaWRhdGVfcGFnZV9zdHJpbmcsXG5cdHZhbGlkYXRlX2Jvb2xlYW4sXG5cdHZhbGlkYXRlX2Zyb21fbGlzdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZvcm0tZGF0YVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmF3X3Bvc3Rfc2hvdyB9IGZyb20gJy4vcG9zdC9zaG93L3Jhd19wb3N0X3Nob3cuanMnO1xuaW1wb3J0IHtcblx0cG9zdF9zaG93X2lkLFxuXHRwb3N0X3Nob3dfbWQ1LFxuXHRwb3N0X3Nob3dcbn0gZnJvbSAnLi9wb3N0L3Nob3cvcG9zdF9zaG93LmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3Rfc2VhcmNoIH0gZnJvbSAnLi9wb3N0L2luZGV4L3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5pbXBvcnQgeyBwb3N0X3NlYXJjaCB9IGZyb20gJy4vcG9zdC9pbmRleC9wb3N0X3NlYXJjaC5qcyc7XG5pbXBvcnQgeyBwb3N0X3NlYXJjaF9pdGVyYXRvciB9IGZyb20gJy4vcG9zdC9pbmRleC9wb3N0X3NlYXJjaF9pdGVyYXRvci5qcyc7XG5cbmltcG9ydCB7XG5cdHJhd19wb3N0X3ZvdGUsXG5cdHBvc3Rfdm90ZV9yZW1vdmVcbn0gZnJvbSAnLi9wb3N0L3ZvdGUvcmF3X3Bvc3Rfdm90ZS5qcyc7XG5pbXBvcnQge1xuXHRwb3N0X3ZvdGVfdXAsXG5cdHBvc3Rfdm90ZV9kb3duXG59IGZyb20gJy4vcG9zdC92b3RlL3Bvc3Rfdm90ZS5qcyc7XG5cbmltcG9ydCB7IHJhd19wb3N0X2NyZWF0ZSB9IGZyb20gJy4vcG9zdC9jcmVhdGUvcmF3X3Bvc3RfY3JlYXRlLmpzJztcbmltcG9ydCB7IHBvc3RfY3JlYXRlIH0gZnJvbSAnLi9wb3N0L2NyZWF0ZS9wb3N0X2NyZWF0ZS5qcyc7XG5cbmltcG9ydCB7IHJhd19wb3N0X3VwZGF0ZSB9IGZyb20gJy4vcG9zdC91cGRhdGUvcmF3X3Bvc3RfdXBkYXRlLmpzJztcbmltcG9ydCB7IHBvc3RfdXBkYXRlIH0gZnJvbSAnLi9wb3N0L3VwZGF0ZS9wb3N0X3VwZGF0ZS5qcyc7XG5cbmltcG9ydCB7IHJhd19wb3N0X2NvcHlfbm90ZXMgfSBmcm9tICcuL3Bvc3QvY29weV9ub3Rlcy9yYXdfcG9zdF9jb3B5X25vdGVzLmpzJztcbmltcG9ydCB7IHBvc3RfY29weV9ub3RlcyB9IGZyb20gJy4vcG9zdC9jb3B5X25vdGVzL3Bvc3RfY29weV9ub3Rlcy5qcyc7XG5cbmltcG9ydCB7IHJhd19wb3N0X2ZsYWdfY3JlYXRlIH0gZnJvbSAnLi9wb3N0X2ZsYWcvY3JlYXRlL3Jhd19wb3N0X2ZsYWdfY3JlYXRlLmpzJztcbmltcG9ydCB7XG5cdHBvc3RfZmxhZ19jcmVhdGUsXG5cdHBvc3RfZmxhZ19yZWFzb25zXG59IGZyb20gJy4vcG9zdF9mbGFnL2NyZWF0ZS9wb3N0X2ZsYWdfY3JlYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X2NvbW1lbnRfY3JlYXRlIH0gZnJvbSAnLi9jb21tZW50L2NyZWF0ZS9yYXdfY29tbWVudF9jcmVhdGUuanMnO1xuaW1wb3J0IHsgY29tbWVudF9jcmVhdGUgfSBmcm9tICcuL2NvbW1lbnQvY3JlYXRlL2NvbW1lbnRfY3JlYXRlLmpzJztcblxuaW1wb3J0IHsgcG9zdF9idmFzIH0gZnJvbSAnLi9wb3N0L2J2YXMvcG9zdF9idmFzLmpzJztcblxuaW1wb3J0IHsgcmF3X2JsaXBfY3JlYXRlIH0gZnJvbSAnLi9ibGlwL2NyZWF0ZS9yYXdfYmxpcF9jcmVhdGUuanMnO1xuaW1wb3J0IHsgYmxpcF9jcmVhdGUgfSBmcm9tICcuL2JsaXAvY3JlYXRlL2JsaXBfY3JlYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X3RhZ19zZWFyY2ggfSBmcm9tICcuL3RhZ3MvaW5kZXgvcmF3X3RhZ19zZWFyY2guanMnO1xuaW1wb3J0IHsgdGFnX3NlYXJjaCB9IGZyb20gJy4vdGFncy9pbmRleC90YWdfc2VhcmNoLmpzJztcbmltcG9ydCB7IHRhZ19zZWFyY2hfaXRlcmF0b3IgfSBmcm9tICcuL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaF9pdGVyYXRvci5qcyc7XG5cbmNsYXNzIEU2MjFBUEkge1xuXHQvLyBBbnkgb2YgdGhlc2UgY2FuIGJlIGFueXRoaW5nLCBidXQgZXJyb3JzIHdpbGwgYmUgdGhyb3duXG5cdC8vIHdoZW4gYW55IHJlcXVlc3RzIGFyZSB0cnlpbmcgdG8gYmUgbWFkZS5cblx0Y29uc3RydWN0b3IgKHVzZXJhZ2VudCwgdXNlcm5hbWUsIGFwaV9rZXkpIHtcblx0XHR0aGlzLnVzZXJhZ2VudCA9IHVzZXJhZ2VudDtcblx0XHR0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG5cdFx0dGhpcy5hcGlfa2V5ID0gYXBpX2tleTtcblx0fVxufVxuXG5FNjIxQVBJLnByb3RvdHlwZS52ZXJzaW9uID0gJzEuMDAxMDAnO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9zaG93ID0gcmF3X3Bvc3Rfc2hvdztcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2hvd19pZCA9IHBvc3Rfc2hvd19pZDtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2hvd19tZDUgPSBwb3N0X3Nob3dfbWQ1O1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zaG93ID0gcG9zdF9zaG93O1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9zZWFyY2ggPSByYXdfcG9zdF9zZWFyY2g7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3NlYXJjaCA9IHBvc3Rfc2VhcmNoO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zZWFyY2hfaXRlcmF0b3IgPSBwb3N0X3NlYXJjaF9pdGVyYXRvcjtcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfdm90ZSA9IHJhd19wb3N0X3ZvdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3ZvdGVfdXAgPSBwb3N0X3ZvdGVfdXA7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3ZvdGVfZG93biA9IHBvc3Rfdm90ZV9kb3duO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF92b3RlX3JlbW92ZSA9IHBvc3Rfdm90ZV9yZW1vdmU7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X2NyZWF0ZSA9IHJhd19wb3N0X2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfY3JlYXRlID0gcG9zdF9jcmVhdGU7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3VwZGF0ZSA9IHJhd19wb3N0X3VwZGF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfdXBkYXRlID0gcG9zdF91cGRhdGU7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X2NvcHlfbm90ZXMgPSByYXdfcG9zdF9jb3B5X25vdGVzO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9jb3B5X25vdGVzID0gcG9zdF9jb3B5X25vdGVzO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9mbGFnX2NyZWF0ZSA9IHJhd19wb3N0X2ZsYWdfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9mbGFnX2NyZWF0ZSA9IHBvc3RfZmxhZ19jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2ZsYWdfcmVhc29ucyA9IHBvc3RfZmxhZ19yZWFzb25zO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfY29tbWVudF9jcmVhdGUgPSByYXdfY29tbWVudF9jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5jb21tZW50X2NyZWF0ZSA9IGNvbW1lbnRfY3JlYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2J2YXMgPSBwb3N0X2J2YXM7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19ibGlwX2NyZWF0ZSA9IHJhd19ibGlwX2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLmJsaXBfY3JlYXRlID0gYmxpcF9jcmVhdGU7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd190YWdfc2VhcmNoID0gcmF3X3RhZ19zZWFyY2g7XG5FNjIxQVBJLnByb3RvdHlwZS50YWdfc2VhcmNoID0gdGFnX3NlYXJjaDtcbkU2MjFBUEkucHJvdG90eXBlLnRhZ19zZWFyY2hfaXRlcmF0b3IgPSB0YWdfc2VhcmNoX2l0ZXJhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBFNjIxQVBJO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9