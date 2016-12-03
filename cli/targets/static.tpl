;(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/runtime"));
    
    /* Global */ else
        global.root = factory(global.protobuf);

})(this, function($runtime) {
    "use strict";

    // Lazily resolved type references
    var $lazyTypes = [];

    // Exported root namespace
    var $root = {};

%OUTPUT%

    // Resolve lazy types
    $lazyTypes.forEach(function(types) {
        types.forEach(function(path, i) {
            if (!path)
                return;
            path = path.split('.');
            var ptr = $root;
            while (path.length)
                ptr = ptr[path.shift()];
            types[i] = ptr;
        });
    });

    return $root;
});
