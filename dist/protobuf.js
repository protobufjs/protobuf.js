/*!
 * protobuf.js v6.2.1 (c) 2016 Daniel Wirtz
 * Compiled Sun, 18 Dec 2016 00:20:15 UTC
 * Licensed under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/protobuf.js for details
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright (c) 2008, Fair Oaks Labs, Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
//  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//
// Modifications to writeIEEE754 to support negative zeroes made by Brian White

// ref: https://github.com/nodejs/node/blob/87286cc7371886d9856edf424785aaa890ba05a9/lib/buffer_ieee754.js

exports.read = function readIEEE754(buffer, offset, isBE, mLen, nBytes) {
    var e, m,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        nBits = -7,
        i = isBE ? 0 : (nBytes - 1),
        d = isBE ? 1 : -1,
        s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

    if (e === 0) {
        e = 1 - eBias;
    } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity);
    } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function writeIEEE754(buffer, value, offset, isBE, mLen, nBytes) {
    var e, m, c,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
        i = isBE ? (nBytes - 1) : 0,
        d = isBE ? -1 : 1,
        s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        } else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }

        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

    buffer[offset + i - d] |= s * 128;
};

},{}],2:[function(require,module,exports){
"use strict";
module.exports = asPromise;

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {function(?Error, ...*)} fn Function to call
 * @param {Object} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params = [];
    for (var i = 2; i < arguments.length;)
        params.push(arguments[i++]);
    var pending = true;
    return new Promise(function asPromiseExecutor(resolve, reject) {
        params.push(function asPromiseCallback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var args = [];
                    for (var i = 1; i < arguments.length;)
                        args.push(arguments[i++]);
                    resolve.apply(null, args);
                }
            }
        });
        try {
            fn.apply(ctx || this, params); // eslint-disable-line no-invalid-this
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}

},{}],3:[function(require,module,exports){
"use strict";

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var string = []; // alt: new Array(Math.ceil((end - start) / 3) * 4);
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                string[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                string[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                string[i++] = b64[t | b >> 6];
                string[i++] = b64[b & 63];
                j = 0;
                break;
        }
    }
    if (j) {
        string[i++] = b64[t];
        string[i  ] = 61;
        if (j === 1)
            string[i + 1] = 61;
    }
    return String.fromCharCode.apply(String, string);
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

},{}],4:[function(require,module,exports){
"use strict";
module.exports = codegen;

var blockOpenRe  = /[{[]$/,
    blockCloseRe = /^[}\]]/,
    casingRe     = /:$/,
    branchRe     = /^\s*(?:if|else if|while|for)\b|\b(?:else)\s*$/,
    breakRe      = /\b(?:break|continue);?$|^\s*return\b/;

/**
 * A closure for generating functions programmatically.
 * @memberof util
 * @namespace
 * @function
 * @param {...string} params Function parameter names
 * @returns {Codegen} Codegen instance
 * @property {boolean} supported Whether code generation is supported by the environment.
 * @property {boolean} verbose=false When set to true, codegen will log generated code to console. Useful for debugging.
 */
function codegen() {
    var params = [],
        src    = [],
        indent = 1,
        inCase = false;
    for (var i = 0; i < arguments.length;)
        params.push(arguments[i++]);

    /**
     * A codegen instance as returned by {@link codegen}, that also is a sprintf-like appender function.
     * @typedef Codegen
     * @type {function}
     * @param {string} format Format string
     * @param {...*} args Replacements
     * @returns {Codegen} Itself
     * @property {function(string=):string} str Stringifies the so far generated function source.
     * @property {function(string=, Object=):function} eof Ends generation and builds the function whilst applying a scope.
     */
    /**/
    function gen() {
        var args = [],
            i = 0;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        var line = sprintf.apply(null, args);
        var level = indent;
        if (src.length) {
            var prev = src[src.length - 1];

            // block open or one time branch
            if (blockOpenRe.test(prev))
                level = ++indent; // keep
            else if (branchRe.test(prev))
                ++level; // once
            
            // casing
            if (casingRe.test(prev) && !casingRe.test(line)) {
                level = ++indent;
                inCase = true;
            } else if (inCase && breakRe.test(prev)) {
                level = --indent;
                inCase = false;
            }

            // block close
            if (blockCloseRe.test(line))
                level = --indent;
        }
        for (i = 0; i < level; ++i)
            line = "\t" + line;
        src.push(line);
        return gen;
    }

    /**
     * Stringifies the so far generated function source.
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @returns {string} Function source using tabs for indentation
     * @inner
     */
    function str(name) {
        return "function " + (name ? name.replace(/[^\w_$]/g, "_") : "") + "(" + params.join(", ") + ") {\n" + src.join("\n") + "\n}";
    }

    gen.str = str;

    /**
     * Ends generation and builds the function whilst applying a scope.
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @param {Object} [scope] Function scope
     * @returns {function} The generated function, with scope applied if specified
     * @inner
     */
    function eof(name, scope) {
        if (typeof name === "object") {
            scope = name;
            name = undefined;
        }
        var source = gen.str(name);
        if (codegen.verbose)
            console.log("--- codegen ---\n" + source.replace(/^/mg, "> ").replace(/\t/g, "  ")); // eslint-disable-line no-console
        var keys = Object.keys(scope || (scope = {}));
        return Function.apply(null, keys.concat("return " + source)).apply(null, keys.map(function(key) { return scope[key]; })); // eslint-disable-line no-new-func
        //     ^ Creates a wrapper function with the scoped variable names as its parameters,
        //       calls it with the respective scoped variable values ^
        //       and returns our brand-new properly scoped function.
        //
        // This works because "Invoking the Function constructor as a function (without using the
        // new operator) has the same effect as invoking it as a constructor."
        // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function
    }

    gen.eof = eof;

    return gen;
}

function sprintf(format) {
    var args = [],
        i = 1;
    for (; i < arguments.length;)
        args.push(arguments[i++]);
    i = 0;
    return format.replace(/%([djs])/g, function($0, $1) {
        var arg = args[i++];
        switch ($1) {
            case "j":
                return JSON.stringify(arg);
            default:
                return String(arg);
        }
    });
}

