"use strict";
// test currently consists only of not throwing
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwesomeMessage = exports.AwesomeSubMessage = exports.AwesomeEnum = exports.Hello = void 0;
const __1 = require("..");
// Reflection
const root = __1.Root.fromJSON({
    nested: {
        Hello: {
            fields: {
                value: {
                    rule: "required",
                    type: "string",
                    id: 1
                }
            }
        }
    }
});
const HelloReflected = root.lookupType("Hello");
HelloReflected.create({ value: "hi" });
const parsedOptionValue = HelloReflected.parsedOptions?.[0]["(custom_option)"];
const reflectedMethod = new __1.Method("Call", undefined, "Hello", "Hello", false, false, undefined, undefined, [{ option: 1 }]);
const parsedMethodOptionValue = reflectedMethod.parsedOptions?.[0].option;
const enumDescriptor = {
    edition: "proto2",
    values: { A: 0 },
    valuesOptions: { A: { deprecated: true } },
    reserved: [[100, 200], "OLD"],
    comment: null,
    comments: { A: null }
};
const fieldDescriptor = { edition: "2023", type: "string", id: 1, comment: null };
const methodDescriptor = { requestType: "Hello", responseType: "Hello", comment: null };
const oneofDescriptor = { oneof: ["value"], comment: null };
const serviceDescriptor = { edition: "2023", methods: { Call: methodDescriptor }, comment: null };
const typeDescriptor = { edition: "2023", fields: { value: fieldDescriptor }, oneofs: { choice: oneofDescriptor }, comment: null };
// Custom classes
class Hello extends __1.Message {
    value; // for MessageProperties<T> coercion
    foo() {
        this.value = "hi";
        return this;
    }
}
exports.Hello = Hello;
root.lookupType("Hello").ctor = Hello;
Hello.create({ value: "hi" });
let helloMessage = new Hello({ value: "hi" });
let helloBuffer = Hello.encode(helloMessage.foo()).finish();
let helloDecoded = Hello.decode(helloBuffer);
// Decorators
require("reflect-metadata");
var AwesomeEnum;
(function (AwesomeEnum) {
    AwesomeEnum[AwesomeEnum["ONE"] = 1] = "ONE";
    AwesomeEnum[AwesomeEnum["TWO"] = 2] = "TWO";
})(AwesomeEnum || (exports.AwesomeEnum = AwesomeEnum = {}));
class AwesomeSubMessage extends __1.Message {
    awesomeString;
    awesomeMapString;
    awesomeMapEnum;
    awesomeMapMessage;
}
exports.AwesomeSubMessage = AwesomeSubMessage;
__decorate([
    __1.Field.d(1, "string"),
    __metadata("design:type", String)
], AwesomeSubMessage.prototype, "awesomeString", void 0);
__decorate([
    __1.MapField.d(2, "string", "string"),
    __metadata("design:type", Object)
], AwesomeSubMessage.prototype, "awesomeMapString", void 0);
__decorate([
    __1.MapField.d(3, "string", AwesomeEnum),
    __metadata("design:type", Object)
], AwesomeSubMessage.prototype, "awesomeMapEnum", void 0);
__decorate([
    __1.MapField.d(4, "string", AwesomeSubMessage),
    __metadata("design:type", Object)
], AwesomeSubMessage.prototype, "awesomeMapMessage", void 0);
let AwesomeMessage = class AwesomeMessage extends __1.Message {
    awesomeField;
    awesomeSubMessage;
    awesomeEnum;
    which;
};
exports.AwesomeMessage = AwesomeMessage;
__decorate([
    __1.Field.d(1, "string", "optional", "awesome default string"),
    __metadata("design:type", String)
], AwesomeMessage.prototype, "awesomeField", void 0);
__decorate([
    __1.Field.d(2, AwesomeSubMessage),
    __metadata("design:type", AwesomeSubMessage)
], AwesomeMessage.prototype, "awesomeSubMessage", void 0);
__decorate([
    __1.Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE),
    __metadata("design:type", Number)
], AwesomeMessage.prototype, "awesomeEnum", void 0);
__decorate([
    __1.OneOf.d("awesomeSubMessage", "awesomeEnum"),
    __metadata("design:type", String)
], AwesomeMessage.prototype, "which", void 0);
exports.AwesomeMessage = AwesomeMessage = __decorate([
    __1.Type.d("SuperAwesomeMessage")
], AwesomeMessage);
let awesomeMessage = new AwesomeMessage({ awesomeField: "hi" });
let awesomeBuffer = AwesomeMessage.encode(awesomeMessage).finish();
let awesomeDecoded = AwesomeMessage.decode(awesomeBuffer);
