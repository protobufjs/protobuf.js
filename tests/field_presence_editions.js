// TODO: write a protobuf editions test
// var tape = require("tape");

// var protobuf = require("..");

// var protoEditionsLegacyRequired = 'edition = "2023";'+
// "message Test {"+
//   "uint32 a = 1 [features.field_presence = LEGACY_REQUIRED];"+
// "}";

// var proto2Required = 'syntax = "proto2";'+
// "message Test {"+
//   "required uint32 a = 1;"+
// "}";

// var protoEditionsImplicit = 'edition = "2023";'+
// "message Test {"+
//   "uint32 a = 1 [features.field_presence = IMPLICIT];"+
// "}";

// var msg = {
//     // a: [1,2,3]
// };

// tape.test.only("packed repeated values", function(test) {
//     var rootEditionsLegacyRequired = protobuf.parse(protoEditionsLegacyRequired).root,
//         rootProto2Required = protobuf.parse(proto2Required).root;
//         rootProtoEditionsImplicit = protobuf.parse(protoEditionsImplicit).root;
//         // console.log(rootEditionsLegacyRequired)
//         // console.log(rootProto2Required)
//     var Test1 = rootEditionsLegacyRequired.lookup("Test"),
//         Test2 = rootProto2Required.lookup("Test");
//         Test3 = rootProtoEditionsImplicit.lookup("Test");
//         console.log(Test2)
    
//         // This should throw, because we are passing a msg without a required field, and
//         // LEGACY_REQUIRED = required
//     var dec1 = Test1.decode(Test1.encode(msg).finish());
//     console.log(dec1)
//         // This should also throw, same reason above, but are actually using proto2
//     var dec2 = Test2.decode(Test2.encode(msg).finish());
//     console.log(dec2)
//         // This test shou
//     var dec2 = Test2.decode(Test2.encode(msg).finish());
//     console.log(dec2)
//     // test.same(dec1, msg, "should decode packed even if defined non-packed");
//     // var dec2 = Test1.decode(Test2.encode(msg).finish());
//     // test.same(dec2, msg, "should decode non-packed even if defined packed");

//     test.end();
// });
