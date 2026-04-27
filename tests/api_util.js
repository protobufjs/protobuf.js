var tape = require("tape");

var protobuf = require("..");

var util = protobuf.util;

tape.test("util", function(test) {

    test.test(test.name + " - merge", function(test) {
        var o = {};
        util.merge(o, {});
        test.same(o, {}, "should do nothing if both objects are empty");
        util.merge(o, { a: 1 });
        test.same(o, { a: 1 }, "should merge non-existing keys");
        util.merge(o, { a: 2 });
        test.same(o, { a: 2 }, "should merge existing keys");
        util.merge(o, { a: 3 }, true);
        test.same(o, { a: 2 }, "should not merge existing keys");
        util.merge(o, JSON.parse("{\"__proto__\":{\"marker\":true}}"));
        test.equal(Object.getPrototypeOf(o), Object.prototype, "should keep the target object shape");
        test.notOk(Object.prototype.hasOwnProperty.call(o, "__proto__"), "should skip reserved keys");
        test.equal(o.marker, undefined, "should not expose skipped values");
        test.end();
    });

    test.test(test.name + " - lcFirst", function(test) {
        test.equal(util.lcFirst("ABC"), "aBC", "should convert the first character to lower case");
        test.end();
    });

    test.test(test.name + " - ucFirst", function(test) {
        test.equal(util.ucFirst("abc"), "Abc", "should convert the first character to upper case");
        test.end();
    });

    test.test(test.name + " - isSet", function(test) {
        // note that encoders don't check for default values either
        var neverPresent = [
            [],
            {},
            undefined,
            null
        ];
        neverPresent.forEach(function(value) {
            var proto = {};
            var instance = Object.create(proto);
            proto.p = value;
            instance.i = value;
            test.notOk(util.isSet(proto, "p"), "should return that " + JSON.stringify(value) + " on the prototype is not present");
            test.notOk(util.isSet(instance, "i"), "should return that " + JSON.stringify(value) + " on the instance is not present");
        });
        var cases = {
            "arrays": [ [], [0] ],
            "objects": [ {}, {a:1} ],
            "strings": [ undefined, "" ],
            "numbers": [ undefined, 0 ],
            "booleans": [ undefined, false ]
        };
        Object.keys(cases).forEach(function(name) {
            var empty = cases[name][0],
                value = cases[name][1];
            var proto = {};
            var instance = Object.create(proto);
            proto.pe = instance.ie = empty;
            proto.p = instance.i = value;
            if (empty !== undefined) { // not present anyway
                test.notOk(util.isSet(instance, "pe"), "should return that empty " + name + " on the prototype are not present");
                test.notOk(util.isSet(instance, "ie"), "should return that empty " + name + " on the instance are not present");
            }
            test.notOk(util.isSet(instance, "p"), "should return that " + name + " on the prototype are not present");
            test.ok(util.isSet(instance, "i"), "should return that " + name + " on the instance ARE present");
        });

         test.end();
    });

    test.test(test.name + " - setProperty", function(test) {
        var o = {};

        test.throws(function() {
            util.setProperty(5, 'prop1', 5);
        }, TypeError, "dst must be an object");

        test.throws(function () {
            util.setProperty(o, '', 5);
        }, TypeError, "path must be specified");

        util.setProperty(o, 'prop1', 5);
        test.same(o, {prop1: 5}, "should set single property value");

        util.setProperty(o, 'prop1', 6);
        test.same(o, {prop1: [5, 6]}, "should convert to array if same property is set");

        util.setProperty(o, 'prop.subprop', { subsub: 5});
        test.same(o, {prop1: [5, 6], prop: {subprop: {subsub: 5}}}, "should handle nested properties properly");

        util.setProperty(o, 'prop.subprop.subsub', 6);
        test.same(o, {prop1: [5, 6], prop: {subprop: {subsub: [5, 6]}}}, "should convert to array nested property");

        util.setProperty(o, 'prop.subprop', { subsub2: 7});
        test.same(o, {prop1: [5, 6], prop: {subprop: [{subsub: [5,6]}, {subsub2: 7}]}}, "should convert nested properties to array");
        
        util.setProperty({}, "__proto__.test", "value");
        test.is({}.test, undefined);

        util.setProperty({}, "prototype.test", "value");
        test.is({}.test, undefined);

        util.setProperty({}, "constructor.prototype.test", "value");
        test.is({}.test, undefined);

        var objectKeys = Object.keys;
        try {
            util.setProperty({}, "constructor.keys", "value");
            test.equal(Object.keys, objectKeys, "should not overwrite Object constructor properties");
        } finally {
            Object.keys = objectKeys;
        }

        test.end();
    });

    test.test(test.name + " - safeProp", function(test) {
        test.equal(util.safeProp("validName"), ".validName", "should use dot notation for simple names");
        test.equal(util.safeProp("bad\nfield").indexOf("\n"), -1, "should escape line feeds");
        test.equal(util.safeProp("bad\rfield").indexOf("\r"), -1, "should escape carriage returns");
        test.equal(util.safeProp("bad\u0000field").indexOf("\u0000"), -1, "should escape null bytes");

        var root = protobuf.Root.fromJSON({
            nested: {
                Message: {
                    fields: {
                        "bad\nfield": { type: "string", id: 1 }
                    }
                }
            }
        });
        var Message = root.lookupType("Message");
        var msg = Message.create({ "bad\nfield": "ok" });
        test.same(Message.toObject(msg), { "bad\nfield": "ok" }, "should generate usable accessors");

        test.end();
    });

    test.test(test.name + " - type lookups", function(test) {
        test.equal(Object.getPrototypeOf(protobuf.types.basic), null, "should not inherit basic type lookups");
        test.equal(Object.getPrototypeOf(protobuf.types.defaults), null, "should not inherit default value lookups");
        test.equal(Object.getPrototypeOf(protobuf.types.long), null, "should not inherit long type lookups");
        test.equal(Object.getPrototypeOf(protobuf.types.mapKey), null, "should not inherit map key lookups");
        test.equal(Object.getPrototypeOf(protobuf.types.packed), null, "should not inherit packed type lookups");

        Object.prototype.notAType = 0;
        try {
            test.throws(function() {
                protobuf.Root.fromJSON({
                    nested: {
                        Message: {
                            fields: {
                                value: { type: "notAType", id: 1 }
                            }
                        }
                    }
                });
            }, /no such Type or Enum/, "should ignore inherited type lookup keys");
        } finally {
            delete Object.prototype.notAType;
        }

        test.end();
    });

    test.end();
});
