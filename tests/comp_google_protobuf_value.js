var tape = require("tape");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        test: {
            nested: {
                Test: {
                    fields: {
                        value: {
                            type: "google.protobuf.Value",
                            id: 1
                        }
                    }
                }
            }
        }
    }
}).addJSON(protobuf.common["google/protobuf/struct.proto"].nested).resolveAll();

var Test = root.lookupType("test.Test");

tape.test("google.protobuf.Value", function(test) {
    var originalNestedMessage = {
        value: {
            kind: 'listValue',
            listValue: {
                values: [
                    {
                        kind: 'nullValue',
                        nullValue: 0
                    },
                    {
                        kind: 'numberValue',
                        numberValue: 42
                    },
                    {
                        kind: 'stringValue',
                        stringValue: 'string'
                    },
                    {
                        kind: 'structValue',
                        structValue: {
                            fields: {
                                a: {
                                    kind: 'stringValue',
                                    stringValue: 'b'
                                },
                                c: {
                                    kind: 'listValue',
                                    listValue: {
                                        values: [
                                            {
                                                kind: 'numberValue',
                                                numberValue: 3.14
                                            },
                                            {
                                                kind: 'numberValue',
                                                numberValue: 2.71
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    // The same message as above, but without `kind` fields for oneofs, since
    // they won't be compared in test.same below
    var originalNestedMessageNoKind = {
        value: {
            listValue: {
                values: [
                    {
                        nullValue: 0
                    },
                    {
                        numberValue: 42
                    },
                    {
                        stringValue: 'string'
                    },
                    {
                        structValue: {
                            fields: {
                                a: {
                                    stringValue: 'b'
                                },
                                c: {
                                    listValue: {
                                        values: [
                                            {
                                                numberValue: 3.14
                                            },
                                            {
                                                numberValue: 2.71
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    // the same object as above, but in the JSON format described in google/protobuf/struct.proto
    var nestedObject = {value: [null, 42, 'string', {a: 'b', c: [3.14, 2.71]}]};

    var nullObject = {value: null};
    var numberObject = {value: 3.14159};
    var stringObject = {value: 'some string'};

    var nullMessage = Test.fromObject(nullObject);
    var numberMessage = Test.fromObject(numberObject);
    var stringMessage = Test.fromObject(stringObject);
    var nestedMessage = Test.fromObject(nestedObject);

    test.same(nullMessage, {value: {nullValue: 0}}, "fromObject should understand nullValue");
    test.same(numberMessage, {value: {numberValue: 3.14159}}, "fromObject should understand numberValue");
    test.same(stringMessage, {value: {stringValue: 'some string'}}, "fromObject should understand stringValue");
    test.same(nestedMessage, originalNestedMessageNoKind, "fromObject should understand structValue and listValue");

    test.same(Test.toObject(nullMessage, {json: true, values: true}), nullObject, "toObject should understand nullValue");
    test.same(Test.toObject(numberMessage, {json: true, values: true}), numberObject, "toObject should understand numberValue");
    test.same(Test.toObject(stringMessage, {json: true, values: true}), stringObject, "toObject should understand stringValue");
    test.same(Test.toObject(nestedMessage, {json: true, values: true}), nestedObject, "toObject should understand listValue and structValue");

    // it should still accept objects in the original format
    var msg = Test.fromObject(originalNestedMessage);
    test.same(msg, originalNestedMessageNoKind, "fromObject should accept regular google.protobuf.Value");
    test.same(Test.toObject(msg), originalNestedMessageNoKind, "toObject should generate regular Value object by default");

    test.end();
});
