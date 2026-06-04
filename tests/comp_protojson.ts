import * as protobuf from "../index";
import protojson = require("../ext/protojson");

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
protojson.install();
const parsed = type.fromJson({ value: 1 });
const parsedString = type.fromJsonString("{\"value\":1}");
const json: any = type.toJson(parsed);
const jsonString: string = type.toJsonString(parsedString);
const parsedViaModule = protojson.fromJson(type, json, { ignoreUnknownFields: true });
const parsedStringViaModule = protojson.fromJsonString(type, jsonString);
const jsonViaModule: any = protojson.toJson(type, parsedViaModule);
const jsonStringViaModule: string = protojson.toJsonString(type, parsedStringViaModule);

if (!jsonViaModule || jsonStringViaModule.length < 0)
    throw Error("unreachable");
