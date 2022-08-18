"use strict";
exports.__esModule = true;
var path = require("path");
var tape = require("tape");
var protobuf = require("../index");
// to extend Root
require("../ext/descriptor");
tape.test("extensions", function (test) {
    // load document with extended field imported multiple times
    var root = protobuf.loadSync(path.resolve(__dirname, "data/test-import-extend/main.proto"));
    root.resolveAll();
    // convert to Descriptor Set
    var decodedDescriptorSet = root.toDescriptor("proto3");
    // load back from descriptor set
    var root2 = protobuf.Root.fromDescriptor(decodedDescriptorSet);
    test.pass("should parse and resolve without errors");
    test.end();
});
