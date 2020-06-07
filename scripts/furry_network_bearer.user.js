// ==UserScript==
// @name         Furry Network Access Token
// @namespace    https://github.com/sasquire
// @version      0.1
// @description  Shows the bearer token when reloading a furry network page
// @author       Sasquire
// @match        https://furrynetwork.com/*
// @grant        none
// ==/UserScript==

console.log(`Access token is ${JSON.parse(localStorage.getItem('token')).access_token}`);
