/* eslint-disable block-scoped-var, no-redeclare, no-control-regex, strict */
define(["protobuf"], function($protobuf) {
    "use strict";

    %OUTPUT%

    $protobuf.roots[%ROOT%] = $root;

    return $root;
});
