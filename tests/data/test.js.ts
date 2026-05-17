import * as protobuf from "../..";
import * as test from "./test";

function expectType<T>(value: T): void { void value; }

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

const oneofByCase = test.jspb.test.TestMessageWithOneof.create({ partialOneof: "pone", pone: "abc" });
if (oneofByCase.partialOneof === "pone") {
    expectType<string>(oneofByCase.pone);
    expectType<null|undefined>(oneofByCase.pthree);
}

const oneofByField = test.jspb.test.TestMessageWithOneof.create({ pone: "abc" });
if (oneofByField.pone != null) {
    expectType<string>(oneofByField.pone);
    expectType<null|undefined>(oneofByField.pthree);
}

const oneofByMessage = test.jspb.test.TestMessageWithOneof.create({ rone: { pone: "abc" } });
if (oneofByMessage.recursiveOneof === "rone")
    expectType<test.jspb.test.TestMessageWithOneof.$Shape>(oneofByMessage.rone);

const broadOneofProperties: test.jspb.test.TestMessageWithOneof.$Properties = {
    pone: "abc",
    pthree: "def"
};
const broadOneof = test.jspb.test.TestMessageWithOneof.create(broadOneofProperties);
expectType<string|null|undefined>(broadOneof.pone);

const constructedOneof = new test.jspb.test.TestMessageWithOneof({ pone: "abc" });
expectType<string|null|undefined>(constructedOneof.pone);

const decodedOneof = test.jspb.test.TestMessageWithOneof.decode(new Uint8Array());
if (decodedOneof.partialOneof === "pone")
    expectType<string>(decodedOneof.pone);
if (decodedOneof.rone != null)
    expectType<test.jspb.test.TestMessageWithOneof.$Shape>(decodedOneof.rone);

test.jspb.test.TestMessageWithOneof.encode({
    normalField: true,
    pone: "abc"
}).finish();