codegen.supported = false; try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable-line no-empty
codegen.verbose   = false;

},{}],5:[function(require,module,exports){
"use strict";
module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/** @alias util.EventEmitter.prototype */
var EventEmitterPrototype = EventEmitter.prototype;

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {Object} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitterPrototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitterPrototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitterPrototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};

},{}],6:[function(require,module,exports){
"use strict";
module.exports = extend;

/**
 * Lets the specified constructor extend `this` class.
 * @memberof util
 * @param {*} ctor Extending constructor
 * @returns {Object} Constructor prototype
 * @this Function
 */
function extend(ctor) {
    // copy static members
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; ++i)
        ctor[keys[i]] = this[keys[i]];
    // properly extend
    var prototype = ctor.prototype = Object.create(this.prototype);
    prototype.constructor = ctor;
    return prototype;
}

},{}],7:[function(require,module,exports){
"use strict";
module.exports = fetch;

var asPromise = require(2);
var fs        = require(8);

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
 * @returns {Promise<string>|undefined} A Promise if `callback` has been omitted 
 */
function fetch(path, callback) {
    if (!callback)
        return asPromise(fetch, this, path); // eslint-disable-line no-invalid-this
    if (fs.readFile)
        return fs.readFile(path, "utf8", function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch_xhr(path, callback)
                : callback(err, contents);
        });
    return fetch_xhr(path, callback);
}

function fetch_xhr(path, callback) {
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
}

},{"2":2,"8":8}],8:[function(require,module,exports){
"use strict";

/**
 * Node's fs module if available.
 * @name fs
 * @memberof util
 * @type {Object}
 */
/**/
try { module.exports = eval(["req","uire"].join(""))("fs"); } catch (e) {} // eslint-disable-line no-eval, no-empty

},{}],9:[function(require,module,exports){
"use strict";

/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts    = path.split("/"),
        absolute = isAbsolute(path),
        prefix   = "";
    if (absolute)
        prefix = parts.shift() + "/";
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0)
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};

},{}],10:[function(require,module,exports){
"use strict";
module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

},{}],11:[function(require,module,exports){
"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = [],
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            parts.push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    return parts.join("");
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};

},{}],12:[function(require,module,exports){
"use strict";
module.exports = Class;

var Message = require(19),
    util    = require(33);

var Type; // cyclic

var _TypeError = util._TypeError;

/**
 * Constructs a class instance, which is also a message prototype.
 * @classdesc Runtime class providing the tools to create your own custom classes.
 * @constructor
 * @param {Type} type Reflected type
 */
function Class(type) {
    return Class.create(type);
}

/**
 * Constructs a new message prototype for the specified reflected type and sets up its constructor.
 * @param {Type} type Reflected message type
 * @param {*} [ctor] Custom constructor to set up, defaults to create a generic one if omitted
 * @returns {Message} Message prototype
 */
Class.create = function create(type, ctor) {
    if (!Type)
        Type = require(31);
    if (!(type instanceof Type))
        throw _TypeError("type", "a Type");
    if (ctor) {
        if (typeof ctor !== "function")
            throw _TypeError("ctor", "a function");
    } else
        ctor = (function(MessageCtor) { // eslint-disable-line wrap-iife
            return function Message(properties) {
                MessageCtor.call(this, properties);
            };
        })(Message);

    // Let's pretend...
    ctor.constructor = Class;
    
    // new Class() -> Message.prototype
    var prototype = ctor.prototype = new Message();
    prototype.constructor = ctor;

    // Static methods on Message are instance methods on Class and vice versa.
    util.merge(ctor, Message, true);

    // Classes and messages reference their reflected type
    ctor.$type = type;
    prototype.$type = type;

    // Messages have non-enumerable default values on their prototype
    type.getFieldsArray().forEach(function(field) {
        // objects on the prototype must be immmutable. users must assign a new object instance and
        // cannot use Array#push on empty arrays on the prototype for example, as this would modify
        // the value on the prototype for ALL messages of this type. Hence, these objects are frozen.
        prototype[field.name] = Array.isArray(field.resolve().defaultValue)
            ? util.emptyArray
            : util.isObject(field.defaultValue)
            ? util.emptyObject
            : field.defaultValue;
    });

    // Messages have non-enumerable getters and setters for each virtual oneof field
    type.getOneofsArray().forEach(function(oneof) {
        util.prop(prototype, oneof.resolve().name, {
            get: function getVirtual() {
                // > If the parser encounters multiple members of the same oneof on the wire, only the last member seen is used in the parsed message.
                for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
                    if (oneof.oneof.indexOf(keys[i]) > -1)
                        return keys[i];
                return undefined;
            },
            set: function setVirtual(value) {
                for (var keys = oneof.oneof, i = 0; i < keys.length; ++i)
                    if (keys[i] !== value)
                        delete this[keys[i]];
            }
        });
    });

    // Register
    type.setCtor(ctor);

    return prototype;
};

// Static methods on Message are instance methods on Class and vice versa.
Class.prototype = Message;

/**
 * Encodes a message of this type.
 * @name Class#encode
 * @function
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @name Class#encodeDelimited
 * @function
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Decodes a message of this type.
 * @name Class#decode
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Class#decodeDelimited
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Verifies a message of this type.
 * @name Class#verify
 * @function
 * @param {Message|Object} message Message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */

},{"19":19,"31":31,"33":33}],13:[function(require,module,exports){
"use strict";

module.exports = common;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {Object} google/protobuf/any.proto Any
 * @property {Object} google/protobuf/duration.proto Duration
 * @property {Object} google/protobuf/empty.proto Empty
 * @property {Object} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {Object} google/protobuf/timestamp.proto Timestamp
 */
function common(name, json) {
    if (!/\/|\./.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
// - google/protobuf/descriptor.proto
// - google/protobuf/field_mask.proto
// - google/protobuf/source_context.proto
// - google/protobuf/type.proto
// - google/protobuf/wrappers.proto

common("any", {
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {
    Timestamp: timeType
});

common("empty", {
    Empty: {
        fields: {}
    }
});

common("struct", {
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },
    Value: {
        oneofs: {
            kind: {
                oneof: [ "nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue" ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },
    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});

},{}],14:[function(require,module,exports){
"use strict";
module.exports = decode;

var Enum    = require(16),
    Reader  = require(25),
    types   = require(32),
    util    = require(33);

/**
 * General purpose message decoder.
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message} Populated runtime message
 * @this Type
 * @property {GenerateDecoder} generate Generates a type specific decoder
 */
function decode(readerOrBuffer, length) {
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fields  = this.getFieldsById(),
        reader  = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader.create(readerOrBuffer),
        limit   = length === undefined ? reader.len : reader.pos + length,
        message = new (this.getCtor())();
    while (reader.pos < limit) {
        var tag      = reader.uint32(),
            wireType = tag & 7;

        // End group
        if (wireType === 4)
            break;

        var field    = fields[tag >>> 3].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type;
        
        // Known fields
        if (field) {

            // Map fields
            if (field.map) {
                var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
                reader.skip();
                reader.pos++; // assumes id 1
                if (message[field.name] === util.emptyObject)
                    message[field.name] = {};
                var key = reader[keyType]();
                if (typeof key === "object")
                    key = util.longToHash(key);
                reader.pos++; // assumes id 2
                message[field.name][key] = types.basic[type] === undefined
                    ? field.resolvedType.decode(reader, reader.uint32())
                    : reader[type]();

            // Repeated fields
            } else if (field.repeated) {
                var values = message[field.name] && message[field.name].length ? message[field.name] : message[field.name] = [];

                // Packed
                if (field.packed && types.packed[type] !== undefined && wireType === 2) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values.push(reader[type]());

                // Non-packed
                } else if (types.basic[type] === undefined)
                    values.push(field.resolvedType.decode(reader, field.resolvedType.group ? undefined : reader.uint32()));
                else
                    values.push(reader[type]());

            // Non-repeated
            } else if (types.basic[type] === undefined)
                message[field.name] = field.resolvedType.decode(reader, field.resolvedType.group ? undefined : reader.uint32());
            else
                message[field.name] = reader[type]();

        // Unknown fields
        } else
            reader.skipType(wireType);
    }
    return message;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
}

/**
 * Generates a decoder specific to the specified message type.
 * @typedef GenerateDecoder
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
decode.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();    
    var gen = util.codegen("r", "l")

    ("r instanceof Reader||(r=Reader.create(r))")
    ("var c=l===undefined?r.len:r.pos+l,m=new(this.getCtor())")
    ("while(r.pos<c){")
        ("var t=r.int32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");
    
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "uint32" : field.type,
            prop  = util.safeProp(field.name);
        gen
            ("case %d:", field.id);

        // Map fields
        if (field.map) {

            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("r.skip().pos++")
                ("if(m%s===util.emptyObject)", prop)
                    ("m%s={}", prop)
                ("var k=r.%s()", keyType)
                ("if(typeof k===\"object\")")
                    ("k=util.longToHash(k)")
                ("r.pos++");
            if (types.basic[type] === undefined) gen
                ("m%s[k]=types[%d].decode(r,r.uint32())", prop, i);
            else gen
                ("m%s[k]=r.%s()", prop, type);

        // Repeated fields
        } else if (field.repeated) { gen

                ("m%s&&m%s.length?m%s:m%s=[]", prop, prop, prop, prop);

            // Packed
            if (field.packed && types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var e=r.uint32()+r.pos")
                    ("while(r.pos<e)")
                        ("m%s.push(r.%s())", prop, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "m%s.push(types[%d].decode(r))"
                    : "m%s.push(types[%d].decode(r,r.uint32()))", prop, i);
            else gen
                    ("m%s.push(r.%s())", prop, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "m%s=types[%d].decode(r)"
                : "m%s=types[%d].decode(r,r.uint32())", prop, i);
        else gen
                ("m%s=r.%s()", prop, type);
        gen
                ("break");

    // Unknown fields
    } return gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")
        ("}")
    ("}")
    ("return m");
    /* eslint-enable no-unexpected-multiline */
};

},{"16":16,"25":25,"32":32,"33":33}],15:[function(require,module,exports){
"use strict";
module.exports = encode;

var Enum     = require(16),
    Writer   = require(37),
    types    = require(32),
    util     = require(33);
var safeProp = util.safeProp;

function encodeType(field, value, writer) {
    if (field.resolvedType.group)
        field.resolvedType.encode(value, writer.uint32((field.id << 3 | 3) >>> 0)).uint32((field.id << 3 | 4) >>> 0);
    else if (field.resolvedType.encode(value, writer.fork()).len || field.required)
        writer.ldelim(field.id);
    else
        writer.reset();
}

/**
 * General purpose message encoder.
 * @param {Message|Object} message Runtime message or plain object to encode
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 * @this Type
 * @property {GenerateEncoder} generate Generates a type specific encoder
 */
function encode(message, writer) {
    /* eslint-disable block-scoped-var, no-redeclare */
    if (!writer)
        writer = Writer.create();
    var fields = this.getFieldsArray(), fi = 0;
    while (fi < fields.length) {
        var field    = fields[fi++].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type];

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            if (message[field.name] && message[field.name] !== util.emptyObject) {
                for (var keys = Object.keys(message[field.name]), i = 0; i < keys.length; ++i) {
                    writer.uint32((field.id << 3 | 2) >>> 0).fork()
                          .uint32(/*1*/8 | types.mapKey[keyType])[keyType](keys[i]);
                    if (wireType === undefined)
                        field.resolvedType.encode(message[field.name][keys[i]], writer.uint32(/*2,2*/18).fork()).ldelim();
                    else
                        writer.uint32(/*2*/16 | wireType)[type](message[field.name][keys[i]]);
                    writer.ldelim();
                }
            }

        // Repeated fields
        } else if (field.repeated) {
            var values = message[field.name];
            if (values && values.length) {

                // Packed repeated
                if (field.packed && types.packed[type] !== undefined) {
                    if (values.length) {
                        writer.uint32((field.id << 3 | 2) >>> 0).fork();
                        var i = 0;
                        while (i < values.length)
                            writer[type](values[i++]);
                        writer.ldelim();
                    }

                // Non-packed
                } else {
                    var i = 0;
                    if (wireType === undefined)
                        while (i < values.length)
                            encodeType(field, values[i++], writer);
                    else
                        while (i < values.length)
                            writer.uint32((field.id << 3 | wireType) >>> 0)[type](values[i++]);
                }

            }

        // Non-repeated
        } else {
            var value = message[field.name];
            if (
                field.partOf && message[field.partOf.name] === field.name
                ||
                (field.required || value !== undefined) && (field.long ? util.longNe(value, field.defaultValue.low, field.defaultValue.high) : value !== field.defaultValue)
            ) {
                if (wireType === undefined)
                    encodeType(field, value, writer);
                else
                    writer.uint32((field.id << 3 | wireType) >>> 0)[type](value);
            }
        }
    }
    return writer;
    /* eslint-enable block-scoped-var, no-redeclare */
}

function genEncodeType(gen, field, fieldIndex, ref, alwaysRequired) {
    if (field.resolvedType.group)
        return gen("types[%d].encode(%s,w.uint32(%d)).uint32(%d)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0);
    return alwaysRequired || field.required
      ? gen("types[%d].encode(%s,w.uint32(%d).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0)
      : gen("types[%d].encode(%s,w.fork()).len&&w.ldelim(%d)||w.reset()", fieldIndex, ref, field.id);
}

/**
 * Generates an {@link Encoder|encoder} specific to the specified message type.
 * @typedef GenerateEncoder
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
encode.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.getFieldsArray();
    var oneofs = mtype.getOneofsArray();
    var gen = util.codegen("m", "w")
    ("w||(w=Writer.create())");

    var i;
    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type],
            prop     = safeProp(field.name);

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
    ("if(m%s&&m%s!==util.emptyObject){", prop, prop)
        ("for(var ks=Object.keys(m%s),i=0;i<ks.length;++i){", prop)
            ("w.uint32(%d).fork().uint32(%d).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[keyType], keyType);
            if (wireType === undefined) gen
            ("types[%d].encode(m%s[ks[i]],w.uint32(18).fork()).ldelim()", i, prop); // can't be groups
            else gen
            ("w.uint32(%d).%s(m%s[ks[i]])", 16 | wireType, type, prop);
            gen
            ("w.ldelim()")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) {

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

    ("if(m%s&&m%s.length){", prop, prop)
        ("w.uint32(%d).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<m%s.length;++i)", prop)
            ("w.%s(m%s[i])", type, prop)
        ("w.ldelim()", field.id)
    ("}");

            // Non-packed
            } else { gen

    ("if(m%s)", prop)
        ("for(var i=0;i<m%s.length;++i)", prop);
                if (wireType !== undefined) gen
            ("w.uint32(%d).%s(m%s[i])", (field.id << 3 | wireType) >>> 0, type, prop);
                else
            genEncodeType(gen, field, i, "m" + prop + "[i]", true);

            }

        // Non-repeated
        } else if (!field.partOf) {
            if (!field.required) {

                if (field.long) {
                    gen
    ("if(m%s!==undefined&&util.longNe(m%s,%d,%d))", prop, prop, field.defaultValue.low, field.defaultValue.high);
                } else gen
    ("if(m%s!==undefined&&m%s!==%j)", prop, prop, field.defaultValue);

            }

            if (wireType !== undefined) gen
        ("w.uint32(%d).%s(m%s)", (field.id << 3 | wireType) >>> 0, type, prop);
            else
         genEncodeType(gen, field, i, "m" + prop);

        }
    }
    for (var i = 0; i < oneofs.length; ++i) {
        var oneof = oneofs[i],
            prop  = safeProp(oneof.name);
        gen
        ("switch(m%s){", prop);
        var oneofFields = oneof.getFieldsArray();
        for (var j = 0; j < oneofFields.length; ++j) {
            var field    = oneofFields[j],
                type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
                wireType = types.basic[type],
                prop     = safeProp(field.name);
            gen
            ("case%j:", field.name);

            if (wireType !== undefined) gen
                ("w.uint32(%d).%s(m%s)", (field.id << 3 | wireType) >>> 0, type, prop);
            else
                genEncodeType(gen, field, fields.indexOf(field), "m" + prop);

            gen
                ("break;");

        } gen
        ("}");        
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

},{"16":16,"32":32,"33":33,"37":37}],16:[function(require,module,exports){
"use strict";
module.exports = Enum;

var ReflectionObject = require(22);
/** @alias Enum.prototype */
var EnumPrototype = ReflectionObject.extend(Enum);

Enum.className = "Enum";

var util = require(33);

var _TypeError = util._TypeError;

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object} [options] Declared options
 */
function Enum(name, values, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = values || {}; // toJSON, marker

    /**
     * Cached values by id.
     * @type {?Object.<number,string>}
     * @private
     */
    this._valuesById = null;
}

util.props(EnumPrototype, {

    /**
     * Enum values by id.
     * @name Enum#valuesById
     * @type {Object.<number,string>}
     * @readonly
     */
    valuesById: {
        get: function getValuesById() {
            if (!this._valuesById) {
                this._valuesById = {};
                Object.keys(this.values).forEach(function(name) {
                    var id = this.values[name];
                    if (this._valuesById[id])
                        throw Error("duplicate id " + id + " in " + this);
                    this._valuesById[id] = name;
                }, this);
            }
            return this._valuesById;
        }
    }

    /**
     * Gets this enum's values by id. This is an alias of {@link Enum#valuesById}'s getter for use within non-ES5 environments.
     * @name Enum#getValuesById
     * @function
     * @returns {Object.<number,string>}
     */
});

function clearCache(enm) {
    enm._valuesById = null;
    return enm;
}

/**
 * Tests if the specified JSON object describes an enum.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes an enum
 */
Enum.testJSON = function testJSON(json) {
    return Boolean(json && json.values);
};

/**
 * Creates an enum from JSON.
 * @param {string} name Enum name
 * @param {Object.<string,*>} json JSON object
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * @override
 */
EnumPrototype.toJSON = function toJSON() {
    return {
        options : this.options,
        values  : this.values
    };
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
EnumPrototype.add = function(name, id) {
    if (!util.isString(name))
        throw _TypeError("name");
    if (!util.isInteger(id) || id < 0)
        throw _TypeError("id", "a non-negative integer");
    if (this.values[name] !== undefined)
        throw Error("duplicate name '" + name + "' in " + this);
    if (this.getValuesById()[id] !== undefined)
        throw Error("duplicate id " + id + " in " + this);
    this.values[name] = id;
    return clearCache(this);
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
EnumPrototype.remove = function(name) {
    if (!util.isString(name))
        throw _TypeError("name");
    if (this.values[name] === undefined)
        throw Error("'" + name + "' is not a name of " + this);
    delete this.values[name];
    return clearCache(this);
};

},{"22":22,"33":33}],17:[function(require,module,exports){
(function (Buffer){
"use strict";
module.exports = Field;

var ReflectionObject = require(22);
/** @alias Field.prototype */
var FieldPrototype = ReflectionObject.extend(Field);

Field.className = "Field";

var Message = require(19),
    Enum      = require(16),
    types     = require(32),
    util      = require(33);

var Type,     // cyclic
    MapField; // cyclic

var _TypeError = util._TypeError;

/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @classdesc Reflected message field.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object} [rule="optional"] Field rule
 * @param {string|Object} [extend] Extended type if different from parent
 * @param {Object} [options] Declared options
 */
function Field(name, id, type, rule, extend, options) {
    if (util.isObject(rule)) {
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        options = extend;
        extend = undefined;
    }
    ReflectionObject.call(this, name, options);
    if (!util.isInteger(id) || id < 0)
        throw _TypeError("id", "a non-negative integer");
    if (!util.isString(type))
        throw _TypeError("type");
    if (extend !== undefined && !util.isString(extend))
        throw _TypeError("extend");
    if (rule !== undefined && !/^required|optional|repeated$/.test(rule = rule.toString().toLowerCase()))
        throw _TypeError("rule", "a valid rule string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // toJSON

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // toJSON, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // toJSON

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {?Type}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {?OneOf}
     */
    this.partOf = null;

    /**
     * The field's default value. Only relevant when working with proto2.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */
    this.long = util.Long ? types.long[type] !== undefined : false;

    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */
    this.bytes = type === "bytes";

    /**
     * Resolved type if not a basic type.
     * @type {?(Type|Enum)}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {?Field}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {?Field}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {?boolean}
     * @private
     */
    this._packed = null;
}

util.props(FieldPrototype, {

    /**
     * Determines whether this field is packed. Only relevant when repeated and working with proto2.
     * @name Field#packed
     * @type {boolean}
     * @readonly
     */
    packed: {
        get: FieldPrototype.isPacked = function() {
            if (this._packed === null)
                this._packed = this.getOption("packed") !== false;
            return this._packed;
        }
    }

    /**
     * Determines whether this field is packed. This is an alias of {@link Field#packed}'s getter for use within non-ES5 environments.
     * @name Field#isPacked
     * @function
     * @returns {boolean}
     */
});

/**
 * @override
 */
FieldPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed")
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Tests if the specified JSON object describes a field.
 * @param {*} json Any JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
Field.testJSON = function testJSON(json) {
    return Boolean(json && json.id !== undefined);
};

/**
 * Constructs a field from JSON.
 * @param {string} name Field name
 * @param {Object} json JSON object
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    if (json.keyType !== undefined) {
        if (!MapField)
            MapField = require(18);
        return MapField.fromJSON(name, json);
    }
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options);
};

/**
 * @override
 */
FieldPrototype.toJSON = function toJSON() {
    return {
        rule    : this.rule !== "optional" && this.rule || undefined,
        type    : this.type,
        id      : this.id,
        extend  : this.extend,
        options : this.options
    };
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
FieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    var typeDefault = types.defaults[this.type];

    // if not a basic type, resolve it
    if (typeDefault === undefined) {
        var resolved = this.parent.lookup(this.type);
        if (!Type)
            Type = require(31);
        if (resolved instanceof Type) {
            this.resolvedType = resolved;
            typeDefault = null;
        } else if (resolved instanceof Enum) {
            this.resolvedType = resolved;
            typeDefault = 0;
        } else
            throw Error("unresolvable field type: " + this.type);
    }

    // when everything is resolved determine the default value
    var optionDefault;
    if (this.map)
        this.defaultValue = {};
    else if (this.repeated)
        this.defaultValue = [];
    else if (this.options && (optionDefault = this.options["default"]) !== undefined) // eslint-disable-line dot-notation
        this.defaultValue = optionDefault;
    else
        this.defaultValue = typeDefault;

    if (this.long)
        this.defaultValue = util.Long.fromValue(this.defaultValue);

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Converts a field value to JSON using the specified options. Note that this method does not account for repeated fields and must be called once for each repeated element instead.
 * @param {*} value Field value
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {*} Converted value
 * @see {@link Message#asJSON}
 */
FieldPrototype.jsonConvert = function(value, options) {
    if (options) {
        if (value instanceof Message)
            return value.asJSON(options);
        if (this.resolvedType instanceof Enum && options["enum"] === String) // eslint-disable-line dot-notation
            return this.resolvedType.getValuesById()[value];
        if (options.long && this.long)
            return options.long === Number
                ? typeof value === "number"
                    ? value
                    : util.LongBits.from(value).toNumber(this.type.charAt(0) === "u")
                : util.Long.fromValue(value, this.type.charAt(0) === "u").toString();
        if (options.bytes && this.bytes) {
            if (options.bytes === String)
                return util.base64.encode(value, 0, value.length);
            if (options.bytes === Array)
                return Array.prototype.slice.call(value);
            if (options.bytes === util.Buffer && !util.Buffer.isBuffer(value))
                return util.Buffer.from ? util.Buffer.from(value) : new Buffer(value);
        }
    }
    return value;
};

}).call(this,require("buffer").Buffer)

},{"16":16,"18":18,"19":19,"22":22,"31":31,"32":32,"33":33,"buffer":"buffer"}],18:[function(require,module,exports){
"use strict";
module.exports = MapField;

var Field = require(17);
/** @alias Field.prototype */
var FieldPrototype = Field.prototype;
/** @alias MapField.prototype */
var MapFieldPrototype = Field.extend(MapField);

MapField.className = "MapField";

var Enum    = require(16),
    types   = require(32),
    util    = require(33);

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends Field
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object} [options] Declared options
 */
function MapField(name, id, keyType, type, options) {
    Field.call(this, name, id, type, options);
    if (!util.isString(keyType))
        throw util._TypeError("keyType");
    
    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {?ReflectionObject}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Tests if the specified JSON object describes a map field.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
MapField.testJSON = function testJSON(json) {
    return Field.testJSON(json) && json.keyType !== undefined;
};

/**
 * Constructs a map field from JSON.
 * @param {string} name Field name
 * @param {Object} json JSON object
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options);
};

/**
 * @override
 */
MapFieldPrototype.toJSON = function toJSON() {
    return {
        keyType : this.keyType,
        type    : this.type,
        id      : this.id,
        extend  : this.extend,
        options : this.options
    };
};

/**
 * @override
 */
MapFieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    
    // Besides a value type, map fields have a key type to resolve
    var keyWireType = types.mapKey[this.keyType];
    if (keyWireType === undefined) {
        var resolved = this.parent.lookup(this.keyType);
        if (!(resolved instanceof Enum))
            throw Error("unresolvable map key type: " + this.keyType);
        this.resolvedKeyType = resolved;
    }

    return FieldPrototype.resolve.call(this);
};

},{"16":16,"17":17,"32":32,"33":33}],19:[function(require,module,exports){
"use strict";
module.exports = Message;

/**
 * Constructs a new message instance.
 *
 * This method should be called from your custom constructors, i.e. `Message.call(this, properties)`.
 * @classdesc Abstract runtime message.
 * @extends {Object}
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @abstract
 * @see {@link Class.create}
 */
function Message(properties) {
    if (properties) {
        var keys = Object.keys(properties);
        for (var i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
    }
}

/** @alias Message.prototype */
var MessagePrototype = Message.prototype;

/**
 * Converts this message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
 * @param {*} [options.long] Long conversion type. Only relevant with a long library.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to a possibly unsafe number without, and a `Long` with a long library.
 * @param {*} [options.enum=Number] Enum value conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to the numeric ids.
 * @param {*} [options.bytes] Bytes value conversion type.
 * Valid values are `Array` and `String` (the global types).
 * Defaults to return the underlying buffer type.
 * @param {boolean} [options.defaults=false] Also sets default values on the resulting object
 * @returns {Object.<string,*>} JSON object
 */
MessagePrototype.asJSON = function asJSON(options) {
    if (!options)
        options = {};
    var fields = this.$type.fields,
        json   = {};
    var keys;
    if (options.defaults) {
        keys = Object.keys(fields);
    } else
        keys = Object.keys(this);
    for (var i = 0, key; i < keys.length; ++i) {
        var field = fields[key = keys[i]],
            value = this[key];
        if (field) {
            if (field.repeated) {
                if (value && (value.length || options.defaults)) {
                    var array = new Array(value.length);
                    for (var j = 0, l = value.length; j < l; ++j)
                        array[j] = field.jsonConvert(value[j], options);
                    json[key] = array;
                }
            } else
                json[key] = field.jsonConvert(value, options);
        } else if (!options.fieldsOnly)
            json[key] = value;
    }
    return json;
};

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/**
 * Encodes a message of this type.
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decode = function decode(readerOrBuffer) {
    return this.$type.decode(readerOrBuffer);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decodeDelimited = function decodeDelimited(readerOrBuffer) {
    return this.$type.decodeDelimited(readerOrBuffer);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Message|Object} message Message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

},{}],20:[function(require,module,exports){
"use strict";
module.exports = Method;

var ReflectionObject = require(22);
/** @alias Method.prototype */
var MethodPrototype = ReflectionObject.extend(Method);

Method.className = "Method";

var Type = require(31),
    util = require(33);

var _TypeError = util._TypeError;

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object} [requestStream] Whether the request is streamed
 * @param {boolean|Object} [responseStream] Whether the response is streamed
 * @param {Object} [options] Declared options
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }
    if (type && !util.isString(type))
        throw _TypeError("type");
    if (!util.isString(requestType))
        throw _TypeError("requestType");
    if (!util.isString(responseType))
        throw _TypeError("responseType");

    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

    /**
     * Resolved request type.
     * @type {?Type}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {?Type}
     */
    this.resolvedResponseType = null;
}

/**
 * Tests if the specified JSON object describes a service method.
 * @param {Object} json JSON object
 * @returns {boolean} `true` if the object describes a map field
 */
Method.testJSON = function testJSON(json) {
    return Boolean(json && json.requestType !== undefined);
};

/**
 * Constructs a service method from JSON.
 * @param {string} name Method name
 * @param {Object} json JSON object
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options);
};

/**
 * @override
 */
MethodPrototype.toJSON = function toJSON() {
    return {
        type           : this.type !== "rpc" && this.type || undefined,
        requestType    : this.requestType,
        requestStream  : this.requestStream,
        responseType   : this.responseType,
        responseStream : this.responseStream,
        options        : this.options
    };
};

/**
 * @override
 */
MethodPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    var resolved = this.parent.lookup(this.requestType);
    if (!(resolved && resolved instanceof Type))
        throw Error("unresolvable request type: " + this.requestType);
    this.resolvedRequestType = resolved;
    resolved = this.parent.lookup(this.responseType);
    if (!(resolved && resolved instanceof Type))
        throw Error("unresolvable response type: " + this.requestType);
    this.resolvedResponseType = resolved;
    return ReflectionObject.prototype.resolve.call(this);
};

},{"22":22,"31":31,"33":33}],21:[function(require,module,exports){
"use strict";
module.exports = Namespace;

var ReflectionObject = require(22);
/** @alias Namespace.prototype */
var NamespacePrototype = ReflectionObject.extend(Namespace);

Namespace.className = "Namespace";

var Enum    = require(16),
    Field   = require(17),
    util    = require(33);

var Type,    // cyclic
    Service; // cyclic

var nestedTypes, // contains cyclics
    nestedError;
function initNested() {
    if (!Type)
        Type = require(31);
    if (!Service)
        Service = require(29);
    nestedTypes = [ Enum, Type, Service, Field, Namespace ];
    nestedError = "one of " + nestedTypes.map(function(ctor) { return ctor.name; }).join(", ");
}

var _TypeError = util._TypeError;

/**
 * Constructs a new namespace instance.
 * @classdesc Reflected namespace and base class of all reflection objects containing nested objects.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Namespace name
 * @param {Object} [options] Declared options
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {?ReflectionObject[]}
     * @private
     */
    this._nestedArray = null;
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}

util.props(NamespacePrototype, {

    /**
     * Nested objects of this namespace as an array for iteration.
     * @name Namespace#nestedArray
     * @type {ReflectionObject[]}
     * @readonly
     */
    nestedArray: {
        get: function getNestedArray() {
            return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }
    }

});

/**
 * Tests if the specified JSON object describes not another reflection object.
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes not another reflection object
 */
Namespace.testJSON = function testJSON(json) {
    return Boolean(json
        && !json.fields                   // Type
        && !json.values                   // Enum
        && json.id === undefined          // Field, MapField
        && !json.oneof                    // OneOf
        && !json.methods                  // Service
        && json.requestType === undefined // Method
    );
};

/**
 * Constructs a namespace from JSON.
 * @param {string} name Namespace name
 * @param {Object} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * @override
 */
NamespacePrototype.toJSON = function toJSON() {
    return {
        options : this.options,
        nested  : arrayToJSON(this.getNestedArray())
    };
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON();
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Adds nested elements to this namespace from JSON.
 * @param {Object.<string,*>} nestedJson Nested JSON
 * @returns {Namespace} `this`
 */
NamespacePrototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    if (nestedJson) {
        if (!nestedTypes)
            initNested();
        Object.keys(nestedJson).forEach(function(nestedName) {
            var nested = nestedJson[nestedName];
            for (var j = 0; j < nestedTypes.length; ++j)
                if (nestedTypes[j].testJSON(nested))
                    return ns.add(nestedTypes[j].fromJSON(nestedName, nested));
            throw _TypeError("nested." + nestedName, "JSON for " + nestedError);
        });
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
 */
NamespacePrototype.get = function get(name) {
    if (this.nested === undefined) // prevents deopt
        return null;
    return this.nested[name] || null;
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
NamespacePrototype.add = function add(object) {
    if (!nestedTypes)
        initNested();
    if (!object || nestedTypes.indexOf(object.constructor) < 0)
        throw _TypeError("object", nestedError);
    if (object instanceof Field && object.extend === undefined)
        throw _TypeError("object", "an extension field when not part of a type");
    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (!Type)
                Type = require(31);
            if (!Service)
                Service = require(29);
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.getNestedArray();
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);
            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
NamespacePrototype.remove = function remove(object) {
    if (!(object instanceof ReflectionObject))
        throw _TypeError("object", "a ReflectionObject");
    if (object.parent !== this || !this.nested)
        throw Error(object + " is not a member of " + this);
    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;
    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
NamespacePrototype.define = function define(path, json) {
    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path)) {
        json = path;
        path = undefined;
    }
    var ptr = this;
    if (path)
        while (path.length > 0) {
            var part = path.shift();
            if (ptr.nested && ptr.nested[part]) {
                ptr = ptr.nested[part];
                if (!(ptr instanceof Namespace))
                    throw Error("path conflicts with non-namespace objects");
            } else
                ptr.add(ptr = new Namespace(part));
        }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree.
 * @returns {Namespace} `this`
 */
NamespacePrototype.resolveAll = function resolve() {
    var nested = this.getNestedArray(), i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {?ReflectionObject} Looked up object or `null` if none could be found
 */
NamespacePrototype.lookup = function lookup(path, parentAlreadyChecked) {
    if (util.isString(path)) {
        if (!path.length)
            return null;
        path = path.split(".");
    } else if (!path.length)
        return null;
    // Start at root if path is absolute
    if (path[0] === "")
        return this.getRoot().lookup(path.slice(1));
    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found && (path.length === 1 || found instanceof Namespace && (found = found.lookup(path.slice(1), true))))
        return found;
    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path);
};

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
NamespacePrototype.lookupType = function lookupType(path) {
    var found = this.lookup(path);
    if (!Type)
        Type = require(31);
    if (!(found instanceof Type))
        throw Error("no such type");
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
NamespacePrototype.lookupService = function lookupService(path) {
    var found = this.lookup(path);
    if (!Service)
        Service = require(29);
    if (!(found instanceof Service))
        throw Error("no such service");
    return found;
};

},{"16":16,"17":17,"22":22,"29":29,"31":31,"33":33}],22:[function(require,module,exports){
"use strict";
module.exports = ReflectionObject;

var util = require(33);

ReflectionObject.className = "ReflectionObject";
ReflectionObject.extend = util.extend;

var Root; // cyclic

var _TypeError = util._TypeError;

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {
    if (!util.isString(name))
        throw _TypeError("name");
    if (options && !util.isObject(options))
        throw _TypeError("options", "an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {?Namespace}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;
}

/** @alias ReflectionObject.prototype */
var ReflectionObjectPrototype = ReflectionObject.prototype;

util.props(ReflectionObjectPrototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function getRoot() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: ReflectionObjectPrototype.getFullName = function getFullName() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});

/**
 * Converts this reflection object to its JSON representation.
 * @returns {Object} JSON object
 * @abstract
 */
ReflectionObjectPrototype.toJSON = function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObjectPrototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.getRoot();
    if (!Root)
        Root = require(26);
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObjectPrototype.onRemove = function onRemove(parent) {
    var root = parent.getRoot();
    if (!Root)
        Root = require(26);
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    var root = this.getRoot();
    if (!Root)
        Root = require(26);
    if (root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObjectPrototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        Object.keys(options).forEach(function(name) {
            this.setOption(name, options[name], ifNotSet);
        }, this);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */
ReflectionObjectPrototype.toString = function toString() {
    var className = this.constructor.className;
    var fullName = this.getFullName();
    if (fullName.length)
        return className + " " + fullName;
    return className;
};

},{"26":26,"33":33}],23:[function(require,module,exports){
"use strict";
module.exports = OneOf;

var ReflectionObject = require(22);
/** @alias OneOf.prototype */
var OneOfPrototype = ReflectionObject.extend(OneOf);

OneOf.className = "OneOf";

var Field = require(17),
    util  = require(33);

var _TypeError = util._TypeError;

/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object} [fieldNames] Field names
 * @param {Object} [options] Declared options
 */
function OneOf(name, fieldNames, options) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);
    if (fieldNames && !Array.isArray(fieldNames))
        throw _TypeError("fieldNames", "an Array");

    /**
     * Upper cased name for getter/setter calls.
     * @type {string}
     */
    this.ucName = this.name.substring(0, 1).toUpperCase() + this.name.substring(1);

    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */
    this.oneof = fieldNames || []; // toJSON, marker

    /**
     * Fields that belong to this oneof and are possibly not yet added to its parent.
     * @type {Field[]}
     * @private
     */
    this._fieldsArray = [];
}

/**
 * Fields that belong to this oneof as an array for iteration.
 * @name OneOf#fieldsArray
 * @type {Field[]}
 * @readonly
 */
util.prop(OneOfPrototype, "fieldsArray", {
    get: function getFieldsArray() {
        return this._fieldsArray;
    }
});

/**
 * Tests if the specified JSON object describes a oneof.
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes a oneof
 */
OneOf.testJSON = function testJSON(json) {
    return Boolean(json.oneof);
};

/**
 * Constructs a oneof from JSON.
 * @param {string} name Oneof name
 * @param {Object} json JSON object
 * @returns {MapField} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options);
};

/**
 * @override
 */
OneOfPrototype.toJSON = function toJSON() {
    return {
        oneof   : this.oneof,
        options : this.options
    };
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        oneof._fieldsArray.forEach(function(field) {
            if (!field.parent)
                oneof.parent.add(field);
        });
}

/**
 * Adds a field to this oneof.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOfPrototype.add = function add(field) {
    if (!(field instanceof Field))
        throw _TypeError("field", "a Field");
    if (field.parent)
        field.parent.remove(field);
    this.oneof.push(field.name);
    this._fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOfPrototype.remove = function remove(field) {
    if (!(field instanceof Field))
        throw _TypeError("field", "a Field");
    var index = this._fieldsArray.indexOf(field);
    if (index < 0)
        throw Error(field + " is not a member of " + this);
    this._fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);
    if (index > -1)
        this.oneof.splice(index, 1);
    if (field.parent)
        field.parent.remove(field);
    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOfPrototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOfPrototype.onRemove = function onRemove(parent) {
    this._fieldsArray.forEach(function(field) {
        if (field.parent)
            field.parent.remove(field);
    });
    ReflectionObject.prototype.onRemove.call(this, parent);
};

},{"17":17,"22":22,"33":33}],24:[function(require,module,exports){
"use strict";
module.exports = parse;

var tokenize  = require(30),
    Root      = require(26),
    Type      = require(31),
    Field     = require(17),
    MapField  = require(18),
    OneOf     = require(23),
    Enum      = require(16),
    Service   = require(29),
    Method    = require(20),
    types     = require(32),
    util      = require(33);

function isName(token) {
    return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(token);
}

function isTypeRef(token) {
    return /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/.test(token);
}

function isFqTypeRef(token) {
    return /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/.test(token);
}

function lower(token) {
    return token === null ? null : token.toLowerCase();
}

/**
 * Result object returned from {@link parse}.
 * @typedef ParserResult
 * @type {Object}
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @typedef ParseOptions
 * @type {Object}
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @function
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {ParseOptions} [options] Parse options
 * @returns {ParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        root = new Root();
        options = root || {};
    } else if (!options)
        options = {};

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    if (!root)
        root = new Root();

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    function illegal(token, name) {
        var filename = parse.filename;
        parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line() + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (lower(token)) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true":
                return true;
            case "false":
                return false;
        }
        try {
            return parseNumber(token);
        } catch (e) {
            if (acceptTypeRef && isTypeRef(token))
                return token;
            throw illegal(token, "value");
        }
    }

    function readRange() {
        var start = parseId(next());
        var end = start;
        if (skip("to", true))
            end = parseId(next());
        skip(";");
        return [ start, end ];
    }

    function parseNumber(token) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "inf": return sign * Infinity;
            case "nan": return NaN;
            case "0": return 0;
        }
        if (/^[1-9][0-9]*$/.test(token))
            return sign * parseInt(token, 10);
        if (/^0[x][0-9a-f]+$/.test(tokenLower))
            return sign * parseInt(token, 16);
        if (/^0[0-7]+$/.test(token))
            return sign * parseInt(token, 8);
        if (/^(?!e)[0-9]*(?:\.[0-9]*)?(?:[e][+-]?[0-9]+)?$/.test(tokenLower))
            return sign * parseFloat(token);
        throw illegal(token, "number");
    }

    function parseId(token, acceptNegative) {
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "max": return 0x1FFFFFFF;
            case "0": return 0;
        }
        if (token.charAt(0) === "-" && !acceptNegative)
            throw illegal(token, "id");
        if (/^-?[1-9][0-9]*$/.test(token))
            return parseInt(token, 10);
        if (/^-?0[x][0-9a-f]+$/.test(tokenLower))
            return parseInt(token, 16);
        if (/^-?0[0-7]+$/.test(token))
            return parseInt(token, 8);
        throw illegal(token, "id");
    }

    function parsePackage() {
        if (pkg !== undefined)
            throw illegal("package");
        pkg = next();
        if (!isTypeRef(pkg))
            throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = lower(readString());
        isProto3 = syntax === "proto3";
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");
        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function parseType(parent, token) {
        var name = next();
        if (!isName(name))
            throw illegal(name, "type name");
        var type = new Type(name);
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                if (parseCommon(type, token))
                    continue;
                switch (tokenLower) {

                    case "map":
                        parseMapField(type, tokenLower);
                        break;

                    case "required":
                    case "optional":
                    case "repeated":
                        parseField(type, tokenLower);
                        break;

                    case "oneof":
                        parseOneOf(type, tokenLower);
                        break;

                    case "extensions":
                        (type.extensions || (type.extensions = [])).push(readRange(type, tokenLower));
                        break;

                    case "reserved":
                        (type.reserved || (type.reserved = [])).push(readRange(type, tokenLower));
                        break;
                        
                    default:
                        if (!isProto3 || !isTypeRef(token))
                            throw illegal(token);
                        push(token);
                        parseField(type, "optional");
                        break;
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (lower(type) === "group") {
            parseGroup(parent, rule);
            return;
        }
        if (!isTypeRef(type))
            throw illegal(type, "type");
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var id = parseId(next());
        var field = parseInlineOptions(new Field(name, id, type, rule, extend));
        if (field.repeated)
            field.setOption("packed", isProto3, /* ifNotSet */ true);
        parent.add(field);
    }

    function parseGroup(parent, rule) {
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        skip("{");
        while ((token = next()) !== "}") {
            switch (token = lower(token)) {
                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;
                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        }
        skip(";", true);
        parent.add(type).add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        if (!isTypeRef(valueType))
            throw illegal(valueType, "type");
        skip(">");
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var id = parseId(next());
        var field = parseInlineOptions(new MapField(name, id, keyType, valueType));
        parent.add(field);
    }

    function parseOneOf(parent, token) {
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        name = applyCase(name);
        var oneof = new OneOf(name);
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                if (token === "option") {
                    parseOption(oneof, token);
                    skip(";");
                } else {
                    push(token);
                    parseField(oneof, "optional");
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(oneof);
    }

    function parseEnum(parent, token) {
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        var values = {};
        var enm = new Enum(name, values);
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                if (lower(token) === "option") {
                    parseOption(enm, token);
                    skip(";");
                } else
                    parseEnumField(enm, token);
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(enm);
    }

    function parseEnumField(parent, token) {
        if (!isName(token))
            throw illegal(token, "name");
        var name = token;
        skip("=");
        var value = parseId(next(), true);
        parent.values[name] = value;
        parseInlineOptions({}); // skips enum value options
    }

    function parseOption(parent, token) {
        var custom = skip("(", true);
        var name = next();
        if (!isTypeRef(name))
            throw illegal(name, "name");
        if (custom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (!isFqTypeRef(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                if (!isName(token))
                    throw illegal(token, "name");
                name = name + "." + token;
                if (skip(":", true))
                    setOption(parent, name, readValue(true));
                else
                    parseOptionValue(parent, name);
            }
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
        else
            parent[name] = value;
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        skip(";");
        return parent;
    }

    function parseService(parent, token) {
        token = next();
        if (!isName(token))
            throw illegal(token, "service name");
        var name = token;
        var service = new Service(name);
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(service, tokenLower);
                        skip(";");
                        break;
                    case "rpc":
                        parseMethod(service, tokenLower);
                        break;
                    default:
                        throw illegal(token);
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;
        var name = next();
        if (!isName(name))
            throw illegal(name, "name");
        var requestType, requestStream,
            responseType, responseStream;
        skip("(");
        var st;
        if (skip(st = "stream", true))
            requestStream = true;
        if (!isTypeRef(token = next()))
            throw illegal(token);
        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip(st, true))
            responseStream = true;
        if (!isTypeRef(token = next()))
            throw illegal(token);
        responseType = token;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(method, tokenLower);
                        skip(";");
                        break;
                    default:
                        throw illegal(token);
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(method);
    }

    function parseExtension(parent, token) {
        var reference = next();
        if (!isTypeRef(reference))
            throw illegal(reference, "reference");
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "required":
                    case "repeated":
                    case "optional":
                        parseField(parent, tokenLower, reference);
                        break;
                    default:
                        if (!isProto3 || !isTypeRef(token))
                            throw illegal(token);
                        push(token);
                        parseField(parent, "optional", reference);
                        break;
                }
            }
            skip(";", true);
        } else
            skip(";");
    }

    var token;
    while ((token = next()) !== null) {
        var tokenLower = lower(token);
        switch (tokenLower) {

            case "package":
                if (!head)
                    throw illegal(token);
                parsePackage();
                break;

            case "import":
                if (!head)
                    throw illegal(token);
                parseImport();
                break;

            case "syntax":
                if (!head)
                    throw illegal(token);
                parseSyntax();
                break;

            case "option":
                if (!head)
                    throw illegal(token);
                parseOption(ptr, token);
                skip(";");
                break;

            default:
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {ParseOptions} [options] Parse options
 * @returns {ParserResult} Parser result
 * @variation 2
 */

},{"16":16,"17":17,"18":18,"20":20,"23":23,"26":26,"29":29,"30":30,"31":31,"32":32,"33":33}],25:[function(require,module,exports){
"use strict";
module.exports = Reader;

Reader.BufferReader = BufferReader;

var util      = require(35),
    ieee754   = require(1);
var LongBits  = util.LongBits,
    utf8      = util.utf8;
var ArrayImpl = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {
    
    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

/**
 * Creates a new reader using the specified buffer.
 * @param {Uint8Array} buffer Buffer to read from
 * @returns {BufferReader|Reader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 */
Reader.create = function create(buffer) {
    return new (util.Buffer ? BufferReader : Reader)(buffer);
};

/** @alias Reader.prototype */
var ReaderPrototype = Reader.prototype;

ReaderPrototype._slice = ArrayImpl.prototype.subarray || ArrayImpl.prototype.slice;

var read_uint32 = 
/**
 * Reads a varint as an unsigned 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.uint32 = function read_uint32() {
    // FIXME: tends to soft-deopt with "Insufficient type feedback for generic named access", which
    // is not a problem, but with --trace-deopt, node v4-v7 always crashes when the above happens.
    var value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;
    if ((this.pos += 5) > this.len) {
        this.pos = this.len;
        throw indexOutOfRange(this, 10);
    }
    return value;
};

// See comment above. While unnecessary code, this prevents crashing with --trace-deopt (node 6.9.1).
read_uint32.call({
    buf: [255,255,255,255,15],
    pos: 0,
    len: 5
});

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0),
        i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (i = 0; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
    } else {
        for (i = 0; i < 4; ++i) {
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        if (this.pos >= this.len)
            throw indexOutOfRange(this);
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (i = 0; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (i = 0; i < 5; ++i) {
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    throw Error("invalid varint encoding");
}

function read_int64_long() {
    return readLongVarint.call(this).toLong();
}

function read_int64_number() {
    return readLongVarint.call(this).toNumber();
}

function read_uint64_long() {
    return readLongVarint.call(this).toLong(true);
}

function read_uint64_number() {
    return readLongVarint.call(this).toNumber(true);
}

function read_sint64_long() {
    return readLongVarint.call(this).zzDecode().toLong();
}

function read_sint64_number() {
    return readLongVarint.call(this).zzDecode().toNumber();
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
ReaderPrototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32(buf, end) {
    return buf[end - 4]
         | buf[end - 3] << 8
         | buf[end - 2] << 16
         | buf[end - 1] << 24;
}

/**
 * Reads fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.fixed32 = function read_fixed32() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    return readFixed32(this.buf, this.pos += 4);
};

/**
 * Reads zig-zag encoded fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.sfixed32 = function read_sfixed32() {
    var value = this.fixed32();
    return value >>> 1 ^ -(value & 1);
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
    return new LongBits(readFixed32(this.buf, this.pos += 4), readFixed32(this.buf, this.pos += 4));
}

function read_fixed64_long() {
    return readFixed64.call(this).toLong(true);
}

function read_fixed64_number() {
    return readFixed64.call(this).toNumber(true);
}

function read_sfixed64_long() {
    return readFixed64.call(this).zzDecode().toLong();
}

function read_sfixed64_number() {
    return readFixed64.call(this).zzDecode().toNumber();
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long|number} Value read
 */

var readFloat = typeof Float32Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f32 = new Float32Array(1),
            f8b = new Uint8Array(f32.buffer);
        f32[0] = -0;
        return f8b[3] // already le?
            ? function readFloat_f32(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                return f32[0];
            }
            : function readFloat_f32_le(buf, pos) {
                f8b[3] = buf[pos    ];
                f8b[2] = buf[pos + 1];
                f8b[1] = buf[pos + 2];
                f8b[0] = buf[pos + 3];
                return f32[0];
            };
    })()
    : function readFloat_ieee754(buf, pos) {
        return ieee754.read(buf, pos, false, 23, 4);
    };

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.float = function read_float() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    var value = readFloat(this.buf, this.pos);
    this.pos += 4;
    return value;
};

var readDouble = typeof Float64Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f64 = new Float64Array(1),
            f8b = new Uint8Array(f64.buffer);
        f64[0] = -0;
        return f8b[7] // already le?
            ? function readDouble_f64(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                f8b[4] = buf[pos + 4];
                f8b[5] = buf[pos + 5];
                f8b[6] = buf[pos + 6];
                f8b[7] = buf[pos + 7];
                return f64[0];
            }
            : function readDouble_f64_le(buf, pos) {
                f8b[7] = buf[pos    ];
                f8b[6] = buf[pos + 1];
                f8b[5] = buf[pos + 2];
                f8b[4] = buf[pos + 3];
                f8b[3] = buf[pos + 4];
                f8b[2] = buf[pos + 5];
                f8b[1] = buf[pos + 6];
                f8b[0] = buf[pos + 7];
                return f64[0];
            };
    })()
    : function readDouble_ieee754(buf, pos) {
        return ieee754.read(buf, pos, false, 52, 8);
    };

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.double = function read_double() {
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
    var value = readDouble(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
ReaderPrototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;
    if (end > this.len)
        throw indexOutOfRange(this, length);
    this.pos += length;
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
ReaderPrototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
ReaderPrototype.skip = function skip(length) {
    if (length === undefined) {
        do {
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    } else {
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
ReaderPrototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                wireType = this.uint32() & 7;
                if (wireType === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;
        default:
            throw Error("invalid wire type: " + wireType);
    }
    return this;
};

/**
 * Resets this instance and frees all resources.
 * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
 * @returns {Reader} `this`
 */
ReaderPrototype.reset = function reset(buffer) {
    if (buffer) {
        this.buf = buffer;
        this.len = buffer.length;
    } else {
        this.buf = null; // makes it throw
        this.len = 0;
    }
    this.pos = 0;
    return this;
};

/**
 * Finishes the current sequence of read operations, frees all resources and returns the remaining buffer.
 * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
 * @returns {Uint8Array} Finished buffer
 */
ReaderPrototype.finish = function finish(buffer) {
    var remain = this.pos
        ? this._slice.call(this.buf, this.pos)
        : this.buf;
    this.reset(buffer);
    return remain;
};

// One time function to initialize BufferReader with the now-known buffer implementation's slice method
var initBufferReader = function() {
    var Buffer = util.Buffer;
    if (!Buffer)
        throw Error("Buffer is not supported");
    BufferReaderPrototype._slice = Buffer.prototype.slice;
    readStringBuffer = Buffer.prototype.utf8Slice // around forever, but not present in browser buffer
        ? readStringBuffer_utf8Slice
        : readStringBuffer_toString;
    initBufferReader = false;
};

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    if (initBufferReader)
        initBufferReader();
    Reader.call(this, buffer);
}

/** @alias BufferReader.prototype */
var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);

BufferReaderPrototype.constructor = BufferReader;

if (typeof Float32Array === "undefined") // f32 is faster (node 6.9.1)
/**
 * @override
 */
BufferReaderPrototype.float = function read_float_buffer() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    var value = this.buf.readFloatLE(this.pos, true);
    this.pos += 4;
    return value;
};

if (typeof Float64Array === "undefined") // f64 is faster (node 6.9.1)
/**
 * @override
 */
BufferReaderPrototype.double = function read_double_buffer() {
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
    var value = this.buf.readDoubleLE(this.pos, true);
    this.pos += 8;
    return value;
};

var readStringBuffer;

function readStringBuffer_utf8Slice(buf, start, end) {
    return buf.utf8Slice(start, end); // fastest
}

function readStringBuffer_toString(buf, start, end) {
    return buf.toString("utf8", start, end); // 2nd, again assertions
}

/**
 * @override
 */
BufferReaderPrototype.string = function read_string_buffer() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;
    if (end > this.len)
        throw indexOutOfRange(this, length);
    this.pos += length;
    return readStringBuffer(this.buf, start, end);
};

/**
 * @override
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};

function configure() {
    if (util.Long) {
        ReaderPrototype.int64 = read_int64_long;
        ReaderPrototype.uint64 = read_uint64_long;
        ReaderPrototype.sint64 = read_sint64_long;
        ReaderPrototype.fixed64 = read_fixed64_long;
        ReaderPrototype.sfixed64 = read_sfixed64_long;
    } else {
        ReaderPrototype.int64 = read_int64_number;
        ReaderPrototype.uint64 = read_uint64_number;
        ReaderPrototype.sint64 = read_sint64_number;
        ReaderPrototype.fixed64 = read_fixed64_number;
        ReaderPrototype.sfixed64 = read_sfixed64_number;
    }
}

Reader._configure = configure;

configure();

},{"1":1,"35":35}],26:[function(require,module,exports){
"use strict";
module.exports = Root;

var Namespace = require(21);
/** @alias Root.prototype */
var RootPrototype = Namespace.extend(Root);

Root.className = "Root";

var Field  = require(17),
    util   = require(33),
    common = require(13);

var parse; // cyclic

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends Namespace
 * @constructor
 * @param {Object} [options] Top level options
 */
function Root(options) {
    Namespace.call(this, "", options);

    /**
     * Deferred extension fields.
     * @type {Field[]}
     */
    this.deferred = [];

    /**
     * Resolved file names of loaded files. 
     * @type {string[]}
     */
    this.files = [];
}

/**
 * Loads a JSON definition into a root namespace.
 * @param {*} json JSON definition
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */
Root.fromJSON = function fromJSON(json, root) {
    if (!root)
        root = new Root();
    return root.setOptions(json.options).addJSON(json.nested);
};

/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string} Resolved path to `target`
 */
RootPrototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
function SYNC() {} // eslint-disable-line no-empty-function

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {ParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
RootPrototype.load = function load(filename, options, callback) {
    if (!parse)
        parse = require(24);
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback)
        return util.asPromise(load, self, filename);

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        cb(err, root);
    }

    var sync = callback === SYNC; // undocumented

    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{")
                source = JSON.parse(source);
            if (!util.isString(source))
                self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options);
                if (parsed.imports)
                    parsed.imports.forEach(function(name) {
                        fetch(self.resolvePath(filename, name));
                    });
                if (parsed.weakImports)
                    parsed.weakImports.forEach(function(name) {
                        fetch(self.resolvePath(filename, name), true);
                    });
            }
        } catch (err) {
            finish(err);
            return;
        }
        if (!sync && !queued)
            finish(null, self);
    }

    // Fetches a single file
    function fetch(filename, weak) {

        // Strip path if this file references a bundled definition
        var idx = filename.indexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common)
                filename = altname;
        }

        // Skip if already loaded
        if (self.files.indexOf(filename) > -1)
            return;
        self.files.push(filename);

        // Shortcut bundled definitions
        if (filename in common) {
            if (sync)
                process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }

        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak)
                    finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            util.fetch(filename, function(err, source) {
                --queued;
                if (!callback)
                    return; // terminated meanwhile
                if (err) {
                    if (!weak)
                        finish(err);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename))
        filename = [ filename ];
    filename.forEach(function(filename) {
        fetch(self.resolvePath("", filename));
    });

    if (sync)
        return self;
    if (!queued)
        finish(null, self);
    return undefined;
};
// function load(filename:string, options:ParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @name Root#load
 * @function
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {ParseOptions} [options] Parse options
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:ParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
RootPrototype.loadSync = function loadSync(filename) {
    return this.load(filename, SYNC);
};

