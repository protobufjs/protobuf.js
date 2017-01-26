"use strict";
module.exports = fetch;

var asPromise = require("@protobufjs/aspromise"),
    inquire   = require("@protobufjs/inquire");

var fs = inquire("fs");

/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} path File path or url
 * @param {FetchCallback} [callback] Callback function
 * @returns {Promise<string>} A Promise if `callback` has been omitted, otherwise `undefined`
 * @property {function(string, FetchCallback=):Promise<string>} xhr XHR/browser fetch with an identical signature
 */
function fetch(path, callback) {
    if (!callback)
        return asPromise(fetch, this, path); // eslint-disable-line no-invalid-this
    if (fs && fs.readFile)
        return fs.readFile(path, "utf8", function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch.xhr(path, callback)
                : callback(err, contents);
        });
    return fetch.xhr(path, callback);
}

fetch.xhr = function fetch_xhr(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {
        return xhr.readyState === 4
            ? xhr.status === 0 || xhr.status === 200
            ? callback(null, xhr.responseText)
            : callback(Error("status " + xhr.status))
            : undefined;
        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
    };
    xhr.open("GET", path);
    xhr.send();
};
