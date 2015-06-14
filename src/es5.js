// Starting with ProtoBuf.js 4.X we are no longer bundling any ES5 polyfills with the library.
// It is now up to the user to provide these as needed. For reference, this is what we use:

// ref: https://developer.mozilla.org/de/docs/JavaScript/Reference/Global_Objects/Object/create
if (!Object.create)
    /** @expose */
    Object.create = function (o) {
        if (arguments.length > 1)
            throw Error('illegal number of arguments');
        function F() {}
        F.prototype = o;
        return new F();
    };

// ref: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray)
    /** @expose */
    Array.isArray = function(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    };

// ref: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach)
    /** @expose */
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null)
            throw new TypeError('this is null or not defined');
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function")
            throw new TypeError(callback + ' is not a function');
        if (arguments.length > 1)
            T = thisArg;
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O)
                kValue = O[k],
                callback.call(T, kValue, k, O);
            k++;
        }
    };
