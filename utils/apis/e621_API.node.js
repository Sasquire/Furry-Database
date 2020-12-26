module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/blip/create/blip_create.js":
/*!*******************************************!*\
  !*** ./source/blip/create/blip_create.js ***!
  \*******************************************/
/*! exports provided: blip_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blip_create", function() { return blip_create; });
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
/*! exports provided: raw_blip_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_blip_create", function() { return raw_blip_create; });
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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['blip[response_to]'], 'blip[response_to]');
	}

	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['blip[body]'], 'blip[body]');
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
/*! exports provided: comment_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment_create", function() { return comment_create; });
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
/*! exports provided: raw_comment_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_comment_create", function() { return raw_comment_create; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['comment[post_id]'], 'comment[post_id]');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['comment[body]'], 'comment[body]');
}




/***/ }),

/***/ "./source/download/download.node.js":
/*!******************************************!*\
  !*** ./source/download/download.node.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
	return axios__WEBPACK_IMPORTED_MODULE_1___default.a.request(request_options)
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
		const form = new form_data__WEBPACK_IMPORTED_MODULE_2___default.a();
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

/* harmony default export */ __webpack_exports__["default"] = (download);


/***/ }),

/***/ "./source/download/validate_settings.js":
/*!**********************************************!*\
  !*** ./source/download/validate_settings.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (validate_settings);


/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

E621API.prototype.raw_post_show = _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show"];
E621API.prototype.post_show_id = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_id"];
E621API.prototype.post_show_md5 = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_md5"];
E621API.prototype.post_show = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show"];

E621API.prototype.raw_post_search = _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__["raw_post_search"];
E621API.prototype.post_search = _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__["post_search"];
E621API.prototype.post_search_iterator = _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__["post_search_iterator"];

E621API.prototype.raw_post_vote = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__["raw_post_vote"];
E621API.prototype.post_vote_up = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__["post_vote_up"];
E621API.prototype.post_vote_down = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__["post_vote_down"];
E621API.prototype.post_vote_remove = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__["post_vote_remove"];

E621API.prototype.raw_post_create = _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__["raw_post_create"];
E621API.prototype.post_create = _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__["post_create"];

E621API.prototype.raw_post_update = _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__["raw_post_update"];
E621API.prototype.post_update = _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__["post_update"];

E621API.prototype.raw_post_copy_notes = _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__["raw_post_copy_notes"];
E621API.prototype.post_copy_notes = _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__["post_copy_notes"];

E621API.prototype.raw_post_flag_create = _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__["raw_post_flag_create"];
E621API.prototype.post_flag_create = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__["post_flag_create"];
E621API.prototype.post_flag_reasons = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__["post_flag_reasons"];

E621API.prototype.raw_comment_create = _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__["raw_comment_create"];
E621API.prototype.comment_create = _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__["comment_create"];

E621API.prototype.post_bvas = _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__["post_bvas"];

E621API.prototype.raw_blip_create = _blip_create_raw_blip_create_js__WEBPACK_IMPORTED_MODULE_18__["raw_blip_create"];
E621API.prototype.blip_create = _blip_create_blip_create_js__WEBPACK_IMPORTED_MODULE_19__["blip_create"];

E621API.prototype.raw_tag_search = _tags_index_raw_tag_search_js__WEBPACK_IMPORTED_MODULE_20__["raw_tag_search"];
E621API.prototype.tag_search = _tags_index_tag_search_js__WEBPACK_IMPORTED_MODULE_21__["tag_search"];
E621API.prototype.tag_search_iterator = _tags_index_tag_search_iterator_js__WEBPACK_IMPORTED_MODULE_22__["tag_search_iterator"];

/* harmony default export */ __webpack_exports__["default"] = (E621API);


/***/ }),

/***/ "./source/post/bvas/post_bvas.js":
/*!***************************************!*\
  !*** ./source/post/bvas/post_bvas.js ***!
  \***************************************/
/*! exports provided: post_bvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_bvas", function() { return post_bvas; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_0__["validate_counting_number"])(settings.post_id, 'post_id');
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
/*! exports provided: post_copy_notes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_copy_notes", function() { return post_copy_notes; });
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
/*! exports provided: raw_post_copy_notes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_copy_notes", function() { return raw_post_copy_notes; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'id');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.other_post_id, 'other_post_id');
}




/***/ }),

/***/ "./source/post/create/post_create.js":
/*!*******************************************!*\
  !*** ./source/post/create/post_create.js ***!
  \*******************************************/
/*! exports provided: post_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_create", function() { return post_create; });
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
/*! exports provided: raw_post_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_create", function() { return raw_post_create; });
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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['upload[parent_id]'], 'upload[parent_id]');
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
/*! exports provided: post_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_search", function() { return post_search; });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


async function post_search (tag_string, page = 0) {
	return _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
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
/*! exports provided: post_search_iterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_search_iterator", function() { return post_search_iterator; });
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
		const { posts } = await _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
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
/*! exports provided: raw_post_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_search", function() { return raw_post_search; });
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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings.tags, 'tags');
	}

	if (settings.limit !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_page_string"])(settings.page, 'page');
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
/*! exports provided: post_show_id, post_show_md5, post_show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_id", function() { return post_show_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_md5", function() { return post_show_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show", function() { return post_show; });
/* harmony import */ var _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");




async function post_show_id (post_id) {
	return _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__["raw_post_show"].call(this, {
		id: post_id
	}).then(e => e.post);
}

async function post_show_md5 (md5) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_2__["validate_md5"])(md5);
	return _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
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
/*! exports provided: raw_post_show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show", function() { return raw_post_show; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.node.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_show (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'post_id');

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
/*! exports provided: post_update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_update", function() { return post_update; });
/* harmony import */ var _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_update.js */ "./source/post/update/raw_post_update.js");


async function post_update (settings) {
	return _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_update"].call(this, {
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
/*! exports provided: raw_post_update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_update", function() { return raw_post_update; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'id');

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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post[parent_id]'], 'parent_id');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('old_parent_id must be present');
	} else if (settings['post[old_parent_id]'] === null) {
		// it can be null without issue
	} else {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post[old_parent_id]'], 'old_parent_id');
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
/*! exports provided: post_vote_up, post_vote_down */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_up", function() { return post_vote_up; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_down", function() { return post_vote_down; });
/* harmony import */ var _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");


async function post_vote_up (post_id) {
	return _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_vote"].call(this, {
		id: post_id,
		score: 1,
		no_unvote: true
	});
}

async function post_vote_down (post_id) {
	_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_vote"].call(this, {
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
/*! exports provided: raw_post_vote, post_vote_remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_vote", function() { return raw_post_vote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_remove", function() { return post_vote_remove; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'post_id');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_vote_option"])(settings.score);

	if (settings.no_unvote !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings.no_unvote, 'no_unvote');
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
/*! exports provided: post_flag_create, post_flag_reasons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_flag_create", function() { return post_flag_create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_flag_reasons", function() { return post_flag_reasons; });
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

	return _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_flag_create"].call(this, data);
}




/***/ }),

/***/ "./source/post_flag/create/raw_post_flag_create.js":
/*!*********************************************************!*\
  !*** ./source/post_flag/create/raw_post_flag_create.js ***!
  \*********************************************************/
