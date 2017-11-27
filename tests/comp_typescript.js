"use strict";
// test currently consists only of not throwing
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var Hello = /** @class */ (function (_super) {
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
require("reflect-metadata");
var AwesomeEnum;
(function (AwesomeEnum) {
    AwesomeEnum[AwesomeEnum["ONE"] = 1] = "ONE";
    AwesomeEnum[AwesomeEnum["TWO"] = 2] = "TWO";
})(AwesomeEnum = exports.AwesomeEnum || (exports.AwesomeEnum = {}));
var AwesomeSubMessage = /** @class */ (function (_super) {
    __extends(AwesomeSubMessage, _super);
    function AwesomeSubMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        __1.Field.d(1, "string"),
        __metadata("design:type", String)
    ], AwesomeSubMessage.prototype, "awesomeString");
    __decorate([
        __1.MapField.d(2, "string", "string"),
        __metadata("design:type", Object)
    ], AwesomeSubMessage.prototype, "awesomeMapString");
    __decorate([
        __1.MapField.d(3, "string", AwesomeEnum),
        __metadata("design:type", Object)
    ], AwesomeSubMessage.prototype, "awesomeMapEnum");
    __decorate([
        __1.MapField.d(4, "string", AwesomeSubMessage),
        __metadata("design:type", Object)
    ], AwesomeSubMessage.prototype, "awesomeMapMessage");
    return AwesomeSubMessage;
}(__1.Message));
exports.AwesomeSubMessage = AwesomeSubMessage;
var AwesomeMessage = /** @class */ (function (_super) {
    __extends(AwesomeMessage, _super);
    function AwesomeMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        __1.Field.d(1, "string", "optional", "awesome default string"),
        __metadata("design:type", String)
    ], AwesomeMessage.prototype, "awesomeField");
    __decorate([
        __1.Field.d(2, AwesomeSubMessage),
        __metadata("design:type", AwesomeSubMessage)
    ], AwesomeMessage.prototype, "awesomeSubMessage");
    __decorate([
        __1.Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE),
        __metadata("design:type", Number)
    ], AwesomeMessage.prototype, "awesomeEnum");
    __decorate([
        __1.OneOf.d("awesomeSubMessage", "awesomeEnum"),
        __metadata("design:type", String)
    ], AwesomeMessage.prototype, "which");
    AwesomeMessage = __decorate([
        __1.Type.d("SuperAwesomeMessage")
    ], AwesomeMessage);
    return AwesomeMessage;
}(__1.Message));
exports.AwesomeMessage = AwesomeMessage;
var awesomeMessage = new AwesomeMessage({ awesomeField: "hi" });
var awesomeBuffer = AwesomeMessage.encode(awesomeMessage).finish();
var awesomeDecoded = AwesomeMessage.decode(awesomeBuffer);
