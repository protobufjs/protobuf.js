/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs");

var $root = ($protobuf.roots.split || ($protobuf.roots.split = new $protobuf.Root()))
.setOptions({
  "(foo)": "bar"
})
.addJSON({
  com: {
    nested: {
      Outer: {
        fields: {
          inner: {
            type: "Inner",
            id: 1
          },
          other: {
            type: "Other",
            id: 2
          }
        },
        nested: {
          Inner: {
            fields: {}
          }
        }
      },
      Other: {
        fields: {
          "var": {
            rule: "required",
            type: "uint32",
            id: 1
          }
        }
      }
    }
  }
});

module.exports = $root;