/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function handleExtension(field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.getFullName(), field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
RootPrototype._handleAdd = function handleAdd(object) {
    // Try to handle any deferred extensions
    var newDeferred = this.deferred.slice();
    this.deferred = []; // because the loop calls handleAdd
    var i = 0;
    while (i < newDeferred.length)
        if (handleExtension(newDeferred[i]))
            newDeferred.splice(i, 1);
        else
            ++i;
    this.deferred = newDeferred;
    // Handle new declaring extension fields without a sister field yet
    if (object instanceof Field && object.extend !== undefined && !object.extensionField && !handleExtension(object) && this.deferred.indexOf(object) < 0)
        this.deferred.push(object);
    else if (object instanceof Namespace) {
        var nested = object.getNestedArray();
        for (i = 0; i < nested.length; ++i) // recurse into the namespace
            this._handleAdd(nested[i]);
    }
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
RootPrototype._handleRemove = function handleRemove(object) {
    if (object instanceof Field) {
        // If a deferred declaring extension field, cancel the extension
        if (object.extend !== undefined && !object.extensionField) {
            var index = this.deferred.indexOf(object);
            if (index > -1)
                this.deferred.splice(index, 1);
        }
        // If a declaring extension field with a sister field, remove its sister field
        if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
        }
    } else if (object instanceof Namespace) {
        var nested = object.getNestedArray();
        for (var i = 0; i < nested.length; ++i) // recurse into the namespace
            this._handleRemove(nested[i]);
    }
};

},{"13":13,"17":17,"21":21,"24":24,"33":33}],27:[function(require,module,exports){
"use strict";

/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

rpc.Service = require(28);

},{"28":28}],28:[function(require,module,exports){
"use strict";
module.exports = Service;

var util         = require(33);
var EventEmitter = util.EventEmitter;

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @memberof rpc
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 */
function Service(rpcImpl) {
    EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {?RPCImpl}
     */
    this.$rpc = rpcImpl;
}

/** @alias rpc.Service.prototype */
var ServicePrototype = Service.prototype = Object.create(EventEmitter.prototype);
ServicePrototype.constructor = Service;

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
ServicePrototype.end = function end(endedByRPC) {
    if (this.$rpc) {
        if (!endedByRPC) // signal end to rpcImpl
            this.$rpc(null, null, null);
        this.$rpc = null;
        this.emit("end").off();
    }
    return this;
};

},{"33":33}],29:[function(require,module,exports){
"use strict";
module.exports = Service;

var Namespace = require(21);
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Service.prototype */
var ServicePrototype = Namespace.extend(Service);

Service.className = "Service";

var Method = require(20),
    util   = require(33),
    rpc    = require(27);

/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends Namespace
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {?Method[]}
     * @private
     */
    this._methodsArray = null;
}

util.props(ServicePrototype, {

    /**
     * Methods of this service as an array for iteration.
     * @name Service#methodsArray
     * @type {Method[]}
     * @readonly
     */
    methodsArray: {
        get: function getMethodsArray() {
            return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
    }

});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * Tests if the specified JSON object describes a service.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a service
 */
Service.testJSON = function testJSON(json) {
    return Boolean(json && json.methods);
};

/**
 * Constructs a service from JSON.
 * @param {string} name Service name
 * @param {Object} json JSON object
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    if (json.methods)
        Object.keys(json.methods).forEach(function(methodName) {
            service.add(Method.fromJSON(methodName, json.methods[methodName]));
        });
    return service;
};

/**
 * @override
 */
ServicePrototype.toJSON = function toJSON() {
    var inherited = NamespacePrototype.toJSON.call(this);
    return {
        options : inherited && inherited.options || undefined,
        methods : Namespace.arrayToJSON(this.getMethodsArray()) || {},
        nested  : inherited && inherited.nested || undefined
    };
};

/**
 * @override
 */
ServicePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.methods[name] || null;
};

/**
 * @override
 */
ServicePrototype.resolveAll = function resolve() {
    var methods = this.getMethodsArray();
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
ServicePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return NamespacePrototype.add.call(this, object);
};

/**
 * @override
 */
ServicePrototype.remove = function remove(object) {
    if (object instanceof Method) {
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method} method Reflected method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCCallback} callback Callback function
 * @returns {undefined}
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {Uint8Array} [responseData] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {function(Method, Uint8Array, function)} rpcImpl RPC implementation ({@link RPCImpl|see})
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} Runtime RPC service. Useful where requests and/or responses are streamed.
 */
ServicePrototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl);
    this.getMethodsArray().forEach(function(method) {
        rpcService[method.name.substring(0, 1).toLowerCase() + method.name.substring(1)] = function callVirtual(request, /* optional */ callback) {
            if (!rpcService.$rpc) // already ended?
                return;
            if (!request)
                throw util._TypeError("request", "not null");
            method.resolve();
            var requestData;
            try {
                requestData = (requestDelimited ? method.resolvedRequestType.encodeDelimited(request) : method.resolvedRequestType.encode(request)).finish();
            } catch (err) {
                (typeof setImmediate === "function" ? setImmediate : setTimeout)(function() { callback(err); });
                return;
            }
            // Calls the custom RPC implementation with the reflected method and binary request data
            // and expects the rpc implementation to call its callback with the binary response data.
            rpcImpl(method, requestData, function(err, responseData) {
                if (err) {
                    rpcService.emit("error", err, method);
                    return callback ? callback(err) : undefined;
                }
                if (responseData === null) {
                    rpcService.end(/* endedByRPC */ true);
                    return undefined;
                }
                var response;
                try {
                    response = responseDelimited ? method.resolvedResponseType.decodeDelimited(responseData) : method.resolvedResponseType.decode(responseData);
                } catch (err2) {
                    rpcService.emit("error", err2, method);
                    return callback ? callback("error", err2) : undefined;
                }
                rpcService.emit("data", response, method);
                return callback ? callback(null, response) : undefined;
            });
        };
    });
    return rpcService;
};

},{"20":20,"21":21,"27":27,"33":33}],30:[function(require,module,exports){
"use strict";
module.exports = tokenize;

var delimRe        = /[\s{}=;:[\],'"()<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

function unescape(str) {
    return str.replace(/\\(.?)/g, function($0, $1) {
        switch ($1) {
            case "\\":
            case "":
                return $1;
            case "0":
                return "\u0000";
            default:
                return $1;
        }
    });
}

/**
 * Handle object returned from {@link tokenize}.
 * @typedef {Object} TokenizerHandle
 * @property {function():number} line Gets the current line number
 * @property {function():?string} next Gets the next token and advances (`null` on eof)
 * @property {function():?string} peek Peeks for the next token (`null` on eof)
 * @property {function(string)} push Pushes a token back to the stack
 * @property {function(string, boolean=):boolean} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 */
/**/

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @returns {TokenizerHandle} Tokenizer handle
 */
function tokenize(source) {
    /* eslint-disable callback-return */
    source = source.toString();
    
    var offset = 0,
        length = source.length,
        line = 1;
    
    var stack = [];

    var stringDelim = null;

    /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */
    function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }

    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
    function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }

    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
    function charAt(pos) {
        return source.charAt(pos);
    }

    /**
     * Obtains the next token.
     * @returns {?string} Next token or `null` on eof
     * @inner
     */
    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (/\s/.test(curr = charAt(offset))) {
                if (curr === "\n")
                    ++line;
                if (++offset === length)
                    return null;
            }
            if (charAt(offset) === "/") {
                if (++offset === length)
                    throw illegal("comment");
                if (charAt(offset) === "/") { // Line
                    while (charAt(++offset) !== "\n")
                        if (offset === length)
                            return null;
                    ++offset;
                    ++line;
                    repeat = true;
                } else if ((curr = charAt(offset)) === "*") { /* Block */
                    do {
                        if (curr === "\n")
                            ++line;
                        if (++offset === length)
                            return null;
                        prev = curr;
                        curr = charAt(offset);
                    } while (prev !== "*" || curr !== "/");
                    ++offset;
                    repeat = true;
                } else
                    return "/";
            }
        } while (repeat);

        if (offset === length)
            return null;
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === "\"" || token === "'")
            stringDelim = token;
        return token;
    }

    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
    function push(token) {
        stack.push(token);
    }

    /**
     * Peeks for the next token.
     * @returns {?string} Token or `null` on eof
     * @inner
     */
    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
    function skip(expected, optional) {
        var actual = peek(),
            equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }

    return {
        line: function() { return line; },
        next: next,
        peek: peek,
        push: push,
        skip: skip
    };
    /* eslint-enable callback-return */
}
},{}],31:[function(require,module,exports){
"use strict";
module.exports = Type; 

var Namespace = require(21);
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Type.prototype */
var TypePrototype = Namespace.extend(Type);

Type.className = "Type";

var Enum      = require(16),
    OneOf     = require(23),
    Field     = require(17),
    Service   = require(29),
    Class     = require(12),
    Message   = require(19),
    Reader    = require(25),
    Writer    = require(37),
    util      = require(33);

var encode, // might become cyclic
    decode, // might become cyclic
    verify; // cyclic

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends Namespace
 * @constructor
 * @param {string} name Message name
 * @param {Object} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {number[][]}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {?Object.<number,Field>}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {?Field[]}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached repeated fields as an array.
     * @type {?Field[]}
     * @private
     */
    this._repeatedFieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {?OneOf[]}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {*}
     * @private
     */
    this._ctor = null;
}

util.props(TypePrototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function getFieldsById() {
            if (this._fieldsById)
                return this._fieldsById;
            this._fieldsById = {};
            var names = Object.keys(this.fields);
            for (var i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);
                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function getFieldsArray() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Repeated fields of this message as an array for iteration.
     * @name Type#repeatedFieldsArray
     * @type {Field[]}
     * @readonly
     */
    repeatedFieldsArray: {
        get: function getRepeatedFieldsArray() {
            return this._repeatedFieldsArray || (this._repeatedFieldsArray = this.getFieldsArray().filter(function(field) { return field.repeated; }));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function getOneofsArray() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * @name Type#ctor
     * @type {Class}
     */
    ctor: {
        get: function getCtor() {
            return this._ctor || (this._ctor = Class.create(this).constructor);
        },
        set: function setCtor(ctor) {
            if (ctor && !(ctor.prototype instanceof Message))
                throw util._TypeError("ctor", "a Message constructor");
            this._ctor = ctor;
        }
    }
});

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = type._ctor = null;
    delete type.encode;
    delete type.decode;
    return type;
}

/**
 * Tests if the specified JSON object describes a message type.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes a message type
 */
Type.testJSON = function testJSON(json) {
    return Boolean(json && json.fields);
};

var nestedTypes = [ Enum, Type, Field, Service ];

/**
 * Creates a type from JSON.
 * @param {string} name Message name
 * @param {Object} json JSON object
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    if (json.fields)
        Object.keys(json.fields).forEach(function(fieldName) {
            type.add(Field.fromJSON(fieldName, json.fields[fieldName]));
        });
    if (json.oneofs)
        Object.keys(json.oneofs).forEach(function(oneOfName) {
            type.add(OneOf.fromJSON(oneOfName, json.oneofs[oneOfName]));
        });
    if (json.nested)
        Object.keys(json.nested).forEach(function(nestedName) {
            var nested = json.nested[nestedName];
            for (var i = 0; i < nestedTypes.length; ++i) {
                if (nestedTypes[i].testJSON(nested)) {
                    type.add(nestedTypes[i].fromJSON(nestedName, nested));
                    return;
                }
            }
            throw Error("invalid nested object in " + type + ": " + nestedName);
        });
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    return type;
};

/**
 * @override
 */
TypePrototype.toJSON = function toJSON() {
    var inherited = NamespacePrototype.toJSON.call(this);
    return {
        options    : inherited && inherited.options || undefined,
        oneofs     : Namespace.arrayToJSON(this.getOneofsArray()),
        fields     : Namespace.arrayToJSON(this.getFieldsArray().filter(function(obj) { return !obj.declaringField; })) || {},
        extensions : this.extensions && this.extensions.length ? this.extensions : undefined,
        reserved   : this.reserved && this.reserved.length ? this.reserved : undefined,
        group      : this.group || undefined,
        nested     : inherited && inherited.nested || undefined
    };
};

/**
 * @override
 */
TypePrototype.resolveAll = function resolve() {
    var fields = this.getFieldsArray(), i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.getOneofsArray(); i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
TypePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.fields && this.fields[name] || this.oneofs && this.oneofs[name] || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
TypePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.
        if (this.getFieldsById()[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return NamespacePrototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
TypePrototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.
        if (this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.message = null;
        return clearCache(this);
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object|*} [properties] Properties to set
 * @returns {Message} Runtime message
 */
TypePrototype.create = function create(properties) {
    return new (this.getCtor())(properties);
};

/**
 * Sets up {@link Type#encode}, {@link Type#decode} and {@link Type#verify}.
 * @returns {Type} `this`
 */
TypePrototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).
    if (!encode) {
        encode = require(15);
        decode = require(14);
        verify = require(36);
    }
    this.encode = util.codegen.supported
        ? encode.generate(this).eof(this.getFullName() + "$encode", {
              Writer : Writer,
              types  : this.getFieldsArray().map(function(fld) { return fld.resolvedType; }),
              util   : util
          })
        : encode;
    this.decode = util.codegen.supported
        ? decode.generate(this).eof(this.getFullName() + "$decode", {
              Reader : Reader,
              types  : this.getFieldsArray().map(function(fld) { return fld.resolvedType; }),
              util   : util
          })
        : decode;
    this.verify = util.codegen.supported
        ? verify.generate(this).eof(this.getFullName() + "$verify", {
              types : this.getFieldsArray().map(function(fld) { return fld.resolvedType; }),
              util  : util
          })
        : verify;
    return this;
};

/**
 * Encodes a message of this type.
 * @param {Message|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint.
 * @param {Message|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message} Decoded message
 */
TypePrototype.decode = function decode_setup(readerOrBuffer, length) {
    return this.setup().decode(readerOrBuffer, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
 * @returns {Message} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer) {
    readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader.create(readerOrBuffer);
    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Message|Object} message Message to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
TypePrototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

},{"12":12,"14":14,"15":15,"16":16,"17":17,"19":19,"21":21,"23":23,"25":25,"29":29,"33":33,"36":36,"37":37}],32:[function(require,module,exports){
"use strict";

/**
 * Common type constants.
 * @namespace
 */
var types = exports;

var util = require(33);

var s = [
    "double",   // 0
    "float",    // 1
    "int32",    // 2
    "uint32",   // 3
    "sint32",   // 4
    "fixed32",  // 5
    "sfixed32", // 6
    "int64",    // 7
    "uint64",   // 8
    "sint64",   // 9
    "fixed64",  // 10
    "sfixed64", // 11
    "bool",     // 12
    "string",   // 13
    "bytes",    // 14
    "message"   // 15
];

function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while (i < values.length) o[s[i + offset]] = values[i++];
    return o;
}

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */
types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {Message} message=null Message default
 */
types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */
types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */
types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */
types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);

},{"33":33}],33:[function(require,module,exports){
"use strict";

/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = require(35);

util.asPromise    = require(2);
util.codegen      = require(4);
util.EventEmitter = require(5);
util.extend       = require(6);
util.fetch        = require(7);
util.fs           = require(8);
util.path         = require(9);

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (!object)
        return [];
    var names = Object.keys(object),
        length = names.length;
    var array = new Array(length);
    for (var i = 0; i < length; ++i)
        array[i] = object[names[i]];
    return array;
};

/**
 * Creates a type error.
 * @param {string} name Argument name
 * @param {string} [description="a string"] Expected argument descripotion
 * @returns {TypeError} Created type error
 * @private
 */
util._TypeError = function(name, description) {
    return TypeError(name + " must be " + (description || "a string"));
};

/**
 * Merges the properties of the source object into the destination object.
 * @param {Object} dst Destination object
 * @param {Object} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object} Destination object
 */
util.merge = function merge(dst, src, ifNotSet) {
    if (src) {
        var keys = Object.keys(src);
        for (var i = 0; i < keys.length; ++i)
            if (dst[keys[i]] === undefined || !ifNotSet)
                dst[keys[i]] = src[keys[i]];
    }
    return dst;
};

/**
 * Returns a safe property accessor for the specified properly name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    return "[\"" + prop.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"]";
};

/**
 * Converts a string to camel case notation.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0,1)
         + str.substring(1)
               .replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Converts a string to underscore notation.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.underScore = function underScore(str) {
    return str.substring(0,1)
         + str.substring(1)
               .replace(/([A-Z])(?=[a-z]|$)/g, function($0, $1) { return "_" + $1.toLowerCase(); });
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

/**
 * Converts the second character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number} [size=0] Buffer size
 * @returns {Uint8Array} Buffer
 */
util.newBuffer = function newBuffer(size) {
    size = size || 0;
    return util.Buffer
        ? util.Buffer.allocUnsafe ? util.Buffer.allocUnsafe(size) : new util.Buffer(size)
        : new (typeof Uint8Array !== "undefined" ? Uint8Array : Array)(size);
};

},{"2":2,"35":35,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],34:[function(require,module,exports){
"use strict";

module.exports = LongBits;

var util = require(35);

/**
 * Any compatible Long instance.
 * @typedef Long
 * @type {Object}
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low bits
 * @param {number} hi High bits
 */
function LongBits(lo, hi) { // make sure to always call this with unsigned 32bits for proper optimization

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi;
}

/** @alias util.LongBits.prototype */
var LongBitsPrototype = LongBits.prototype;

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign  = value < 0;
        value = Math.abs(value);
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (typeof value === "string") {
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBitsPrototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        this.lo = ~this.lo + 1 >>> 0;
        this.hi = ~this.hi     >>> 0;
        if (!this.lo)
            this.hi = this.hi + 1 >>> 0;
        return -(this.lo + this.hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBitsPrototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo, this.hi, unsigned)
        : { low: this.lo, high: this.hi, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBitsPrototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24 & 255,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24 & 255
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBitsPrototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBitsPrototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBitsPrototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    if (part2 === 0) {
        if (part1 === 0)
            return part0 < 1 << 14
                ? part0 < 1 << 7 ? 1 : 2
                : part0 < 1 << 21 ? 3 : 4;
        return part1 < 1 << 14
            ? part1 < 1 << 7 ? 5 : 6
            : part1 < 1 << 21 ? 7 : 8;
    }
    return part2 < 1 << 7 ? 9 : 10;
};

},{"35":35}],35:[function(require,module,exports){
(function (global){
"use strict";

var util = exports;

var LongBits =
util.LongBits = require(34);
util.base64   = require(3);
util.utf8     = require(11);
util.pool     = require(10);

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
var isNode = util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Optional buffer class to use.
 * If you assign any compatible buffer implementation to this property, the library will use it.
 * @type {*}
 */
util.Buffer = null;

if (isNode)
    try { util.Buffer = require("buffer").Buffer; } catch (e) {} // eslint-disable-line no-empty

/**
 * Optional Long class to use.
 * If you assign any compatible long implementation to this property, the library will use it.
 * @type {*}
 */
util.Long = global.dcodeIO && global.dcodeIO.Long || null;

if (!util.Long && isNode)
    try { util.Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === "object");
};

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? LongBits.from(value).toHash()
        : "\0\0\0\0\0\0\0\0";
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Tests if two possibly long values are not equal.
 * @param {number|Long} a First value
 * @param {number|Long} b Second value
 * @returns {boolean} `true` if not equal
 * @deprecated
 * @see Use {@link util.longNe} instead
 */
util.longNeq = function longNeq(a, b) {
    return typeof a === "number"
         ? typeof b === "number"
            ? a !== b
            : (a = LongBits.fromNumber(a)).lo !== b.low || a.hi !== b.high
         : typeof b === "number"
            ? (b = LongBits.fromNumber(b)).lo !== a.low || b.hi !== a.high
            : a.low !== b.low || a.high !== b.high;
};

/**
 * Tests if a possibily long value equals the specified low and high bits.
 * @param {number|string|Long} val Value to test
 * @param {number} lo Low bits to test against
 * @param {number} hi High bits to test against
 * @returns {boolean} `true` if not equal
 */
util.longNe = function longNe(val, lo, hi) {
    if (typeof val === "object") // Long-like, null is invalid and throws
        return val.low !== lo || val.high !== hi;
    var bits = util.LongBits.from(val);
    return bits.lo !== lo || bits.hi !== hi;
};

/**
 * Defines the specified properties on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {Object} descriptors Property descriptors
 * @returns {undefined}
 */
util.props = function props(target, descriptors) {
    Object.keys(descriptors).forEach(function(key) {
        util.prop(target, key, descriptors[key]);
    });
};

/**
 * Defines the specified property on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {string} key Property name
 * @param {Object} descriptor Property descriptor
 * @returns {undefined}
 */
util.prop = function prop(target, key, descriptor) {
    var ie8 = !-[1,];
    var ucKey = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (descriptor.get)
        target["get" + ucKey] = descriptor.get;
    if (descriptor.set)
        target["set" + ucKey] = ie8
            ? function(value) {
                  descriptor.set.call(this, value);
                  this[key] = value;
              }
            : descriptor.set;
    if (ie8) {
        if (descriptor.value !== undefined)
            target[key] = descriptor.value;
    } else
        Object.defineProperty(target, key, descriptor);
};

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 */
util.emptyArray = Object.freeze([]);

/**
 * An immutable empty object.
 * @type {Object}
 */
util.emptyObject = Object.freeze({});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"10":10,"11":11,"3":3,"34":34,"buffer":"buffer","long":"long"}],36:[function(require,module,exports){
"use strict";
module.exports = verify;

var Enum      = require(16),
    Type      = require(31),
    util      = require(33);
var isInteger = util.isInteger;

function invalid(field, expected) {
    return "invalid value for field " + field.getFullName() + " (" + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected)";
}

function verifyValue(field, value) {
    switch (field.type) {
        case "double":
        case "float":
            if (typeof value !== "number")
                return invalid(field, "number");
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            if (!isInteger(value))
                return invalid(field, "integer");
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            if (!isInteger(value) && !(value && isInteger(value.low) && isInteger(value.high)))
                return invalid(field, "integer|Long");
            break;
        case "bool":
            if (typeof value !== "boolean")
                return invalid(field, "boolean");
            break;
        case "string":
            if (!util.isString(value))
                return invalid(field, "string");
            break;
        case "bytes":
            if (!(value && typeof value.length === "number" || util.isString(value)))
                return invalid(field, "buffer");
            break;
        default:
            if (field.resolvedType instanceof Enum) {
                if (typeof field.resolvedType.getValuesById()[value] !== "number")
                    return invalid(field, "enum value");
            } else if (field.resolvedType instanceof Type) {
                var reason = field.resolvedType.verify(value);
                if (reason)
                    return reason;
            }
            break;
    }
    return null;
}

function verifyKey(field, value) {
    switch (field.keyType) {
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            if (/^[\x00-\xff]{8}$/.test(value)) // eslint-disable-line no-control-regex
                return null;
            // fallthrough
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            if (/^-?(?:0|[1-9]\d*)$/.test(value))
                return invalid(field, "integer key");
            break;
        case "bool":
            if (/^true|false|0|1$/.test(value))
                return invalid(field, "boolean key");
            break;
    }
    return null;
}

/**
 * General purpose message verifier.
 * @param {Message|Object} message Runtime message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 * @this {Type}
 * @property {GenerateVerifier} generate Generates a type specific verifier
 */
function verify(message) {
    /* eslint-disable block-scoped-var, no-redeclare */
    var fields = this.getFieldsArray(),
        i = 0,
        reason;
    while (i < fields.length) {
        var field = fields[i++].resolve(),
            value = message[field.name];

        // map fields
        if (field.map) {

            if (value !== undefined) {
                if (!util.isObject(value))
                    return invalid(field, "object");
                var keys = Object.keys(value);
                for (var j = 0; j < keys.length; ++j) {
                    if (reason = verifyKey(field, keys[j])) // eslint-disable-line no-cond-assign
                        return reason;
                    if (reason = verifyValue(field, value[keys[j]])) // eslint-disable-line no-cond-assign
                        return reason;
                }
            }

        // repeated fields
        } else if (field.repeated) {

            if (value !== undefined) {
                if (!Array.isArray(value))
                    return invalid(field, "array");
                for (var j = 0; j < value.length; ++j)
                    if (reason = verifyValue(field, value[j])) // eslint-disable-line no-cond-assign
                        return reason;
            }

        // required or present fields
        } else if (field.required || value !== undefined) {

            if (reason = verifyValue(field, value)) // eslint-disable-line no-cond-assign
                return reason;
        }

    }
    return null;
    /* eslint-enable block-scoped-var, no-redeclare */
}

function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.type) {
        case "double":
        case "float": gen
            ("if(typeof %s!==\"number\")", ref)
                ("return%j", invalid(field, "number"));
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.isInteger(%s))", ref)
                ("return%j", invalid(field, "integer"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                ("return%j", invalid(field, "integer|Long"));
            break;
        case "bool": gen
            ("if(typeof %s!==\"boolean\")", ref)
                ("return%j", invalid(field, "boolean"));
            break;
        case "string": gen
            ("if(!util.isString(%s))", ref)
                ("return%j", invalid(field, "string"));
            break;
        case "bytes": gen
            ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                ("return%j", invalid(field, "buffer"));
            break;
        default:
            if (field.resolvedType instanceof Enum) { gen
                ("switch(%s){", ref)
                    ("default:")
                        ("return%j", invalid(field, "enum value"));
                var values = util.toArray(field.resolvedType.values);
                for (var j = 0; j < values.length; ++j) gen
                    ("case %d:", values[j]);
                gen
                        ("break")
                ("}");
            } else if (field.resolvedType instanceof Type) { gen
                ("var r;")
                ("if(r=types[%d].verify(%s))", fieldIndex, ref)
                    ("return r");
            }
            break;
    }
    /* eslint-enable no-unexpected-multiline */
}

function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9]\\d*))$/.test(%s))", ref)
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!/^-?(?:0|[1-9]\\d*)$/.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "bool": gen
            ("if(!/^true|false|0|1$/.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @typedef GenerateVerifier
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
verify.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();
    var gen = util.codegen("m");

    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            prop  = util.safeProp(field.name);

        // map fields
        if (field.map) { gen
            ("if(m%s!==undefined){", prop)
                ("if(!util.isObject(m%s))", prop)
                    ("return%j", invalid(field, "object"))
                ("var k=Object.keys(m%s)", prop)
                ("for(var i=0;i<k.length;++i){");
                    genVerifyKey(gen, field, "k[i]");
                    genVerifyValue(gen, field, i, "m" + prop + "[k[i]]");
                gen
                ("}")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(m%s!==undefined){", prop)
                ("if(!Array.isArray(m%s))", prop)
                    ("return%j", invalid(field, "array"))
                ("for(var i=0;i<m%s.length;++i){", prop);
                    genVerifyValue(gen, field, i, "m" + prop + "[i]"); gen
                ("}")
            ("}");

        // required or present fields
        } else {
            if (!field.required) {
                if (field.resolvedType instanceof Type) gen
            ("if(m%s!==undefined&&m%s!==null){", prop, prop);
                else gen
            ("if(m%s!==undefined){", prop);
            }
                genVerifyValue(gen, field, i, "m" + prop);
            if (!field.required) gen
            ("}");
        }
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
};

},{"16":16,"31":31,"33":33}],37:[function(require,module,exports){
"use strict";
module.exports = Writer;

Writer.BufferWriter = BufferWriter;

var util      = require(35),
    ieee754   = require(1);
var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;
var ArrayImpl = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @memberof Writer
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @private
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    // this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

Writer.Op = Op;

function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @private
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {?State}
     */
    this.next = writer.states;
}

Writer.State = State;

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {?Object}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling linked operations with already prepared values.
}

