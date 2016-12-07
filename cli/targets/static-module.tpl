!(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/runtime"));
    
    /* Global */ else
        global.root = factory(global.protobuf);

})(this, function($runtime) {
    "use strict";

%OUTPUT%

    return $root;
});
