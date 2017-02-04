"use strict";
var pbjs = require("../cli/pbjs");

[
    "google/protobuf/api.proto",
    "google/protobuf/descriptor.proto",
    "google/protobuf/field_mask.proto",
    "google/protobuf/source_context.proto",
    "google/protobuf/type.proto",

    "google/api/annotations.proto",
    "google/api/http.proto"
]
.forEach(function(file) {
    var out = file.replace(/\.proto$/, ".json");
    pbjs.main([
        "--target", "json",
        "--sparse",
        "--out", out,
        file
    ], function(err) {
        if (err)
            throw err;
        process.stdout.write("pbjs: " + file + " -> " + out + "\n");
    });
});