/**
 * Creates a new writer.
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = function create() {
    return new (util.Buffer ? BufferWriter : Writer);
};

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new ArrayImpl(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
if (ArrayImpl !== Array)
    Writer.alloc = util.pool(Writer.alloc, ArrayImpl.prototype.subarray || ArrayImpl.prototype.slice);

/** @alias Writer.prototype */
var WriterPrototype = Writer.prototype;

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.uint32 = function write_uint32(value) {
    value = value >>> 0;
    return this.push(writeVarint32,
          value < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5
    , value);
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.int32 = function write_int32(value) {
    return value < 0
        ? this.push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this.push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.int64 = WriterPrototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this.push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.bool = function write_bool(value) {
    return this.push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos++] =  val         & 255;
    buf[pos++] =  val >>> 8   & 255;
    buf[pos++] =  val >>> 16  & 255;
    buf[pos  ] =  val >>> 24;
}

/**
 * Writes a 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.fixed32 = function write_fixed32(value) {
    return this.push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a 32 bit value as fixed 32 bits, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sfixed32 = function write_sfixed32(value) {
    return this.push(writeFixed32, 4, value << 1 ^ value >> 31);
};

/**
 * Writes a 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this.push(writeFixed32, 4, bits.lo).push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.sfixed64 = function write_sfixed64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this.push(writeFixed32, 4, bits.lo).push(writeFixed32, 4, bits.hi);
};

var writeFloat = typeof Float32Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f32 = new Float32Array(1),
            f8b = new Uint8Array(f32.buffer);
        f32[0] = -0;
        return f8b[3] // already le?
            ? function writeFloat_f32(val, buf, pos) {
                f32[0] = val;
                buf[pos++] = f8b[0];
                buf[pos++] = f8b[1];
                buf[pos++] = f8b[2];
                buf[pos  ] = f8b[3];
            }
            : function writeFloat_f32_le(val, buf, pos) {
                f32[0] = val;
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[1];
                buf[pos  ] = f8b[0];
            };
    })()
    : function writeFloat_ieee754(val, buf, pos) {
        ieee754.write(buf, val, pos, false, 23, 4);
    };

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.float = function write_float(value) {
    return this.push(writeFloat, 4, value);
};

var writeDouble = typeof Float64Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f64 = new Float64Array(1),
            f8b = new Uint8Array(f64.buffer);
        f64[0] = -0;
        return f8b[7] // already le?
            ? function writeDouble_f64(val, buf, pos) {
                f64[0] = val;
                buf[pos++] = f8b[0];
                buf[pos++] = f8b[1];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[4];
                buf[pos++] = f8b[5];
                buf[pos++] = f8b[6];
                buf[pos  ] = f8b[7];
            }
            : function writeDouble_f64_le(val, buf, pos) {
                f64[0] = val;
                buf[pos++] = f8b[7];
                buf[pos++] = f8b[6];
                buf[pos++] = f8b[5];
                buf[pos++] = f8b[4];
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[1];
                buf[pos  ] = f8b[0];
            };
    })()
    : function writeDouble_ieee754(val, buf, pos) {
        ieee754.write(buf, val, pos, false, 52, 8);
    };

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.double = function write_double(value) {
    return this.push(writeDouble, 8, value);
};

var writeBytes = ArrayImpl.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
    }
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
WriterPrototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (typeof value === "string" && len) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return len
        ? this.uint32(len).push(writeBytes, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len).push(utf8.write, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset} or {@link Writer#ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
WriterPrototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
WriterPrototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @param {number} [id] Id with wire type 2 to prepend as a tag where applicable
 * @returns {Writer} `this`
 */
WriterPrototype.ldelim = function ldelim(id) {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset();
    if (typeof id === "number")
        this.uint32((id << 3 | 2) >>> 0);
    this.uint32(len);
    this.tail.next = head.next; // skip noop
    this.tail = tail;
    this.len += len;
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
WriterPrototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    this.head = this.tail = null; // gc
    return buf;
};

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @exports BufferWriter
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    BufferWriter.alloc = util.Buffer.allocUnsafe
        ? util.Buffer.allocUnsafe
        : function allocUnsafeNew(size) { return new util.Buffer(size); };
    return BufferWriter.alloc(size);
};

