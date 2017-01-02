/* eslint-disable block-scoped-var, no-redeclare, no-control-regex, strict */
"use strict";

var $protobuf = require("protobufjs/runtime");

%OUTPUT%

$protobuf.roots[%ROOT%] = $root;

module.exports = $root;
