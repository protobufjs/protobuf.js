"use strict";

var $protobuf = require("protobufjs/runtime");

%OUTPUT%

$protobuf.roots[%ROOT%] = $root;

module.exports = $root;
