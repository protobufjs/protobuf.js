var tape = require("tape");

var protobuf = require("..");

var proto = `
syntax = "proto3";

option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
    info: {
      title: "Some info";
      version: "0";
    };
    host: "some.host";
};

message Message {
    int32 regular_int32 = 1;
    optional int32 optional_int32 = 2;
    oneof _oneof_int32 {
        int32 oneof_int32 = 3;
    }
    actionType action = 4 [ (validate.rules).enum = {
        defined_only: true,
        not_in: [ 0 ],
        in: ["google","github","azuread"]
    } ];
}
`;

tape.test("complex options", function (test) {
  var root = protobuf.parse(proto).root;

  test.deepEqual(root.parsedOptions[0], {
    "(grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger)": {
      info: {
        title: "Some info",
        version: "0",
      },
      host: "some.host",
    },
  });

  test.deepEqual(root.Message.fields.action.parsedOptions[0], {
    "(validate.rules)": {
      enum: {
        defined_only: true,
        not_in: [0],
        in: ["google", "github", "azuread"],
      },
    },
  });

  test.end();
});
