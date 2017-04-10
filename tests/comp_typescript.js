// uncomment for browser only / non long.js versions
/*
/// <reference path="../stub-long.d.ts" />
/// <reference path="../stub-node.d.ts" />
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var __1 = require("..");
// Reflection
var root = __1.Root.fromJSON({
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
var HelloReflected = root.lookupType("Hello");
HelloReflected.create({ value: "hi" });
// Custom classes
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.foo = function () {
        this.value = "hi";
        return this;
    };
    return Hello;
}(__1.Message));
exports.Hello = Hello;
root.lookupType("Hello").ctor = Hello;
Hello.create({ value: "hi" });
var helloMessage = new Hello({ value: "hi" });
var helloBuffer = Hello.encode(helloMessage.foo()).finish();
var helloDecoded = Hello.decode(helloBuffer);
// Decorators
var AwesomeArrayMessage = (function (_super) {
    __extends(AwesomeArrayMessage, _super);
    function AwesomeArrayMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AwesomeArrayMessage;
}(__1.Message));
__decorate([
    __1.Field.d(1, "uint32", "repeated")
], AwesomeArrayMessage.prototype, "awesomeArray");
AwesomeArrayMessage = __decorate([
    __1.Type.d()
], AwesomeArrayMessage);
exports.AwesomeArrayMessage = AwesomeArrayMessage;
var AwesomeStringMessage = (function (_super) {
    __extends(AwesomeStringMessage, _super);
    function AwesomeStringMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AwesomeStringMessage;
}(__1.Message));
__decorate([
    __1.Field.d(1, "string")
], AwesomeStringMessage.prototype, "awesomeString");
AwesomeStringMessage = __decorate([
    __1.Type.d()
], AwesomeStringMessage);
exports.AwesomeStringMessage = AwesomeStringMessage;
var AwesomeMessage = (function (_super) {
    __extends(AwesomeMessage, _super);
    function AwesomeMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AwesomeMessage;
}(__1.Message));
__decorate([
    __1.Field.d(1, "string", "optional", "awesome default string")
], AwesomeMessage.prototype, "awesomeField");
__decorate([
    __1.Field.d(2, AwesomeArrayMessage)
], AwesomeMessage.prototype, "awesomeArrayMessage");
__decorate([
    __1.Field.d(3, AwesomeStringMessage)
], AwesomeMessage.prototype, "awesomeStringMessage");
__decorate([
    __1.OneOf.d("awesomeArrayMessage", "awesomeStringMessage")
], AwesomeMessage.prototype, "whichAwesomeMessage");
AwesomeMessage = __decorate([
    __1.Type.d()
], AwesomeMessage);
exports.AwesomeMessage = AwesomeMessage;
var awesomeMessage = new AwesomeMessage({ awesomeField: "hi" });
var awesomeBuffer = AwesomeMessage.encode(awesomeMessage).finish();
var awesomeDecoded = AwesomeMessage.decode(awesomeBuffer);
// test currently consists only of not throwing
