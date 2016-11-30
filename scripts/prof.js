var protobuf = require(".."),
    data = require("../bench/bench.json");

var root = protobuf.Root.fromJSON({
  "nested": {
    "Test": {
      "fields": {
        "string": {
          "type": "string",
          "id": 1
        },
        "uint32": {
          "type": "uint32",
          "id": 2
        },
        "inner": {
          "type": "Inner",
          "id": 3
        }
      },
      "nested": {
        "Inner": {
          "fields": {
            "int32": {
              "type": "int32",
              "id": 1
            },
            "innerInner": {
              "type": "InnerInner",
              "id": 2
            },
            "outer": {
              "type": "Outer",
              "id": 3
            }
          },
          "nested": {
            "InnerInner": {
              "fields": {
                "long": {
                  "type": "int64",
                  "id": 1
                },
                "enum": {
                  "type": "Enum",
                  "id": 2
                },
                "sint32": {
                  "type": "sint32",
                  "id": 3
                }
              }
            }
          }
        },
        "Enum": {
          "values": {
            "ONE": 0,
            "TWO": 1,
            "THREE": 2,
            "FOUR": 3,
            "FIVE": 4
          }
        }
      }
    },
    "Outer": {
      "fields": {
        "bool": {
          "rule": "repeated",
          "type": "bool",
          "id": 1,
          "options": {
            "packed": true
          }
        }
      }
    }
  }
});

var Test = root.lookup("Test");
for (var i = 0; i < 100000000; ++i)
    Test.encode(data);
