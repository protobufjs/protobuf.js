"use strict";

var newSuite = require("./suite");

var protobuf = require("..");

var Root = protobuf.Root;
var root = protobuf.loadSync("tests/data/test.proto");
var json = JSON.stringify(root);

newSuite("fromJSON")
.add("Root.fromJSON", function() {
    Root.fromJSON(json);
})
.run();
