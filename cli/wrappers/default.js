/* eslint-disable block-scoped-var, no-redeclare, no-control-regex, strict */
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/runtime"));

})(this, function($protobuf) {
    "use strict";

    %OUTPUT%

    $protobuf.roots[%ROOT%] = $root;

    return $root;
});
