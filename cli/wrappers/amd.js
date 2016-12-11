define(["protobuf"], function($protobuf) {
    "use strict"; // eslint-disable-line strict

    %OUTPUT%

    $protobuf.roots[%ROOT%] = $root;

    return $root;
});
