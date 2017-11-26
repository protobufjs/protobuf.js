import * as protobuf from "../..";
import * as test from "./test";

// should encode an object implementing the interface
let mInterface: test.jspb.test.ISimple1 = { aString: "a-string", aRepeatedString: [ "a", "repeated", "string" ], aBoolean: true };
let mInterfaceWriter: protobuf.Writer = test.jspb.test.Simple1.encode(mInterface);

// should encode a message
let mMessage: test.jspb.test.Simple1 = test.jspb.test.Simple1.create(mInterface);
let mMessageWritter: protobuf.Writer = test.jspb.test.Simple1.encode(mMessage);

// should allow to assign a message to an interface
mInterface = mMessage;

// should not allow to assign an interface to a message
// mMessage = mInterface;

// should always decode to a message, not an interface
let dMessage: test.jspb.test.Simple1 = test.jspb.test.Simple1.decode(mInterfaceWriter.finish());
