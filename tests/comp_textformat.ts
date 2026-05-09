import * as protobuf from "../index";
import textformat = require("../ext/textformat");

const root = protobuf.Root.fromJSON({
    nested: {
        Message: {
            fields: {
                value: {
                    type: "int32",
                    id: 1
                }
            }
        }
    }
});
root.resolveAll();

const type = root.lookupType("Message");
const message = type.fromText("value: 1");
const text: string = type.toText(message, { unknowns: true });

textformat.recursionLimit = protobuf.util.recursionLimit;
textformat.unknownRecursionLimit = 10;
protobuf.textformat.recursionLimit = textformat.recursionLimit;

if (text.length < 0)
    throw Error("unreachable");
