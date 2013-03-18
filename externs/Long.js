/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for Long.js.
 * @see https://github.com/dcodeIO/Long.js
 * @externs
 */

/**
 BEGIN_NODE_INCLUDE
 var Long = require('long');
 END_NODE_INCLUDE
 */

/**
 * @param {number} low
 * @param {number} high
 * @constructor
 */
var Long = function(low, high) {};

/**
 * @param {number} value
 * @return {!Long}
 */
Long.fromInt = function(value) {};

/**
 * @param {number} value
 * @return {!Long}
 */
Long.fromNumber = function(value) {};

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @return {!Long}
 */
Long.fromBits = function(lowBits, highBits) {};

/**
 * @param {string} str
 * @param {number=} opt_radix
 * @return {!Long}
 */
Long.fromString = function(str, opt_radix) {};

/**
 * @type {!Long}
 */
Long.ZERO;

/**
 * @type {!Long}
 */
Long.ONE;

/**
 * @type {!Long}
 */
Long.NEG_ONE;

/**
 * @type {!Long}
 */
Long.MAX_VALUE;

/**
 * @type {!Long}
 */
Long.MIN_VALUE;

/**
 * @return {number}
 */
Long.prototype.toInt = function() {};

/**
 * @return {number}
 */
Long.prototype.toNumber = function() {};

/**
 * @param {number=} opt_radix
 * @return {string}
 */
Long.prototype.toString = function(opt_radix) {};

/**
 * @return {number}
 */
Long.prototype.getHighBits = function() {};

/**
 * @return {number}
 */
Long.prototype.getLowBits = function() {};

/**
 * @return {number}
 */
Long.prototype.getLowBitsUnsigned = function() {};

/**
 * @return {number}
 */
Long.prototype.getNumBitsAbs = function() {};

/**
 * @return {boolean}
 */
Long.prototype.isZero = function() {};

/**
 * @return {boolean}
 */
Long.prototype.isNegative = function() {};

/**
 * @return {boolean}
 */
Long.prototype.isOdd = function() {};

/**
 * @return {boolean}
 */
Long.prototype.isEven = function() {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.equals = function(other) {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.notEquals = function(other) {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.lessThan = function(other) {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.lessThanOrEqual = function(other) {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.greaterThan = function(other) {};

/**
 * @param {Long} other
 * @return {boolean}
 */
Long.prototype.greaterThanOrEqual = function(other) {};

/**
 * @param {Long} other
 * @return {number}
 */
Long.prototype.compare = function(other) {};

/**
 * @return {!Long}
 */
Long.prototype.negate = function() {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.add = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.subtract = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.multiply = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.div = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.modulo = function(other) {};

/**
 * @return {!Long}
 */
Long.prototype.not = function() {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.and = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.or = function(other) {};

/**
 * @param {Long} other
 * @return {!Long}
 */
Long.prototype.xor = function(other) {};

/**
 * @param {number} numBits
 * @return {!Long}
 */
Long.prototype.shiftLeft = function(numBits) {};

/**
 * @param {number} numBits
 * @return {!Long}
 */
Long.prototype.shiftRight = function(numBits) {};

/**
 * @param {number} numBits
 * @return {!Long}
 */
Long.prototype.shiftRightUnsigned = function(numBits) {};