/** @alias BufferWriter.prototype */
var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

function writeFloatBuffer(val, buf, pos) {
    buf.writeFloatLE(val, pos, true);
}

if (typeof Float32Array === "undefined") // f32 is faster (node 6.9.1)
/**
 * @override
 */
BufferWriterPrototype.float = function write_float_buffer(value) {
    return this.push(writeFloatBuffer, 4, value);
};

function writeDoubleBuffer(val, buf, pos) {
    buf.writeDoubleLE(val, pos, true);
}

if (typeof Float64Array === "undefined") // f64 is faster (node 6.9.1)
/**
 * @override
 */
BufferWriterPrototype.double = function write_double_buffer(value) {
    return this.push(writeDoubleBuffer, 8, value);
};

function writeBytesBuffer(val, buf, pos) {
    if (val.length)
        val.copy(buf, pos, 0, val.length);
}

/**
 * @override
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    if (typeof value === "string")
        value = util.Buffer.from ? util.Buffer.from(value, "base64") : new util.Buffer(value, "base64");
    var len = value.length >>> 0;
    return len
        ? this.uint32(len).push(writeBytesBuffer, len, value)
        : this.push(writeByte, 1, 0);
};

var writeStringBuffer = (function() { // eslint-disable-line wrap-iife
    return util.Buffer && util.Buffer.prototype.utf8Write // around forever, but not present in browser buffer
        ? function writeString_buffer_utf8Write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.utf8Write(val, pos);
        }
        : function writeString_buffer_write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.write(val, pos);
        };
    // Note that the plain JS encoder is faster for short strings, probably because of redundant assertions.
    // For a raw utf8Write, the breaking point is about 20 characters, for write it is around 40 characters.
    // Unfortunately, this does not translate 1:1 to real use cases, hence the common "good enough" limit of 40.
})();

/**
 * @override
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = value.length < 40
        ? utf8.length(value)
        : util.Buffer.byteLength(value);
    return len
        ? this.uint32(len).push(writeStringBuffer, len, value)
        : this.push(writeByte, 1, 0);
};

},{"1":1,"35":35}],38:[function(require,module,exports){
(function (global){
"use strict";
var protobuf = global.protobuf = exports;

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}
// function load(filename:string, root:Root, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

/**
 * Named roots.
 * @name roots
 * @type {Object.<string,Root>}
 */
