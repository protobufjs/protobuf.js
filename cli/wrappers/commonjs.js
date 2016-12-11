"use strict"; // eslint-disable-line strict

var $protobuf = require("protobufjs/runtime");

%OUTPUT%

$protobuf.roots[%ROOT%] = $root;

module.exports = $root;
