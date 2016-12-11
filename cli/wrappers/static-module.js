(function(global, factory) {
    /* eslint-disable no-undef */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/runtime"));

    /* eslint-enable no-undef */
})(this, function($protobuf) {
    "use strict"; // eslint-disable-line strict

    %OUTPUT%

    $protobuf.roots = {};
    $protobuf.roots[%ROOT%] = $root;

    return $root;
});