protobuf.roots = {};

// Parser
protobuf.tokenize         = require(30);
protobuf.parse            = require(24);

// Serialization
var Writer =
protobuf.Writer           = require(37);
protobuf.BufferWriter     = Writer.BufferWriter;
var Reader =
protobuf.Reader           = require(25);
protobuf.BufferReader     = Reader.BufferReader;
protobuf.encode           = require(15);
protobuf.decode           = require(14);
protobuf.verify           = require(36);

// Reflection
protobuf.ReflectionObject = require(22);
protobuf.Namespace        = require(21);
protobuf.Root             = require(26);
protobuf.Enum             = require(16);
protobuf.Type             = require(31);
protobuf.Field            = require(17);
protobuf.OneOf            = require(23);
protobuf.MapField         = require(18);
protobuf.Service          = require(29);
protobuf.Method           = require(20);

// Runtime
protobuf.Class            = require(12);
protobuf.Message          = require(19);

// Utility
protobuf.types            = require(32);
protobuf.common           = require(13);
protobuf.rpc              = require(27);
protobuf.util             = require(33);
protobuf.configure        = configure;

/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    Reader._configure();
}

// Be nice to AMD
if (typeof define === "function" && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            configure();
        }
        return protobuf;
    });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"29":29,"30":30,"31":31,"32":32,"33":33,"36":36,"37":37}]},{},[38])


//# sourceMappingURL=protobuf.js.map
