Long.js
=======
A Long class for representing a 64-bit two's-complement integer value derived from the [Closure Library](https://code.google.com/p/closure-library/)
for stand-alone use and extended with unsigned support.

Why?
----
As of the [ECMAScript specification](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5), number types have a maximum value
of 2^53. Beyond that, behaviour might be unexpected. Furthermore, bitwise operations are always performed on 32bit
numbers. However, in some use cases it is required to be able to perform reliable mathematical and/or bitwise operations
on the full 64bits. This is where Long.js comes into play.

Long.js is based on the [goog.math.Long class](http://closure-library.googlecode.com/svn/docs/closure_goog_math_long.js.html)
from the Closure Library. It uses two 32bit integers internally and provides methods for comparison, common tests, math
and bitwise operations on the full 64bits. Additionally, some use cases also require to work with 64bit unsigned values,
so Long.js has been extended with unsigned support while maintaining compatibility to the Closure Library implementation.

Features
--------
* [CommonJS](http://www.commonjs.org/) compatible
* [RequireJS](http://requirejs.org/)/AMD compatible
* Shim compatible (include the script, then use var Long = dcodeIO.Long;)
* [node.js](http://nodejs.org) compatible, also available via [npm](https://npmjs.org/package/long)
* Fully documented using [jsdoc3](https://github.com/jsdoc3/jsdoc)
* Zero production dependencies
* Small footprint

Long
----
* Construction from high and low bits as 32bit integers: `new Long(low, high[, unsigned=false])` and
  `Long.fromBits(low, high[, unsigned=false])`
* ...from a 32bit integer: `Long.fromInt(value[, unsigned=false])` including a cache for frequently used small numbers
* ...from a number which may internally be a number or double type: `Long.fromNumber(value[, unsigned=false])`
* ...from a string: `Long.fromString(value[, unsigned=false, radix=10])`
* Conversion to a 32bit integer: `Long#toInt()`
* ...to a number: `Long#toNumber()`
* ...to a string: `Long#toString([radix=10])`
* Getters for high and low bits as 32bit integers: `Long#getLowBits()`, `Long#getHighBits()` and
  `Long#getLowBitsUnsigned()`, `Long#getHighBitsUnsigned()`
* Comparison: `Long#equals(other)`, `Long#notEquals(other)`, `Long#lessThan(other)`, `Long#lessThanOrEqual(other)`,
  `Long#greaterThan(other)`, `Long#greaterThanOrEqual(other)`, `Long#compare(other)`
* Common tests: `Long#isZero()`, `Long#isNegative()`, `Long#isOdd()`, `Long#isEven()`
* Math: `Long#negate()`, `Long#add(other)`, `Long#subtract(other)`, `Long#multiply(other)`, `Long#div(other)`,
  `Long#modulo(other)`
* Bitwise operations: `Long#not()`, `Long#and(other)`, `Long#or(other)`, `Long#xor(other)`, `Long#shiftLeft(numBits)`,
  `Long#shiftRight(numBits)`, `Long#shiftRightUnsigned(numBits)`
* Conversion between signed and unsinged: `Long.toSigned()`, `Long.toUnsigned()`

Usage
-----

#### node.js / CommonJS ####

Install: `npm install long`

```javascript
var Long = require("long");
var longVal = new Long(0xFFFFFFFF, 0x7FFFFFFF);
console.log(longVal.toString());
...
```

#### RequireJS / AMD ####

````javascript
require.config({
    "paths": {
        "Math/Long": "/path/to/Long.js"
    }
});
require(["Math/Long"], function(Long) {
    var longVal = new Long(0xFFFFFFFF, 0x7FFFFFFF);
    console.log(longVal.toString());
});
````

### Browser / shim ####

```html
<script src="//raw.github.com/dcodeIO/Long.js/master/Long.min.js"></script>
```

```javascript
var Long = dcodeIO.Long;
var longVal = new Long(0xFFFFFFFF, 0x7FFFFFFF);
alert(longVal.toString());
```

Documentation
-------------
* [View documentation](http://htmlpreview.github.com/?http://github.com/dcodeIO/Long.js/master/docs/Long.html)

Downloads
---------
* [ZIP-Archive](https://github.com/dcodeIO/Long.js/archive/master.zip)
* [Tarball](https://github.com/dcodeIO/Long.js/tarball/master)

License
-------
Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
