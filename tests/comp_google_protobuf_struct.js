var tape = require("tape");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        test: {
            nested: {
                Test: {
                    fields: {
                        value: {
                            type: "google.protobuf.Struct",
                            id: 1
                        }
                    }
                }
            }
        }
    }
}).addJSON(protobuf.common["google/protobuf/struct.proto"].nested).resolveAll();

var Test = root.lookupType("test.Test");

tape.test("google.protobuf.Struct", function(test) {
    var originalNestedMessage = {
        value: {
            fields: {
                first: {
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
                        ]
                    }
                },
                second: {
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
            }
        }
    };

    // The same message as above, but without `kind` fields for oneofs, since
    // they won't be compared in test.same below
    var originalNestedMessageNoKind = {
        value: {
            fields: {
                first: {
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
                        ]
                    }
                },
                second: {
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
            }
        }
    };

    // the same object as above, but in the JSON format described in google/protobuf/struct.proto
    var nestedObject = {value: {first: [null, 42, 'string'], second: {a: 'b', c: [3.14, 2.71]}}};
    var nestedMessage = Test.fromObject(nestedObject);

    test.same(nestedMessage, originalNestedMessageNoKind, "fromObject should understand google.protobuf.Struct JSON");
    test.same(Test.toObject(nestedMessage, {json: true, values: true}), nestedObject, "toObject should understand google.protobuf.Struct JSON");

    // it should still accept objects in the original format
    var msg = Test.fromObject(originalNestedMessage);
    test.same(msg, originalNestedMessageNoKind, "fromObject should accept regular google.protobuf.Struct");
    test.same(Test.toObject(msg), originalNestedMessageNoKind, "toObject should generate regular Struct object by default");

    test.end();
});