/*! exports provided: raw_post_flag_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_flag_create", function() { return raw_post_flag_create; });
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
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post_flag[post_id]'], 'post_flag[post_id]');
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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post_flag[parent_id]'], 'post_flag[parent_id]');
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
/*! exports provided: raw_tag_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_tag_search", function() { return raw_tag_search; });
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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['search[id]'], 'search[id]');
	}

	if (settings['search[fuzzy_name_matches]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['search[fuzzy_name_matches]'], 'search[fuzzy_name_matches]');
	}

	if (settings['search[name_matches]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['search[name_matches]'], 'search[name_matches]');
	}

	if (settings['search[name]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['search[name]'], 'search[name]');
	}

	if (settings['search[category]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['search[category]'], 'search[category]');
	}

	if (settings['search[hide_empty]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings['search[hide_empty]'], 'search[hide_empty]');
	}

	if (settings['search[has_wiki]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings['search[has_wiki]'], 'search[has_wiki]');
	}

	if (settings['search[has_artist]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings['search[has_artist]'], 'search[has_artist]');
	}

	if (settings['search[is_locked]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings['search[is_locked]'], 'search[is_locked]');
	}

	if (settings['search[hide_wiki]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings['search[hide_wiki]'], 'search[hide_wiki]');
	}

	if (settings['search[order]'] !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_from_list"])(settings['search[order]'], ['name', 'date', 'count', 'similarity'], 'search[order]');
	}

	if (settings.limit !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_page_string"])(settings.page, 'page');
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
/*! exports provided: tag_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tag_search", function() { return tag_search; });
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

	return _raw_tag_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_tag_search"].call(this, make_settings(settings)).catch(handle_error);
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
/*! exports provided: tag_search_iterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tag_search_iterator", function() { return tag_search_iterator; });
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
		const tags = await _tag_search_js__WEBPACK_IMPORTED_MODULE_0__["tag_search"].call(this, {
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
/*! exports provided: validate_md5, validate_counting_number, validate_string, validate_vote_option, validate_page_string, validate_boolean, validate_from_list */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_md5", function() { return validate_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_counting_number", function() { return validate_counting_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_string", function() { return validate_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_vote_option", function() { return validate_vote_option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_page_string", function() { return validate_page_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_boolean", function() { return validate_boolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_from_list", function() { return validate_from_list; });
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
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("form-data");

/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvYmxpcC9jcmVhdGUvYmxpcF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9ibGlwL2NyZWF0ZS9yYXdfYmxpcF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9jb21tZW50L2NyZWF0ZS9jb21tZW50X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL2NvbW1lbnQvY3JlYXRlL3Jhd19jb21tZW50X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL2Rvd25sb2FkL2Rvd25sb2FkLm5vZGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9kb3dubG9hZC92YWxpZGF0ZV9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL21haW4uanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2J2YXMvcG9zdF9idmFzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jb3B5X25vdGVzL3Bvc3RfY29weV9ub3Rlcy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvY29weV9ub3Rlcy9yYXdfcG9zdF9jb3B5X25vdGVzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jcmVhdGUvcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2NyZWF0ZS9yYXdfcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9pbmRleC9wb3N0X3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9zaG93L3Bvc3Rfc2hvdy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3Qvc2hvdy9yYXdfcG9zdF9zaG93LmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC91cGRhdGUvcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3VwZGF0ZS9yYXdfcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3ZvdGUvcG9zdF92b3RlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC92b3RlL3Jhd19wb3N0X3ZvdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Bvc3RfZmxhZ19jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Jhd19wb3N0X2ZsYWdfY3JlYXRlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvdGFncy9pbmRleC9yYXdfdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9FNjIxQVBJL2V4dGVybmFsIFwiZm9ybS1kYXRhXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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cUVBQXNCOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFdUI7Ozs7Ozs7Ozs7Ozs7QUNyRHZCO0FBQUE7QUFBQTtBQUFBO0FBQStEO0FBQ2E7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLG9FQUFRO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0YsRUFBRSwwRkFBd0I7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUyQjs7Ozs7Ozs7Ozs7OztBQ3BIM0I7QUFBQTtBQUFBO0FBQXVEOztBQUV2RDtB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QUs7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDLHFDQUFxQztBQUNwRixHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVzQjs7Ozs7Ozs7Ozs7OztBQzdFdEI7QUFBQTtBQUFBO0FBQTZDOztBQUU3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseURBQVU7QUFDL0I7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUrQjs7Ozs7Ozs7Ozs7OztBQ3BDL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjs7QUFFQTtBQUNBLHFCQUFxQixLQUFLO0FBQzFCOztBQUVBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsTUFBTSxnQkFBZ0IsZ0JBQWdCLFFBQVEsS0FBSztBQUM5RTtBQUNBOztBQVVFOzs7Ozs7Ozs7Ozs7QUNyRUYsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoiZTYyMV9BUEkubm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc291cmNlL21haW4uanNcIik7XG4iLCJjb25zdCB7IHJhd19ibGlwX2NyZWF0ZSB9ID0gcmVxdWlyZSgnLi9yYXdfYmxpcF9jcmVhdGUuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gYmxpcF9jcmVhdGUgKHRleHQsIGluX3Jlc3BvbnNlX3RvKSB7XG5cdHJldHVybiByYXdfYmxpcF9jcmVhdGUuY2FsbCh0aGlzLCB7XG5cdFx0J2JsaXBbcmVzcG9uc2VfdG9dJzogaW5fcmVzcG9uc2VfdG8gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBpbl9yZXNwb25zZV90byxcblx0XHQnYmxpcFtib2R5XSc6IHRleHRcblx0fSk7XG59XG5cbmV4cG9ydCB7IGJsaXBfY3JlYXRlIH07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfc3RyaW5nXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X2JsaXBfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvYmxpcHMnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdGT1JNJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5nc1snYmxpcFtyZXNwb25zZV90b10nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1snYmxpcFtyZXNwb25zZV90b10nXSwgJ2JsaXBbcmVzcG9uc2VfdG9dJyk7XG5cdH1cblxuXHR2YWxpZGF0ZV9zdHJpbmcoc2V0dGluZ3NbJ2JsaXBbYm9keV0nXSwgJ2JsaXBbYm9keV0nKTtcbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge1xuXHRcdCdibGlwW2JvZHldJzogc2V0dGluZ3NbJ2JsaXBbYm9keV0nXVxuXHR9O1xuXG5cdGlmIChzZXR0aW5nc1snYmxpcFtyZXNwb25zZV90b10nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ2JsaXBbcmVzcG9uc2VfdG9dJ10gPSBzZXR0aW5nc1snYmxpcFtyZXNwb25zZV90b10nXTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyByYXdfYmxpcF9jcmVhdGUgfTtcbiIsImNvbnN0IHsgcmF3X2NvbW1lbnRfY3JlYXRlIH0gPSByZXF1aXJlKCcuL3Jhd19jb21tZW50X2NyZWF0ZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBjb21tZW50X2NyZWF0ZSAocG9zdF9pZCwgdGV4dCkge1xuXHRyZXR1cm4gcmF3X2NvbW1lbnRfY3JlYXRlLmNhbGwodGhpcywge1xuXHRcdCdjb21tZW50W3Bvc3RfaWRdJzogcG9zdF9pZCxcblx0XHQnY29tbWVudFtib2R5XSc6IHRleHRcblx0fSk7XG59XG5cbmV4cG9ydCB7IGNvbW1lbnRfY3JlYXRlIH07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfc3RyaW5nXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuLy8gQWRkIHN1cHBvcnQgZm9yIFsnZG9fbm90X2J1bXBfcG9zdCcsICdpc19zdGlja3knLCAnaXNfaGlkZGVuJ11cblxuYXN5bmMgZnVuY3Rpb24gcmF3X2NvbW1lbnRfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvY29tbWVudHMnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdGT1JNJyxcblx0XHRkYXRhOiB7XG5cdFx0XHQnY29tbWVudFtwb3N0X2lkXSc6IHNldHRpbmdzWydjb21tZW50W3Bvc3RfaWRdJ10sXG5cdFx0XHQnY29tbWVudFtib2R5XSc6IHNldHRpbmdzWydjb21tZW50W2JvZHldJ11cblx0XHR9LFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1snY29tbWVudFtwb3N0X2lkXSddLCAnY29tbWVudFtwb3N0X2lkXScpO1xuXHR2YWxpZGF0ZV9zdHJpbmcoc2V0dGluZ3NbJ2NvbW1lbnRbYm9keV0nXSwgJ2NvbW1lbnRbYm9keV0nKTtcbn1cblxuZXhwb3J0IHsgcmF3X2NvbW1lbnRfY3JlYXRlIH07XG4iLCJpbXBvcnQgdmFsaWRhdGVfc2V0dGluZ3MgZnJvbSAnLi92YWxpZGF0ZV9zZXR0aW5ncy5qcyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5cbi8qIElucHV0IHRvIHRoaXMgbWV0aG9kIGlzIHN0cnVjdHVyZWQgbGlrZSB0aGlzXG57XG5cdG1ldGhvZDogJ1BPU1QnIHwgJ0dFVCcgLy8gRGVmaW5lcyBob3cgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIG1hZGVcblx0cGF0aDogPHN0cmluZz4gLy8gVGhlIHBhdGggb2YgdGhlIFVSTCB0aGF0IGlzIGJlaW5nIGFjY2Vzc2VkXG5cdHJlc3BvbnNlOiAnSlNPTicgfCAnWE1MJyB8ICdIVE1MJyAvLyBEZWZpbmVzIHRoZSByZXNwb25zZSB0eXBlXG5cblx0Zm9ybWF0OiAnVVJMJyB8ICdGT1JNJyB8IHVuZGVmaW5lZCAvLyBEZWZpbmVzIGhvdyB0aGUgZGF0YSBpcyBwYXNzZWRcblx0ZGF0YTogPG9iamVjdD4gfCB1bmRlZmluZWQgLy8gRGF0YSBiZWluZyBwYXNzZWQgaW4gdGhlIHJlcXVlc3Rcbn1cblxuKi9cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncy5jYWxsKHRoaXMsIHNldHRpbmdzKTtcblx0Y29uc3QgcmVxdWVzdF9vcHRpb25zID0gYnVpbGRfcmVxdWVzdF9vcHRpb25zLmNhbGwodGhpcywgc2V0dGluZ3MpO1xuXHRyZXR1cm4gYXhpb3MucmVxdWVzdChyZXF1ZXN0X29wdGlvbnMpXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSlcblx0XHQuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRfcmVxdWVzdF9vcHRpb25zIChzZXR0aW5ncykge1xuXHRjb25zdCByZXF1ZXN0X29wdGlvbnMgPSB7XG5cdFx0YmFzZVVSTDogJ2h0dHBzOi8vZTYyMS5uZXQvJyxcblx0XHR1cmw6IGAke3NldHRpbmdzLnBhdGh9LiR7c2V0dGluZ3MucmVzcG9uc2UudG9Mb3dlckNhc2UoKX1gLFxuXHRcdG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuXHRcdC8vIERvY3VtZW50IGlzIG9ubHkgdmFsaWQgZm9yIHRoZSBicm93c2VyLiBUbyBmaXggdGhpcyBvbmx5XG5cdFx0Ly8ganNvbiBpcyB1c2VkIGZvciBhY3R1YWwganNvbi4gSFRNTCBhbmQgWE1MIHdpbGwgaGF2ZSB0byBiZVxuXHRcdC8vIHBhcnNlZCBieSBvdGhlciBtZWFucy5cblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzY2NyNpc3N1ZWNvbW1lbnQtMzM1MDEzOTkzXG5cdFx0cmVzcG9uc2VUeXBlOiBzZXR0aW5ncy5yZXNwb25zZSA9PT0gJ0pTT04nID8gJ2pzb24nIDogJ3RleHQnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCd1c2VyLWFnZW50JzogdGhpcy51c2VyYWdlbnRcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgaGFzX2NyZWRlbnRpYWxzID0gKHRoaXMudXNlcm5hbWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFwaV9rZXkgIT09IHVuZGVmaW5lZCk7XG5cdGlmIChzZXR0aW5ncy5hdXRoZW50aWNhdGUgfHwgaGFzX2NyZWRlbnRpYWxzKSB7XG5cdFx0cmVxdWVzdF9vcHRpb25zLmF1dGggPSB7XG5cdFx0XHR1c2VybmFtZTogdGhpcy51c2VybmFtZSxcblx0XHRcdHBhc3N3b3JkOiB0aGlzLmFwaV9rZXlcblx0XHR9O1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLmZvcm1hdCA9PT0gJ1VSTCcpIHtcblx0XHRyZXF1ZXN0X29wdGlvbnMucGFyYW1zID0gc2V0dGluZ3MuZGF0YTtcblx0fSBlbHNlIGlmIChzZXR0aW5ncy5mb3JtYXQgPT09ICdGT1JNJykge1xuXHRcdGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblx0XHRPYmplY3QuZW50cmllcyhzZXR0aW5ncy5kYXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0Zm9ybS5hcHBlbmQoa2V5LCBCdWZmZXIuZnJvbSh2YWx1ZSksIHtcblx0XHRcdFx0XHRmaWxlbmFtZTogJ3VwbG9hZC5pbWFnZScsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmVxdWVzdF9vcHRpb25zLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gZm9ybS5nZXRIZWFkZXJzKClbJ2NvbnRlbnQtdHlwZSddO1xuXHRcdHJlcXVlc3Rfb3B0aW9ucy5kYXRhID0gZm9ybTtcblx0fSBlbHNlIHtcblx0XHQvLyBGb3JtYXQgaXMgdW5kZWZpbmVkLiBBcHBseSBubyBzZXR0aW5nc1xuXHR9XG5cblx0cmV0dXJuIHJlcXVlc3Rfb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUT0RPXG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkb3dubG9hZDtcbiIsIi8vIFZhbGlkYXRlcyB0aGUgY3VzdG9tIHNldHRpbmdzIG9iamVjdCBmb3IgbWFraW5nIHJlcXVlc3RzLlxuLy8gVGhpcyBvYmplY3Qgd2lsbCBoYXZlIHRoZSBzYW1lIHByb3BlcnRpZXMgbm8gbWF0dGVyIHRoZVxuLy8gcGxhdGZvcm0gaXQgaXMgcnVuIG9uLCBzdHJlYW1saW5pbmcgdGhlIGRldmVsb3BtZW50IG9mXG4vLyBuZXcgbWV0aG9kcyB0byBpbnRlcmZhY2Ugd2l0aCB0aGUgZTYyMSBhcGkuXG5cbi8vIFRoZSBFNjIxQVBJIGNsYXNzJ3MgY29udGV4dCBtdXN0IGJlIGJvdW5kIHdoZW4gY2FsbGluZyB0aGlzXG4vLyBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBhY2Nlc3MgdGhlIHVzZXJhZ2VudCwgdXNlcm5hbWUsIGFuZFxuLy8gYXBpX2tleS5cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChbJ1BPU1QnLCAnR0VUJywgJ1BBVENIJywgJ0RFTEVURScsICdQVVQnXS5pbmNsdWRlcyhzZXR0aW5ncy5tZXRob2QpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWV0aG9kIG11c3QgYmUgb25lIG9mIFtcXCdQT1NUXFwnLCBcXCdHRVRcXCcsIFxcJ1BBVENIXFwnLCBcXCdERUxFVEVcXCcsIFxcJ1BVVFxcJ10nKTtcblx0fVxuXG5cdGlmICh0eXBlb2Ygc2V0dGluZ3MucGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3BhdGggbXVzdCBiZSBhIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKFsnSlNPTicsICdYTUwnLCAnSFRNTCddLmluY2x1ZGVzKHNldHRpbmdzLnJlc3BvbnNlKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Jlc3BvbnNlIG11c3QgYmUgSlNPTiBvciBYTUwgb3IgSFRNTCcpO1xuXHR9XG5cblx0aWYgKFsnVVJMJywgJ0ZPUk0nLCB1bmRlZmluZWRdLmluY2x1ZGVzKHNldHRpbmdzLmZvcm1hdCkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmb3JtYXQgbXVzdCBiZSBVUkwgb3IgRk9STSBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdGlmIChbJ29iamVjdCcsICd1bmRlZmluZWQnXS5pbmNsdWRlcyh0eXBlb2Ygc2V0dGluZ3MuZGF0YSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0IG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB0aGlzLnVzZXJhZ2VudCAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VzZXJhZ2VudCBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MuYXV0aGVudGljYXRlID09PSB0cnVlKSB7XG5cdFx0Ly8gSWYgYXV0aGVudGljYXRpbmcsIHRoZW4gYm90aCB1c2VybmFtZSBhbmQgYXBpX2tleSBtdXN0IGJlIHByZXNlbnRcblx0XHRpZiAodHlwZW9mIHRoaXMudXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VzZXJhZ2VudCBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhpcy5hcGlfa2V5ICE9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdhcGlfa2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVfc2V0dGluZ3M7XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zaG93IH0gZnJvbSAnLi9wb3N0L3Nob3cvcmF3X3Bvc3Rfc2hvdy5qcyc7XG5pbXBvcnQge1xuXHRwb3N0X3Nob3dfaWQsXG5cdHBvc3Rfc2hvd19tZDUsXG5cdHBvc3Rfc2hvd1xufSBmcm9tICcuL3Bvc3Qvc2hvdy9wb3N0X3Nob3cuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Bvc3QvaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHBvc3Rfc2VhcmNoIH0gZnJvbSAnLi9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHBvc3Rfc2VhcmNoX2l0ZXJhdG9yIH0gZnJvbSAnLi9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoX2l0ZXJhdG9yLmpzJztcblxuaW1wb3J0IHtcblx0cmF3X3Bvc3Rfdm90ZSxcblx0cG9zdF92b3RlX3JlbW92ZVxufSBmcm9tICcuL3Bvc3Qvdm90ZS9yYXdfcG9zdF92b3RlLmpzJztcbmltcG9ydCB7XG5cdHBvc3Rfdm90ZV91cCxcblx0cG9zdF92b3RlX2Rvd25cbn0gZnJvbSAnLi9wb3N0L3ZvdGUvcG9zdF92b3RlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfY3JlYXRlIH0gZnJvbSAnLi9wb3N0L2NyZWF0ZS9yYXdfcG9zdF9jcmVhdGUuanMnO1xuaW1wb3J0IHsgcG9zdF9jcmVhdGUgfSBmcm9tICcuL3Bvc3QvY3JlYXRlL3Bvc3RfY3JlYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH0gZnJvbSAnLi9wb3N0L3VwZGF0ZS9yYXdfcG9zdF91cGRhdGUuanMnO1xuaW1wb3J0IHsgcG9zdF91cGRhdGUgfSBmcm9tICcuL3Bvc3QvdXBkYXRlL3Bvc3RfdXBkYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfY29weV9ub3RlcyB9IGZyb20gJy4vcG9zdC9jb3B5X25vdGVzL3Jhd19wb3N0X2NvcHlfbm90ZXMuanMnO1xuaW1wb3J0IHsgcG9zdF9jb3B5X25vdGVzIH0gZnJvbSAnLi9wb3N0L2NvcHlfbm90ZXMvcG9zdF9jb3B5X25vdGVzLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfZmxhZ19jcmVhdGUgfSBmcm9tICcuL3Bvc3RfZmxhZy9jcmVhdGUvcmF3X3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuaW1wb3J0IHtcblx0cG9zdF9mbGFnX2NyZWF0ZSxcblx0cG9zdF9mbGFnX3JlYXNvbnNcbn0gZnJvbSAnLi9wb3N0X2ZsYWcvY3JlYXRlL3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfY29tbWVudF9jcmVhdGUgfSBmcm9tICcuL2NvbW1lbnQvY3JlYXRlL3Jhd19jb21tZW50X2NyZWF0ZS5qcyc7XG5pbXBvcnQgeyBjb21tZW50X2NyZWF0ZSB9IGZyb20gJy4vY29tbWVudC9jcmVhdGUvY29tbWVudF9jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyBwb3N0X2J2YXMgfSBmcm9tICcuL3Bvc3QvYnZhcy9wb3N0X2J2YXMuanMnO1xuXG5pbXBvcnQgeyByYXdfYmxpcF9jcmVhdGUgfSBmcm9tICcuL2JsaXAvY3JlYXRlL3Jhd19ibGlwX2NyZWF0ZS5qcyc7XG5pbXBvcnQgeyBibGlwX2NyZWF0ZSB9IGZyb20gJy4vYmxpcC9jcmVhdGUvYmxpcF9jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfdGFnX3NlYXJjaCB9IGZyb20gJy4vdGFncy9pbmRleC9yYXdfdGFnX3NlYXJjaC5qcyc7XG5pbXBvcnQgeyB0YWdfc2VhcmNoIH0gZnJvbSAnLi90YWdzL2luZGV4L3RhZ19zZWFyY2guanMnO1xuaW1wb3J0IHsgdGFnX3NlYXJjaF9pdGVyYXRvciB9IGZyb20gJy4vdGFncy9pbmRleC90YWdfc2VhcmNoX2l0ZXJhdG9yLmpzJztcblxuY2xhc3MgRTYyMUFQSSB7XG5cdC8vIEFueSBvZiB0aGVzZSBjYW4gYmUgYW55dGhpbmcsIGJ1dCBlcnJvcnMgd2lsbCBiZSB0aHJvd25cblx0Ly8gd2hlbiBhbnkgcmVxdWVzdHMgYXJlIHRyeWluZyB0byBiZSBtYWRlLlxuXHRjb25zdHJ1Y3RvciAodXNlcmFnZW50LCB1c2VybmFtZSwgYXBpX2tleSkge1xuXHRcdHRoaXMudXNlcmFnZW50ID0gdXNlcmFnZW50O1xuXHRcdHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcblx0XHR0aGlzLmFwaV9rZXkgPSBhcGlfa2V5O1xuXHR9XG59XG5cbkU2MjFBUEkucHJvdG90eXBlLnZlcnNpb24gPSAnMS4wMDEwMCc7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3Nob3cgPSByYXdfcG9zdF9zaG93O1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zaG93X2lkID0gcG9zdF9zaG93X2lkO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zaG93X21kNSA9IHBvc3Rfc2hvd19tZDU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3Nob3cgPSBwb3N0X3Nob3c7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3NlYXJjaCA9IHJhd19wb3N0X3NlYXJjaDtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2VhcmNoID0gcG9zdF9zZWFyY2g7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3NlYXJjaF9pdGVyYXRvciA9IHBvc3Rfc2VhcmNoX2l0ZXJhdG9yO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF92b3RlID0gcmF3X3Bvc3Rfdm90ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfdm90ZV91cCA9IHBvc3Rfdm90ZV91cDtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfdm90ZV9kb3duID0gcG9zdF92b3RlX2Rvd247XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3ZvdGVfcmVtb3ZlID0gcG9zdF92b3RlX3JlbW92ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfY3JlYXRlID0gcmF3X3Bvc3RfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9jcmVhdGUgPSBwb3N0X2NyZWF0ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfdXBkYXRlID0gcmF3X3Bvc3RfdXBkYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF91cGRhdGUgPSBwb3N0X3VwZGF0ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfY29weV9ub3RlcyA9IHJhd19wb3N0X2NvcHlfbm90ZXM7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2NvcHlfbm90ZXMgPSBwb3N0X2NvcHlfbm90ZXM7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X2ZsYWdfY3JlYXRlID0gcmF3X3Bvc3RfZmxhZ19jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2ZsYWdfY3JlYXRlID0gcG9zdF9mbGFnX2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfZmxhZ19yZWFzb25zID0gcG9zdF9mbGFnX3JlYXNvbnM7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19jb21tZW50X2NyZWF0ZSA9IHJhd19jb21tZW50X2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLmNvbW1lbnRfY3JlYXRlID0gY29tbWVudF9jcmVhdGU7XG5cbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfYnZhcyA9IHBvc3RfYnZhcztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X2JsaXBfY3JlYXRlID0gcmF3X2JsaXBfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUuYmxpcF9jcmVhdGUgPSBibGlwX2NyZWF0ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3RhZ19zZWFyY2ggPSByYXdfdGFnX3NlYXJjaDtcbkU2MjFBUEkucHJvdG90eXBlLnRhZ19zZWFyY2ggPSB0YWdfc2VhcmNoO1xuRTYyMUFQSS5wcm90b3R5cGUudGFnX3NlYXJjaF9pdGVyYXRvciA9IHRhZ19zZWFyY2hfaXRlcmF0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IEU2MjFBUEk7XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIHNldHRpbmdzID0ge1xuLy8gICBwb3N0X2lkOiBpZCBvZiB0aGUgcG9zdCB0byBiZSByZXBsYWNlZFxuLy8gICByZXBsYWNlbWVudDogdGhlIHJlcGxhY2VtZW50IGZpbGUvVVJMXG4vLyAgIGNvbW1lbnQ6IGJvb2xlYW4gaWYgYSBjb21tZW50IHNob3VsZCBiZSBwb3N0ZWQgdG8gdGhlIG5ldyBwb3N0XG4vLyAgIGRlc2NyaXB0aW9uOiBib29sZWFuIGlmIHRoZSBkZXNjcmlwdGlvbiBzaG91bGQgYmUgZWRpdGVkLlxuLy8gICBtZXNzYWdlOiBtZXNzYWdlIG9mIHN1cGVyaW9yIHF1YWxpdHkuICclJyByZXBsYWNlZCB3aXRoIG9sZF9pZFxuLy8gICBkZWxldGU6IGJvb2xlYW4uIElmIHRydWUgd2lsbCB0cnkgdG8gZGVsZXRlIHBvc3QuIGlmIGZhbHNlIHdpbGwgZmxhZ1xuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2J2YXMgKHNldHRpbmdzKSB7XG5cdHNldHRpbmdzID0gYXBwbHlfZGVmYXVsdHMoc2V0dGluZ3MpO1xuXHRjb25zdCBvbGRfcG9zdCA9IGF3YWl0IHRoaXMucG9zdF9zaG93KHNldHRpbmdzLnBvc3RfaWQpO1xuXHRzZXR0aW5ncy5tZXNzYWdlID0gc2V0dGluZ3MubWVzc2FnZS5yZXBsYWNlKCclJywgb2xkX3Bvc3QuaWQpO1xuXG5cdGNvbnN0IG5ld19wb3N0ID0gYXdhaXQgdGhpcy5wb3N0X2NyZWF0ZSh7XG5cdFx0dGFnczogZmlsdGVyX3RhZ3Mob2xkX3Bvc3QudGFncyksXG5cdFx0c291cmNlczogb2xkX3Bvc3Quc291cmNlcyxcblx0XHRkZXNjcmlwdGlvbjogc2V0dGluZ3MuZGVzY3JpcHRpb24gPT09IHRydWUgPyBgJHtzZXR0aW5ncy5tZXNzYWdlfVxcbiR7b2xkX3Bvc3QuZGVzY3JpcHRpb259YCA6IG9sZF9wb3N0LmRlc2NyaXB0aW9uLFxuXHRcdHJhdGluZzogb2xkX3Bvc3QucmF0aW5nLFxuXHRcdHBhcmVudF9pZDogb2xkX3Bvc3QucmVsYXRpb25zaGlwcy5wYXJlbnRfaWQsXG5cblx0XHR1cGxvYWQ6IHNldHRpbmdzLnJlcGxhY2VtZW50XG5cdH0pO1xuXG5cdGlmIChzZXR0aW5ncy5jb21tZW50ID09PSB0cnVlKSB7XG5cdFx0YXdhaXQgdGhpcy5jb21tZW50X2NyZWF0ZShuZXdfcG9zdC5wb3N0X2lkLCBzZXR0aW5ncy5tZXNzYWdlKTtcblx0fVxuXG5cdGF3YWl0IHNldF9wYXJlbnQuY2FsbCh0aGlzLCBvbGRfcG9zdC5pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG5cdGZvciAoY29uc3QgY2hpbGRfaWQgb2Ygb2xkX3Bvc3QucmVsYXRpb25zaGlwcy5jaGlsZHJlbikge1xuXHRcdGF3YWl0IHNldF9wYXJlbnQuY2FsbCh0aGlzLCBjaGlsZF9pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG5cdH1cblx0Ly8gRml4IHdpdGggcG9vbFxuXG5cdGF3YWl0IHRoaXMucG9zdF9jb3B5X25vdGVzKG9sZF9wb3N0LmlkLCBuZXdfcG9zdC5wb3N0X2lkKTtcblxuXHQvLyBvcHRpb25hbGx5IGRlbGV0ZSB0aGUgcG9zdFxuXHRhd2FpdCB0aGlzLnBvc3RfZmxhZ19jcmVhdGUodGhpcy5wb3N0X2ZsYWdfcmVhc29ucy5pbmZlcmlvciwgb2xkX3Bvc3QuaWQsIG5ld19wb3N0LnBvc3RfaWQpO1xufVxuXG5mdW5jdGlvbiBhcHBseV9kZWZhdWx0cyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLnBvc3RfaWQsICdwb3N0X2lkJyk7XG5cdGlmIChzZXR0aW5ncy5yZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyZXBsYWNlbWVudCBtdXN0IGJlIGRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cG9zdF9pZDogc2V0dGluZ3MucG9zdF9pZCxcblx0XHRjb21tZW50OiBudWxsaXNoKHNldHRpbmdzLmNvbW1lbnQsIGZhbHNlKSxcblx0XHRkZXNjcmlwdGlvbjogbnVsbGlzaChzZXR0aW5ncy5kZXNjcmlwdGlvbiwgdHJ1ZSksXG5cdFx0bWVzc2FnZTogbnVsbGlzaChzZXR0aW5ncy5tZXNzYWdlLCAnU3VwZXJpb3IgdmVyc2lvbiBvZiBwb3N0ICMlJyksXG5cdFx0ZGVsZXRlOiBudWxsaXNoKHNldHRpbmdzLmRlbGV0ZSwgZmFsc2UpLFxuXHRcdHJlcGxhY2VtZW50OiBzZXR0aW5ncy5yZXBsYWNlbWVudFxuXHR9O1xufVxuXG5mdW5jdGlvbiBudWxsaXNoICh2YWx1ZSwgcmVwbGFjZW1lbnQpIHtcblx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldF9wYXJlbnQgKHBvc3RfaWQsIG5ld19wYXJlbnQpIHtcblx0cmV0dXJuIHRoaXMucG9zdF91cGRhdGUoe1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdHBhcmVudF9pZDogbmV3X3BhcmVudFxuXHR9KTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyX3RhZ3MgKHRhZ19vYmplY3QpIHtcblx0Y29uc3QgdGFnc190b19yZW1vdmUgPSBbXG5cdFx0J2JldHRlcl92ZXJzaW9uX2F0X3NvdXJjZScsXG5cdFx0J3NtYWxsZXJfdmVyc2lvbl9hdF9zb3VyY2UnLFxuXHRcdCdjb21wcmVzc2lvbl9hcnRpZmFjdHMnLFxuXHRcdCdjcm9wcGVkJyxcblx0XHQndXBzY2FsZSdcblx0XTtcblxuXHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0YWdfb2JqZWN0KVxuXHRcdC5yZWR1Y2UoKGFjYywgZSkgPT4gYWNjLmNvbmNhdChlKSlcblx0XHQuZmlsdGVyKGUgPT4gdGFnc190b19yZW1vdmUuaW5jbHVkZXMoZSkgPT09IGZhbHNlKTtcbn1cblxuZXhwb3J0IHsgcG9zdF9idmFzIH07XG4iLCJjb25zdCB7IHJhd19wb3N0X2NvcHlfbm90ZXMgfSA9IHJlcXVpcmUoJy4vcmF3X3Bvc3RfY29weV9ub3Rlcy5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2NvcHlfbm90ZXMgKHBvc3RfaWQsIHRvX2lkKSB7XG5cdHJldHVybiByYXdfcG9zdF9jb3B5X25vdGVzLmNhbGwodGhpcywge1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdG90aGVyX3Bvc3RfaWQ6IHRvX2lkXG5cdH0pO1xufVxuXG5leHBvcnQgeyBwb3N0X2NvcHlfbm90ZXMgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF9jb3B5X25vdGVzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BVVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfS9jb3B5X25vdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiB7XG5cdFx0XHRpZDogc2V0dGluZ3MuaWQsXG5cdFx0XHRvdGhlcl9wb3N0X2lkOiBzZXR0aW5ncy5vdGhlcl9wb3N0X2lkXG5cdFx0fVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdGlmIChlcnJvci5yZXNwb25zZS5kYXRhLnJlYXNvbiA9PT0gJ1Bvc3QgaGFzIG5vIG5vdGVzJykge1xuXHRcdHJldHVybiBudWxsOyAvLyBFeHBlY3RlZCBiZWhhdmlvciBpcyB0byBoYXZlIG5vIGVycm9ycyB0aHJvd24gaWYgcG9zdCBoYXMgbm8gbm90ZXNcblx0fSBlbHNlIHtcblx0XHQvLyBUb2RvXG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdpZCcpO1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3Mub3RoZXJfcG9zdF9pZCwgJ290aGVyX3Bvc3RfaWQnKTtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfY29weV9ub3RlcyB9O1xuIiwiY29uc3QgeyByYXdfcG9zdF9jcmVhdGUgfSA9IHJlcXVpcmUoJy4vcmF3X3Bvc3RfY3JlYXRlLmpzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cdHJldHVybiByYXdfcG9zdF9jcmVhdGUuY2FsbCh0aGlzLCB0cmFuc2Zvcm1fc2V0dGluZ3Moc2V0dGluZ3MpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5ncy51cGxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3VwcGx5IGFuIHVwbG9hZCBmaWxlIHRvIHVwbG9hZCBhIHBvc3QnKTtcblx0fVxuXG5cdGlmICh0eXBlb2Ygc2V0dGluZ3MucmF0aW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmF0aW5nIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0fSBlbHNlIGlmIChbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3MucmF0aW5nLmNoYXJBdCgwKSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmaXJzdCBjaGFyYWN0ZXIgb2YgcmF0aW5nIG11c3QgYmUgb25lIG9mIFtcXCdlXFwnLCBcXCdxXFwnLCBcXCdzXFwnXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnRhZ3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLnRhZ3MgPT09IGZhbHNlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd0YWdzIG11c3QgYmUgb2YgdHlwZSBhcnJheScpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MudGFncy5ldmVyeShlID0+IHR5cGVvZiBlID09PSAnc3RyaW5nJykgPT09IGZhbHNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2V2ZXJ5IGVsZW1lbnQgb2YgdGFncyBtdXN0IG9mIG9mIHR5cGUgc3RyaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHNldHRpbmdzLnNvdXJjZXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLnNvdXJjZXMgPT09IGZhbHNlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdzb3VyY2VzIG11c3QgYmUgb2YgdHlwZSBhcnJheScpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MudGFncy5ldmVyeShlID0+IHR5cGVvZiBlID09PSAnc3RyaW5nJykgPT09IGZhbHNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2V2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlcyBtdXN0IG9mIG9mIHR5cGUgc3RyaW5nJyk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHQndXBsb2FkW3RhZ19zdHJpbmddJzogKHNldHRpbmdzLnRhZ3MgfHwgW10pLmpvaW4oJyAnKSxcblx0XHQndXBsb2FkW3JhdGluZ10nOiBzZXR0aW5ncy5yYXRpbmcuY2hhckF0KDApLFxuXHRcdCd1cGxvYWRbc291cmNlXSc6IChzZXR0aW5ncy5zb3VyY2VzIHx8IFtdKS5qb2luKCdcXG4nKSxcblx0XHQndXBsb2FkW2Rlc2NyaXB0aW9uXSc6IChzZXR0aW5ncy5kZXNjcmlwdGlvbiB8fCAnJyksXG5cdFx0J3VwbG9hZFtwYXJlbnRfaWRdJzogKHNldHRpbmdzLnBhcmVudF9pZCB8fCBudWxsKVxuXHR9O1xuXG5cdGlmIChzZXR0aW5ncy51cGxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG5cdFx0cmV0dXJuX29iamVjdFsndXBsb2FkW2ZpbGVdJ10gPSBzZXR0aW5ncy51cGxvYWQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuX29iamVjdFsndXBsb2FkW2RpcmVjdF91cmxdJ10gPSBzZXR0aW5ncy51cGxvYWQ7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZXhwb3J0IHsgcG9zdF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyB1cGxvYWRbdGFnX3N0cmluZ10gQSBzcGFjZSBkZWxpbWl0ZWQgbGlzdCBvZiB0YWdzLlxuLy8gdXBsb2FkW2ZpbGVdIFRoZSBmaWxlIGRhdGEgZW5jb2RlZCBhcyBhIG11bHRpcGFydCBmb3JtLlxuLy8gdXBsb2FkW3JhdGluZ10gVGhlIHJhdGluZyBmb3IgdGhlIHBvc3QuIENhbiBiZTogcywgcSBvciBlIGZvciBzYWZlLCBxdWVzdGlvbmFibGUsIGFuZCBleHBsaWNpdCByZXNwZWN0aXZlbHkuXG4vLyB1cGxvYWRbZGlyZWN0X3VybF0gSWYgdGhpcyBpcyBhIFVSTCwgZTYyMSB3aWxsIGRvd25sb2FkIHRoZSBmaWxlLlxuLy8gdXBsb2FkW3NvdXJjZV0gVGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIHBvc3QncyAnU291cmNlJyB0ZXh0LiBTZXBhcmF0ZSBtdWx0aXBsZSBVUkxzIHdpdGggJTBBICh1cmwtZW5jb2RlZCBuZXdsaW5lKSB0byBkZWZpbmUgbXVsdGlwbGUgc291cmNlcy4gTGltaXQgb2YgdGVuIFVSTHNcbi8vIHVwbG9hZFtkZXNjcmlwdGlvbl0gVGhlIGRlc2NyaXB0aW9uIGZvciB0aGUgcG9zdC5cbi8vIHVwbG9hZFtwYXJlbnRfaWRdIFRoZSBJRCBvZiB0aGUgcGFyZW50IHBvc3QuXG4vLyB1cGxvYWRbcmVmZXJlcl91cmxdICAgICAgICAgP1xuLy8gdXBsb2FkW21kNV9jb25maXJtYXRpb25dICAgIHVzZWxlc3Ncbi8vIHVwbG9hZFthc19wZW5kaW5nXSBJZiB0cnVlIHBvc3Qgd2lsbCBiZSBwb3N0ZWQgYXMgcGVuZGluZ1xuXG4vLyB0YWdfc3RyaW5nLCByYXRpbmcsIHNvdXJjZSAoZmlsZSB8fCBkaXJlY3RfdWxyKSBhcmUgcmVxdWlyZWRcbi8vIGFsbCBvdGhlcnMgc2hvdWxkIGJlIG51bGxcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvdXBsb2FkcycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgbmV3X3NldHRpbmdzID0ge1xuXHRcdCd1cGxvYWRbdGFnX3N0cmluZ10nOiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10sXG5cdFx0J3VwbG9hZFtyYXRpbmddJzogc2V0dGluZ3NbJ3VwbG9hZFtyYXRpbmddJ10sXG5cdFx0J3VwbG9hZFtzb3VyY2VdJzogc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ11cblx0fTtcblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddICE9PSB1bmRlZmluZWQpIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddO1xuXHR9IGVsc2Uge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gPSBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ107XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSA9IHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddO1xuXHR9XG5cblx0cmV0dXJuIG5ld19zZXR0aW5ncztcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3RhZ19zdHJpbmddIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbdGFnX3N0cmluZ10gbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdCb3RoIHVwbG9hZFtmaWxlXSBhbmQgdXBsb2FkW2RpcmVjdF91cmxdIGNhbiBub3QgYmUgZGVmaW5lZCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSA9PT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgdXBsb2FkW2ZpbGVdIG9yIHVwbG9hZFtkaXJlY3RfdXJsXSBtdXN0IGJlIGRlZmluZWQnKTtcblx0fVxuXG5cdC8vIHRvZG8gdGVzdCB0aGlzXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10pIHtcblx0XHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddLmNvbnN0cnVjdG9yICE9PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZmlsZV0gbXVzdCBiZSBvZiB0eXBlIEFycmF5QnVmZmVyJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIGRhdGEgaW4gdGhlIGFycmF5IGJ1ZmZlcj9cblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10pIHtcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2RpcmVjdF91cmxdIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpdCBpcyBhbiBhY3R1YWwgdXJsP1xuXHR9XG5cblx0aWYgKFsncycsICdxJywgJ2UnXS5pbmNsdWRlcyhzZXR0aW5nc1sndXBsb2FkW3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbcmF0aW5nXSBtdXN0IGJlIG9uZSBvZiBbXFwnc1xcJywgXFwncVxcJywgXFwnZVxcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3NvdXJjZV0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHVuZGVmaW5lZCBvciBvZiB0eXBlIHN0cmluZyBvciBudWxsJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZGVzY3JpcHRpb25dIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2Rlc2NyaXB0aW9uXSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3BhcmVudF9pZF0gbXVzdCBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBJdCBpcyBmaW5lIGlmIHBhcmVudF9pZCBpcyBudWxsXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddLCAndXBsb2FkW3BhcmVudF9pZF0nKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfY3JlYXRlIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2VhcmNoICh0YWdfc3RyaW5nLCBwYWdlID0gMCkge1xuXHRyZXR1cm4gcmF3X3Bvc3Rfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdGxpbWl0OiAzMjAsXG5cdFx0dGFnczogdGFnX3N0cmluZyxcblx0XHRwYWdlOiBwYWdlLnRvU3RyaW5nKClcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHBvc3Rfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5cbmNvbnN0IHBvc3RzX3Blcl9wYWdlID0gMzIwO1xuXG4vLyBZb3UgY2FuIG5vdCBoYXZlIGEgZGlmZmVyZW50IG9yZGVyIHdoZW4gc2VhcmNoaW5nIHRocm91Z2ggcG9zdHMgbGlrZSB0aGlzXG5hc3luYyBmdW5jdGlvbiogcG9zdF9zZWFyY2hfaXRlcmF0b3IgKHNlYXJjaF9zdHJpbmcpIHtcblx0Ly8gXCJQcm92aWRpbmcgYXJiaXRyYXJpbHkgbGFyZ2UgdmFsdWVzIHRvIG9idGFpbiB0aGUgbW9zdCByZWNlbnQgcG9zdHNcblx0Ly8gaXMgbm90IHBvcnRhYmxlIGFuZCBtYXkgYnJlYWsgaW4gdGhlIGZ1dHVyZVwiLiAod2lraSlcblx0Ly8gSSBkbyB3aGF0IEkgd2FudFxuXHRsZXQgbWF4X2lkID0gMWU5O1xuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96d2Fnb3RoL2U2MjFuZy9pc3N1ZXMvMjAyXG5cdFx0Y29uc3QgeyBwb3N0cyB9ID0gYXdhaXQgcmF3X3Bvc3Rfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdFx0dGFnczogc2VhcmNoX3N0cmluZyxcblx0XHRcdGxpbWl0OiBwb3N0c19wZXJfcGFnZSxcblx0XHRcdHBhZ2U6IGBiJHttYXhfaWR9YFxuXHRcdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0XHR5aWVsZCogcG9zdHM7XG5cdFx0bWF4X2lkID0gcG9zdHMucmVkdWNlKChhY2MsIGUpID0+IGFjYy5pZCA8IGUuaWQgPyBhY2MgOiBlKS5pZDtcblxuXHRcdGlmIChwb3N0cy5sZW5ndGggPCBwb3N0c19wZXJfcGFnZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcG9zdF9zZWFyY2hfaXRlcmF0b3IgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuLy8gVGhlcmUgaXMgYW4gZWRnZSBjYXNlIHdoZXJlIHRoZSBkYXRhIGNhbiBiZSBtZDU9PG1kNT5cblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfc2VhcmNoIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0cGF0aDogJy9wb3N0cycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5ncy50YWdzICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzLnRhZ3MsICd0YWdzJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MubGltaXQsICdsaW1pdCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9wYWdlX3N0cmluZyhzZXR0aW5ncy5wYWdlLCAncGFnZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHt9O1xuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy50YWdzICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC50YWdzID0gc2V0dGluZ3MudGFncztcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5wYWdlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5wYWdlID0gc2V0dGluZ3MucGFnZTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfTtcbiIsImltcG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9IGZyb20gJy4vLi4vaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHJhd19wb3N0X3Nob3cgfSBmcm9tICcuL3Jhd19wb3N0X3Nob3cuanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfbWQ1IH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3Nob3dfaWQgKHBvc3RfaWQpIHtcblx0cmV0dXJuIHJhd19wb3N0X3Nob3cuY2FsbCh0aGlzLCB7XG5cdFx0aWQ6IHBvc3RfaWRcblx0fSkudGhlbihlID0+IGUucG9zdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2hvd19tZDUgKG1kNSkge1xuXHR2YWxpZGF0ZV9tZDUobWQ1KTtcblx0cmV0dXJuIHJhd19wb3N0X3NlYXJjaC5jYWxsKHRoaXMsIHtcblx0XHR0YWdzOiBgbWQ1OiR7bWQ1fWAsXG5cdFx0bGltaXQ6IDEsXG5cdFx0cGFnZTogbnVsbFxuXHR9KS50aGVuKGUgPT4ge1xuXHRcdGlmIChlLnBvc3RzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBlLnBvc3RzWzBdO1xuXHRcdH1cblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2hvdyAoaWRfbWQ1KSB7XG5cdGlmICh0eXBlb2YgaWRfbWQ1ID09PSAnc3RyaW5nJyAmJiBpZF9tZDUubGVuZ3RoID09PSAzMikge1xuXHRcdHJldHVybiBwb3N0X3Nob3dfbWQ1LmNhbGwodGhpcywgaWRfbWQ1KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gcG9zdF9zaG93X2lkLmNhbGwodGhpcywgTnVtYmVyKGlkX21kNSkpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdHBvc3Rfc2hvd19pZCxcblx0cG9zdF9zaG93X21kNSxcblx0cG9zdF9zaG93XG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3Nob3cgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5pZCwgJ3Bvc3RfaWQnKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9YCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiB1bmRlZmluZWQsXG5cdFx0ZGF0YTogbnVsbFxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3Rfc2hvdyB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH0gZnJvbSAnLi9yYXdfcG9zdF91cGRhdGUuanMnO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3VwZGF0ZSAoc2V0dGluZ3MpIHtcblx0cmV0dXJuIHJhd19wb3N0X3VwZGF0ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogc2V0dGluZ3MuaWQsXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ19kaWZmXSc6IGdldF9kaWZmZXJlbmNlcyhzZXR0aW5ncywgJ3RhZ3NfdG9fYWRkJywgJ3RhZ3NfdG9fcmVtb3ZlJywgJyAnKSxcblx0XHQncG9zdFt0YWdfc3RyaW5nXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3MudGFncywgJyAnKSxcblx0XHQncG9zdFtvbGRfdGFnX3N0cmluZ10nOiBvcHRpb25hbF9qb2luKHNldHRpbmdzLm9sZF90YWdzLCAnICcpLFxuXHRcdCdwb3N0W3NvdXJjZV9kaWZmXSc6IGdldF9kaWZmZXJlbmNlcyhzZXR0aW5ncywgJ3NvdXJjZXNfdG9fYWRkJywgJ3NvdXJjZXNfdG9fcmVtb3ZlJywgJ1xcbicpLFxuXHRcdCdwb3N0W3NvdXJjZV0nOiBvcHRpb25hbF9qb2luKHNldHRpbmdzLnNvdXJjZXMsICdcXG4nKSxcblx0XHQncG9zdFtvbGRfc291cmNlXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Mub2xkX3NvdXJjZXMsICdcXG4nKSxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nOiBzZXR0aW5ncy5kZXNjcmlwdGlvbiB8fCBudWxsLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nOiBzZXR0aW5ncy5vbGRfZGVzY3JpcHRpb24gfHwgbnVsbCxcblx0XHQncG9zdFtwYXJlbnRfaWRdJzogc2V0dGluZ3MucGFyZW50X2lkIHx8IG51bGwsXG5cdFx0J3Bvc3Rbb2xkX3BhcmVudF9pZF0nOiBzZXR0aW5ncy5vbGRfcGFyZW50X2lkIHx8IG51bGwsXG5cdFx0J3Bvc3RbcmF0aW5nXSc6IGdldF9yYXRpbmcoc2V0dGluZ3MucmF0aW5nKSxcblx0XHQncG9zdFtvbGRfcmF0aW5nXSc6IGdldF9yYXRpbmcoc2V0dGluZ3Mub2xkX3JhdGluZyksXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJzogc2V0dGluZ3MucmVhc29uIHx8IG51bGxcblx0fSk7XG59XG5cbi8vIElkZWEgZm9yIGEgZGlmZmVyZW50IHR5cGUgb2YgdXBkYXRlIGZ1bmN0aW9uLiBNYXliZSBpdHMgYmV0dGVyIGluIHNvbWUgY2FzZXNcbi8vIGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybV9wb3N0IChwb3N0X2lkLCB0cmFuc2Zvcm1fZnVuY3Rpb24pIHtcbi8vICAgY29uc3QgcG9zdCA9IGF3YWl0IGdldF9wb3N0KHBvc3RfaWQpO1xuLy8gICBjb25zdCBuZXdfcG9zdCA9IGF3YWl0IHRyYW5zZm9ybV9mdW5jdGlvbihwb3N0X2lkKVxuLy8gICByZXR1cm4gcG9zdF91cGRhdGUocG9zdCwgbmV3X3Bvc3QpO1xuLy8gfVxuXG5mdW5jdGlvbiBnZXRfcmF0aW5nIChyYXRpbmcpIHtcblx0aWYgKHJhdGluZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHJhdGluZy5jaGFyQXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZnVuY3Rpb24gb3B0aW9uYWxfam9pbiAobGlzdCwgam9pbmVyKSB7XG5cdGlmIChsaXN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbGlzdC5qb2luKGpvaW5lcik7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0X2RpZmZlcmVuY2VzIChzZXR0aW5ncywgYWRkX3N0cmluZywgcmVtb3ZlX3N0cmluZywgam9pbmVyKSB7XG5cdGlmIChzZXR0aW5nc1thZGRfc3RyaW5nXSAhPT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzW3JlbW92ZV9zdHJpbmddICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBhZGRzID0gKHNldHRpbmdzW2FkZF9zdHJpbmddIHx8IFtdKVxuXHRcdFx0LmpvaW4oam9pbmVyKTtcblx0XHRjb25zdCByZW1vdmVzID0gKHNldHRpbmdzW3JlbW92ZV9zdHJpbmddIHx8IFtdKVxuXHRcdFx0Lm1hcChlID0+IGAtJHtlLnRvU3RyaW5nKCl9YClcblx0XHRcdC5qb2luKGpvaW5lcik7XG5cblx0XHRyZXR1cm4gYCR7YWRkc30ke2pvaW5lcn0ke3JlbW92ZXN9YDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDsgLy8gSWYgbm8gY2hhbmdlcyByZXR1cm4gbnVsbFxuXHR9XG59XG5cbmV4cG9ydCB7XG5cdHBvc3RfdXBkYXRlXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3VwZGF0ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQQVRDSCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfWAsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmlkLCAnaWQnKTtcblxuXHRbXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ19kaWZmXScsXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ10nLFxuXHRcdCdwb3N0W29sZF90YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbc291cmNlX2RpZmZdJyxcblx0XHQncG9zdFtzb3VyY2VdJyxcblx0XHQncG9zdFtvbGRfc291cmNlXScsXG5cdFx0J3Bvc3RbZGVzY3JpcHRpb25dJyxcblx0XHQncG9zdFtvbGRfZGVzY3JpcHRpb25dJyxcblx0XHQvLyBwYXJlbnRfaWRcblx0XHQncG9zdFtyYXRpbmddJyxcblx0XHQncG9zdFtvbGRfcmF0aW5nXScsXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJ1xuXHRcdC8vIGhhc19lbWJlZGRlZF9ub3RlcyB3aWxsIGJlIHJlbW92ZWQgYXQgc29tZSBwb2ludC5cblx0XS5mb3JFYWNoKGUgPT4ge1xuXHRcdGlmIChzZXR0aW5nc1tlXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7ZX0gbXVzdCBiZSBwcmVzZW50YCk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5nc1tlXSA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gYWxsIG9mIHRoZXNlIGNhbiBiZSBudWxsXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbZV0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7ZX0gbXVzdCBiZSBvZiB0eXBlIHN0cmluZ2ApO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0W3BhcmVudF9pZF0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0W29sZF9wYXJlbnRfaWRdIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9XG5cblx0W1xuXHRcdCd0YWdfc3RyaW5nJyxcblx0XHQnc291cmNlJyxcblx0XHQnZGVzY3JpcHRpb24nLFxuXHRcdCdwYXJlbnRfaWQnLFxuXHRcdCdyYXRpbmcnXG5cdF0uZm9yRWFjaChlID0+IHtcblx0XHRpZiAoc2V0dGluZ3NbYHBvc3Rbb2xkXyR7ZX1dYF0gIT09IG51bGwgJiYgc2V0dGluZ3NbYHBvc3RbJHtlfV1gXSA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBvbGRfJHtlfSBtdXN0IG5vdCBiZSBwcmVzZW50IGlmICR7ZX0gaXMgbm90IHByZXNlbnRgKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChzZXR0aW5nc1sncG9zdFt0YWdfc3RyaW5nXSddICE9PSBudWxsICYmIHNldHRpbmdzWydwb3N0W3RhZ19zdHJpbmdfZGlmZl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYXQgbW9zdCBvbmUgb2YgdGFnX3N0cmluZyBhbmQgdGFnX3N0cmluZ19kaWZmIGNhbiBiZSBub24tbnVsbCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3NvdXJjZV0nXSAhPT0gbnVsbCAmJiBzZXR0aW5nc1sncG9zdFtzb3VyY2VfZGlmZl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYXQgbW9zdCBvbmUgb2Ygc291cmNlIGFuZCBzb3VyY2VfZGlmZiBjYW4gYmUgbm9uLW51bGwnKTtcblx0fVxuXG5cdC8vIFBhcmVudF9pZFxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3BhcmVudF9pZCBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdFtwYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBpdCBjYW4gYmUgbnVsbCB3aXRob3V0IGlzc3VlXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSwgJ3BhcmVudF9pZCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignb2xkX3BhcmVudF9pZCBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddID09PSBudWxsKSB7XG5cdFx0Ly8gaXQgY2FuIGJlIG51bGwgd2l0aG91dCBpc3N1ZVxuXHR9IGVsc2Uge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddLCAnb2xkX3BhcmVudF9pZCcpO1xuXHR9XG5cblx0Ly8gUmF0aW5nXG5cdGlmIChzZXR0aW5nc1sncG9zdFtyYXRpbmddJ10gIT09IG51bGwgJiYgWydlJywgJ3EnLCAncyddLmluY2x1ZGVzKHNldHRpbmdzWydwb3N0W3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyYXRpbmcgbXVzdCBiZSBvbmUgb2YgW1xcJ2VcXCcsIFxcJ3FcXCcsIFxcJ3NcXCddJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3JhdGluZ10nXSAhPT0gbnVsbCAmJiBbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdvbGRfcmF0aW5nIG11c3QgYmUgb25lIG9mIFtcXCdlXFwnLCBcXCdxXFwnLCBcXCdzXFwnXScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0cmV0dXJuIFtcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJyxcblx0XHQncG9zdFt0YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbb2xkX3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtzb3VyY2VfZGlmZl0nLFxuXHRcdCdwb3N0W3NvdXJjZV0nLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJyxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W3BhcmVudF9pZF0nLFxuXHRcdCdwb3N0W29sZF9wYXJlbnRfaWRdJyxcblx0XHQncG9zdFtyYXRpbmddJyxcblx0XHQncG9zdFtvbGRfcmF0aW5nXScsXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJ1xuXHRdLnJlZHVjZSgoYWNjLCBlKSA9PiB7XG5cdFx0aWYgKHNldHRpbmdzW2VdICE9PSBudWxsKSB7XG5cdFx0XHRhY2NbZV0gPSBzZXR0aW5nc1tlXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjO1xuXHR9LCB7fSk7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X3VwZGF0ZSB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3Rfdm90ZSB9IGZyb20gJy4vcmF3X3Bvc3Rfdm90ZS5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfdm90ZV91cCAocG9zdF9pZCkge1xuXHRyZXR1cm4gcmF3X3Bvc3Rfdm90ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRzY29yZTogMSxcblx0XHRub191bnZvdGU6IHRydWVcblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfdm90ZV9kb3duIChwb3N0X2lkKSB7XG5cdHJhd19wb3N0X3ZvdGUuY2FsbCh0aGlzLCB7XG5cdFx0aWQ6IHBvc3RfaWQsXG5cdFx0c2NvcmU6IC0xLFxuXHRcdG5vX3Vudm90ZTogdHJ1ZVxuXHR9KTtcbn1cblxuZXhwb3J0IHtcblx0cG9zdF92b3RlX3VwLFxuXHRwb3N0X3ZvdGVfZG93blxufTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV92b3RlX29wdGlvbixcblx0dmFsaWRhdGVfYm9vbGVhblxufSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3ZvdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfS92b3Rlc2AsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX3JlbW92ZSAoaWQpIHtcblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0cGF0aDogYC9wb3N0cy8ke2lkfS92b3Rlc2AsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogdW5kZWZpbmVkLFxuXHRcdGRhdGE6IHVuZGVmaW5lZCxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdwb3N0X2lkJyk7XG5cdHZhbGlkYXRlX3ZvdGVfb3B0aW9uKHNldHRpbmdzLnNjb3JlKTtcblxuXHRpZiAoc2V0dGluZ3Mubm9fdW52b3RlICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5ncy5ub191bnZvdGUsICdub191bnZvdGUnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0c2NvcmU6IHNldHRpbmdzLnNjb3JlXG5cdH07XG5cblx0aWYgKHNldHRpbmdzLm5vX3Vudm90ZSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3Qubm9fdW52b3RlID0gc2V0dGluZ3Mubm9fdW52b3RlO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7XG5cdHJhd19wb3N0X3ZvdGUsXG5cdHBvc3Rfdm90ZV9yZW1vdmVcbn07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9mbGFnX2NyZWF0ZSB9IGZyb20gJy4vcmF3X3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuXG5jb25zdCBwb3N0X2ZsYWdfcmVhc29ucyA9IHtcblx0ZGVsZXRpb246ICdkZWxldGlvbicsXG5cdGluZmVyaW9yOiAnaW5mZXJpb3InLFxuXHRjdXN0b206ICd1c2VyJyxcblx0ZG5wOiAnZG5wX2FydGlzdCcsXG5cdHBheV9jb250ZW50OiAncGF5X2NvbnRlbnQnLFxuXHR0cmFjZTogJ3RyYWNlJyxcblx0cHJldmlvdXNseV9kZWxldGVkOiAncHJldmlvdXNseV9kZWxldGVkJyxcblx0cmVhbDogJ3JlYWxfcG9ybicsXG5cdGNvcnJ1cHQ6ICdjb3JydXB0J1xufTtcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9mbGFnX2NyZWF0ZSAocmVhc29uLCBwb3N0X2lkLCBleHRyYSkge1xuXHRpZiAocG9zdF9mbGFnX3JlYXNvbnNbcmVhc29uXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBSZWFzb24gbXVzdCBiZSBvbmUgb2YgWyR7T2JqZWN0LmtleXMocG9zdF9mbGFnX3JlYXNvbnMpLmpvaW4oJywgJyl9XWApO1xuXHR9XG5cblx0Y29uc3QgZGF0YSA9IHtcblx0XHQncG9zdF9mbGFnW3Bvc3RfaWRdJzogcG9zdF9pZCxcblx0XHQncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSc6IHBvc3RfZmxhZ19yZWFzb25zW3JlYXNvbl0sXG5cdFx0J3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nOiBudWxsLFxuXHRcdCdwb3N0X2ZsYWdbcGFyZW50X2lkXSc6IG51bGxcblx0fTtcblxuXHRpZiAocmVhc29uID09PSBwb3N0X2ZsYWdfcmVhc29ucy5jdXN0b20pIHtcblx0XHRkYXRhWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gPSBleHRyYTtcblx0fSBlbHNlIGlmIChyZWFzb24gPT09IHBvc3RfZmxhZ19yZWFzb25zLmluZmVyaW9yKSB7XG5cdFx0ZGF0YVsncG9zdF9mbGFnW3BhcmVudF9pZF0nXSA9IGV4dHJhO1xuXHR9XG5cblx0cmV0dXJuIHJhd19wb3N0X2ZsYWdfY3JlYXRlLmNhbGwodGhpcywgZGF0YSk7XG59XG5cbmV4cG9ydCB7XG5cdHBvc3RfZmxhZ19jcmVhdGUsXG5cdHBvc3RfZmxhZ19yZWFzb25zXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X2ZsYWdfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvcG9zdF9mbGFncycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1sncG9zdF9mbGFnW3Bvc3RfaWRdJ10sICdwb3N0X2ZsYWdbcG9zdF9pZF0nKTtcblx0Y29uc3QgdmFsaWRfcmVhc29uID0gW1xuXHRcdCdkZWxldGlvbicsXG5cdFx0J2luZmVyaW9yJyxcblx0XHQndXNlcicsXG5cdFx0J2RucF9hcnRpc3QnLFxuXHRcdCdwYXlfY29udGVudCcsXG5cdFx0J3RyYWNlJyxcblx0XHQncHJldmlvdXNseV9kZWxldGVkJyxcblx0XHQncmVhbF9wb3JuJyxcblx0XHQnY29ycnVwdCdcblx0XTtcblxuXHRpZiAodmFsaWRfcmVhc29uLmluY2x1ZGVzKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10pID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgcG9zdF9mbGFnW3JlYXNvbl9uYW1lXSBtdXN0IGJlIG9uZSBvZiBbJHt2YWxpZF9yZWFzb24uam9pbignLCAnKX1dYCk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSA9PT0gJ3VzZXInKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5nc1sncG9zdF9mbGFnW3VzZXJfcmVhc29uXSddICE9PSAnc3RyaW5nJylcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignaWYgcG9zdF9mbGFnW3JlYXNvbl9uYW1lXSBpcyBcXCd1c2VyXFwnIHRoZW4gcG9zdF9mbGFnW3VzZXJfcmVhc29uXSBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0gbXVzdCBiZSBudWxsIHVubGVzcyBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIGlzIFxcJ3VzZXJcXCcnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAnaW5mZXJpb3InKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddLCAncG9zdF9mbGFnW3BhcmVudF9pZF0nKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3BhcmVudF9pZF0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncG9zdF9mbGFnW3BhcmVudF9pZF0gbXVzdCBiZSBudWxsIHVubGVzcyBwb3N0X2ZsYWdbcGFyZW50X2lkXSBpcyBcXCdpbmZlcmlvclxcJycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHQncG9zdF9mbGFnW3Bvc3RfaWRdJzogc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twb3N0X2lkXSddLFxuXHRcdCdwb3N0X2ZsYWdbcmVhc29uX25hbWVdJzogc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXVxuXHR9O1xuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAndXNlcicpIHtcblx0XHRyZXR1cm5fb2JqZWN0Wydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gPSBzZXR0aW5nc1sncG9zdF9mbGFnW3VzZXJfcmVhc29uXSddO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICdpbmZlcmlvcicpIHtcblx0XHRyZXR1cm5fb2JqZWN0Wydwb3N0X2ZsYWdbcGFyZW50X2lkXSddID0gc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ107XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnIpIHtcblx0Y29uc29sZS5sb2coZXJyKTtcblx0dGhyb3cgZXJyO1xufTtcblxuZXhwb3J0IHsgcmF3X3Bvc3RfZmxhZ19jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nLFxuXHR2YWxpZGF0ZV9ib29sZWFuLFxuXHR2YWxpZGF0ZV9mcm9tX2xpc3Rcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfdGFnX3NlYXJjaCAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRwYXRoOiAnL3RhZ3MnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdVUkwnLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncylcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtpZF0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1snc2VhcmNoW2lkXSddLCAnc2VhcmNoW2lkXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddLCAnc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSwgJ3NlYXJjaFtuYW1lX21hdGNoZXNdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtuYW1lXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydzZWFyY2hbbmFtZV0nXSwgJ3NlYXJjaFtuYW1lXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbY2F0ZWdvcnldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3NlYXJjaFtjYXRlZ29yeV0nXSwgJ3NlYXJjaFtjYXRlZ29yeV0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hpZGVfZW1wdHldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXSwgJ3NlYXJjaFtoaWRlX2VtcHR5XScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGFzX3dpa2ldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGFzX3dpa2ldJ10sICdzZWFyY2hbaGFzX3dpa2ldJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtoYXNfYXJ0aXN0XSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5nc1snc2VhcmNoW2hhc19hcnRpc3RdJ10sICdzZWFyY2hbaGFzX2FydGlzdF0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Jvb2xlYW4oc2V0dGluZ3NbJ3NlYXJjaFtpc19sb2NrZWRdJ10sICdzZWFyY2hbaXNfbG9ja2VkXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGlkZV93aWtpXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5nc1snc2VhcmNoW2hpZGVfd2lraV0nXSwgJ3NlYXJjaFtoaWRlX3dpa2ldJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtvcmRlcl0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Zyb21fbGlzdChzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddLCBbJ25hbWUnLCAnZGF0ZScsICdjb3VudCcsICdzaW1pbGFyaXR5J10sICdzZWFyY2hbb3JkZXJdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MubGltaXQsICdsaW1pdCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9wYWdlX3N0cmluZyhzZXR0aW5ncy5wYWdlLCAncGFnZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHt9O1xuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lkXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2lkXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtpZF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5nc1snc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbbmFtZV0nXSA9IHNldHRpbmdzWydzZWFyY2hbbmFtZV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2NhdGVnb3J5XSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2NhdGVnb3J5XSddID0gc2V0dGluZ3NbJ3NlYXJjaFtjYXRlZ29yeV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hpZGVfZW1wdHldJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaGlkZV9lbXB0eV0nXSA9IHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hhc193aWtpXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2hhc193aWtpXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtoYXNfd2lraV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hhc19hcnRpc3RdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaGFzX2FydGlzdF0nXSA9IHNldHRpbmdzWydzZWFyY2hbaGFzX2FydGlzdF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtpc19sb2NrZWRdJ10gPSBzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW29yZGVyXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtvcmRlcl0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5wYWdlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5wYWdlID0gc2V0dGluZ3MucGFnZTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyByYXdfdGFnX3NlYXJjaCB9O1xuIiwiaW1wb3J0IHsgcmF3X3RhZ19zZWFyY2ggfSBmcm9tICcuL3Jhd190YWdfc2VhcmNoLmpzJztcblxuY29uc3QgdGFnX2NhdGVnb3J5ID0ge1xuXHRnZW5lcmFsOiAwLFxuXHRhcnRpc3Q6IDEsXG5cdGNvcHlyaWdodDogMyxcblx0Y2hhcmFjdGVyOiA0LFxuXHRzcGVjaWVzOiA1LFxuXHRpbnZhbGlkOiA2LFxuXHRtZXRhOiA3LFxuXHRsb3JlOiA4XG59O1xuXG5hc3luYyBmdW5jdGlvbiB0YWdfc2VhcmNoIChzZXR0aW5ncywgcGFnZSA9IDApIHtcblx0aWYgKHNldHRpbmdzLnBhZ2UgPT09IG51bGwgfHwgc2V0dGluZ3MucGFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0c2V0dGluZ3MucGFnZSA9IHBhZ2UudG9TdHJpbmcoKTtcblx0fSAvLyBlbHNlIHBhZ2UgaXMgYWxyZWFkeSBzZXRcblxuXHRyZXR1cm4gcmF3X3RhZ19zZWFyY2guY2FsbCh0aGlzLCBtYWtlX3NldHRpbmdzKHNldHRpbmdzKSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIG1ha2Vfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0J3NlYXJjaFtpZF0nOiBudWxsLFxuXHRcdCdzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtuYW1lX21hdGNoZXNdJzogbnVsbCxcblx0XHQnc2VhcmNoW25hbWVdJzogbnVsbCxcblx0XHQnc2VhcmNoW2NhdGVnb3J5XSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoaWRlX2VtcHR5XSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoYXNfd2lraV0nOiBudWxsLFxuXHRcdCdzZWFyY2hbaGFzX2FydGlzdF0nOiBudWxsLFxuXHRcdCdzZWFyY2hbaXNfbG9ja2VkXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoaWRlX3dpa2ldJzogbnVsbCxcblx0XHQnc2VhcmNoW29yZGVyXSc6IG51bGwsXG5cdFx0bGltaXQ6IG51bGwsXG5cdFx0cGFnZTogc2V0dGluZ3MucGFnZVxuXHR9O1xuXG5cdGlmIChzZXR0aW5ncy5pZCAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzLmlkICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2lkXSddID0gc2V0dGluZ3MuaWQ7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3MuZnV6enlfbWF0Y2ggIT09IHVuZGVmaW5lZCAmJiBzZXR0aW5ncy5mdXp6eV9tYXRjaCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5ncy5mdXp6eV9tYXRjaDtcblx0fSBlbHNlIGlmIChzZXR0aW5ncy53aWxkX21hdGNoICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3Mud2lsZF9tYXRjaCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5ncy53aWxkX21hdGNoO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzLmV4YWN0X21hdGNoICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MuZXhhY3RfbWF0Y2ggIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbbmFtZV0nXSA9IHNldHRpbmdzLmV4YWN0X21hdGNoO1xuXHR9XG5cblx0Zm9yIChjb25zdCB0ZXJtIG9mIFsnaGlkZV9lbXB0eScsICdoYXNfd2lraScsICdoYXNfYXJ0aXN0JywgJ2lzX2xvY2tlZCcsICdoaWRlX3dpa2knLCAnb3JkZXInXSkge1xuXHRcdGlmIChzZXR0aW5nc1t0ZXJtXSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzW3Rlcm1dICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm5fb2JqZWN0W2BzZWFyY2hbJHt0ZXJtfV1gXSA9IHNldHRpbmdzW3Rlcm1dO1xuXHRcdH1cblx0fVxuXG5cdGlmIChzZXR0aW5ncy5jYXRlZ29yeSAhPT0gbnVsbCAmJiBzZXR0aW5ncy5jYXRlZ29yeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKHRhZ19jYXRlZ29yeVtzZXR0aW5ncy5jYXRlZ29yeV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYXRlZ29yeSBtdXN0IGJlIG9uZSBvZiBbJHtPYmplY3Qua2V5cyh0YWdfY2F0ZWdvcnkpLmpvaW4oJywgJyl9XWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbY2F0ZWdvcnldJ10gPSBzZXR0aW5ncy5jYXRlZ29yeTtcblx0XHR9XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwgJiYgc2V0dGluZ3MubGltaXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm5fb2JqZWN0LmxpbWl0ID0gMTAwMDtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyB0YWdfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyB0YWdfc2VhcmNoIH0gZnJvbSAnLi90YWdfc2VhcmNoLmpzJztcblxuY29uc3QgdGFnc19wZXJfcGFnZSA9IDEwMDA7XG5cbi8vIFlvdSBjYW4gbm90IGhhdmUgYSBkaWZmZXJlbnQgb3JkZXIgd2hlbiBzZWFyY2hpbmcgdGhyb3VnaCBwb3N0cyBsaWtlIHRoaXNcbmFzeW5jIGZ1bmN0aW9uKiB0YWdfc2VhcmNoX2l0ZXJhdG9yIChzZWFyY2hfb3B0aW9ucykge1xuXHQvLyBcIlByb3ZpZGluZyBhcmJpdHJhcmlseSBsYXJnZSB2YWx1ZXMgdG8gb2J0YWluIHRoZSBtb3N0IHJlY2VudCBwb3N0c1xuXHQvLyBpcyBub3QgcG9ydGFibGUgYW5kIG1heSBicmVhayBpbiB0aGUgZnV0dXJlXCIuICh3aWtpKVxuXHQvLyBJIGRvIHdoYXQgSSB3YW50XG5cdHNlYXJjaF9vcHRpb25zLnBhZ2UgPSBudWxsO1xuXHRzZWFyY2hfb3B0aW9ucy5saW1pdCA9IG51bGw7XG5cblx0bGV0IG1heF9pZCA9IDFlOTtcblx0d2hpbGUgKHRydWUpIHtcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vendhZ290aC9lNjIxbmcvaXNzdWVzLzIwMlxuXHRcdGNvbnN0IHRhZ3MgPSBhd2FpdCB0YWdfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdFx0Li4uc2VhcmNoX29wdGlvbnMsXG5cdFx0XHRwYWdlOiBgYiR7bWF4X2lkfWAsXG5cdFx0XHRsaW1pdDogMTAwMFxuXHRcdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0XHR5aWVsZCogdGFncztcblx0XHRtYXhfaWQgPSB0YWdzLnJlZHVjZSgoYWNjLCBlKSA9PiBhY2MuaWQgPCBlLmlkID8gYWNjIDogZSkuaWQ7XG5cblx0XHRpZiAodGFncy5sZW5ndGggPCB0YWdzX3Blcl9wYWdlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyB0YWdfc2VhcmNoX2l0ZXJhdG9yIH07XG4iLCJmdW5jdGlvbiB2YWxpZGF0ZV9tZDUgKG1kNSkge1xuXHRpZiAodHlwZW9mIG1kNSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAobWQ1Lmxlbmd0aCAhPT0gMzIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIGxlbmd0aCAzMicpO1xuXHR9XG5cblx0Y29uc3QgY29udGFpbnNfbm9uX2hleCA9IC9bXjAtOWEtZkEtRl0vZztcblx0aWYgKGNvbnRhaW5zX25vbl9oZXgudGVzdChtZDUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZDUgY29udGFpbnMgbm9uLWhleGFkZWNpbWFsIGNoYXJhY3RlcicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX2NvdW50aW5nX251bWJlciAobnVtYmVyLCBuYW1lKSB7XG5cdGlmICh0eXBlb2YgbnVtYmVyICE9PSAnbnVtYmVyJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBtdXN0IGJlIGEgbnVtYmVyYCk7XG5cdH1cblxuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfW11c3QgYmUgYW4gaW50ZWdlcmApO1xuXHR9XG5cblx0aWYgKG51bWJlciA8IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyb2ApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0cmluZyAoc3RyaW5nLCBuYW1lKSB7XG5cdGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBzdHJpbmdgKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV92b3RlX29wdGlvbiAodm90ZSkge1xuXHRpZiAodm90ZSAhPT0gLTEgJiYgdm90ZSAhPT0gMCAmJiB2b3RlICE9PSAxKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd2b3RlIGlzIG5vdCBvZiB0aGUgdmFsdWVzIFstMSwgMV0nKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9wYWdlX3N0cmluZyAoc3RyaW5nLCBuYW1lKSB7XG5cdHZhbGlkYXRlX3N0cmluZyhzdHJpbmcsIG5hbWUpO1xuXG5cdGlmICgoL1thYl0/XFxkKy8pLnRlc3Qoc3RyaW5nKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gZG9lcyBub3QgbWF0Y2ggdGhlIGZvcm1hdCAvW2FiXT9cXFxcZCsvYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfYm9vbGVhbiAoYm9vbGVhbiwgbmFtZSkge1xuXHRpZiAoYm9vbGVhbiAhPT0gZmFsc2UgJiYgYm9vbGVhbiAhPT0gdHJ1ZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyBub3Qgb2YgdGhlIHR5cGUgYm9vbGVhbmApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX2Zyb21fbGlzdCAodmFsdWUsIGxpc3QsIG5hbWUpIHtcblx0aWYgKGxpc3Quc29tZShlID0+IGUgPT09IHZhbHVlKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFZhbHVlICR7dmFsdWV9IG5vdCBpbiBsaXN0IFske2xpc3Quam9pbignLCAnKX1dIGZvciAke25hbWV9YCk7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0dmFsaWRhdGVfbWQ1LFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3N0cmluZyxcblx0dmFsaWRhdGVfdm90ZV9vcHRpb24sXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nLFxuXHR2YWxpZGF0ZV9ib29sZWFuLFxuXHR2YWxpZGF0ZV9mcm9tX2xpc3Rcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb3JtLWRhdGFcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==