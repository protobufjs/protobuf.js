define(["protobuf"], function($protobuf) {
    "use strict";

    %OUTPUT%

    $protobuf.roots[%ROOT%] = $root;

    return $root;
});
