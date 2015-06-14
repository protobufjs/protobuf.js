/**
 * @alias ProtoBuf.Util
 * @expose
 */
ProtoBuf.Util = (function() {
    "use strict";

    /**
     * ProtoBuf utilities.
     * @exports ProtoBuf.Util
     * @namespace
     */
    var Util = {};

    /**
     * Flag if running in node or not.
     * @type {boolean}
     * @const
     * @expose
     */
    Util.IS_NODE = !!(
        // Feature detection causes packaging for the browser to fail or include
        // redundant modules.
        // * Works for browserify because node-process does not implement toString
        //   https://github.com/defunctzombie/node-process
        typeof process === 'object' &&
        process+'' === '[object process]'
    );

    /**
     * Constructs a XMLHttpRequest object.
     * @return {XMLHttpRequest}
     * @throws {Error} If XMLHttpRequest is not supported
     * @expose
     */
    Util.XHR = function() {
        // No dependencies please, ref: http://www.quirksmode.org/js/xmlhttp.html
        var XMLHttpFactories = [
            function () {return new XMLHttpRequest()},
            function () {return new ActiveXObject("Msxml2.XMLHTTP")},
            function () {return new ActiveXObject("Msxml3.XMLHTTP")},
            function () {return new ActiveXObject("Microsoft.XMLHTTP")}
        ];
        /** @type {?XMLHttpRequest} */
        var xhr = null;
        for (var i=0;i<XMLHttpFactories.length;i++) {
            try { xhr = XMLHttpFactories[i](); }
            catch (e) { continue; }
            break;
        }
        if (!xhr)
            throw Error("XMLHttpRequest is not supported");
        return xhr;
    };

    /**
     * Fetches a resource.
     * @param {string} path Resource path
     * @param {function(?string)=} callback Callback receiving the resource's contents. If omitted the resource will
     *   be fetched synchronously. If the request failed, contents will be null.
     * @return {?string|undefined} Resource contents if callback is omitted (null if the request failed), else undefined.
     * @expose
     */
    Util.fetch = function(path, callback) {
        if (callback && typeof callback != 'function')
            callback = null;
        if (Util.IS_NODE) {
            if (callback) {
                require("fs").readFile(path, function(err, data) {
                    if (err)
                        callback(null);
                    else
                        callback(""+data);
                });
            } else
                try {
                    return require("fs").readFileSync(path);
                } catch (e) {
                    return null;
                }
        } else {
            var xhr = Util.XHR();
            xhr.open('GET', path, callback ? true : false);
            // xhr.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
            xhr.setRequestHeader('Accept', 'text/plain');
            if (typeof xhr.overrideMimeType === 'function') xhr.overrideMimeType('text/plain');
            if (callback) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState != 4) return;
                    if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
                        callback(xhr.responseText);
                    else
                        callback(null);
                };
                if (xhr.readyState == 4)
                    return;
                xhr.send(null);
            } else {
                xhr.send(null);
                if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
                    return xhr.responseText;
                return null;
            }
        }
    };

    /**
     * Converts a string to camel case.
     * @param {string} str
     * @returns {string}
     * @expose
     */
    Util.toCamelCase = function(str) {
        return str.replace(/_([a-zA-Z])/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    };
    
    return Util;
})();
