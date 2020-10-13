var tape = require("tape");
var long = require("long");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        test: {
            nested: {
                Test: {
                    fields: {
                        value: {
                            type: "google.protobuf.Duration",
                            id: 1
                        }
                    }
                }
            }
        }
    }
}).addJSON(protobuf.common["google/protobuf/duration.proto"].nested).resolveAll();

var Test = root.lookupType("test.Test");

tape.test("google.protobuf.Duration", function(test) {
    // examples from google/protobuf/duration.proto
    var integerDuration = {value: "3s"};
    var fractionalDuration1 = {value: "3.000000001s"};
    var fractionalDuration2 = {value: "3.000001s"};
    var regularDuration = {
        value: {
            seconds: long.fromNumber(4),
            nanos: 2
        }
    };

    var integerDurationMessage = Test.fromObject(integerDuration);
    var fractionalDuration1Message = Test.fromObject(fractionalDuration1);
    var fractionalDuration2Message = Test.fromObject(fractionalDuration2);
    var regularDurationMessage = Test.fromObject(regularDuration);

    test.same(integerDurationMessage, {
        value: {
            seconds: 3,
            nanos: 0
        }
    }, "toObject should understand integer seconds as string");
    test.same(fractionalDuration1Message, {
        value: {
            seconds: 3,
            nanos: 1
        }
    }, "toObject should understand fractional seconds as string 1");
    test.same(fractionalDuration2Message, {
        value: {
            seconds: 3,
            nanos: 1000
        }
    }, "toObject should understand fractional seconds as string 2");
    test.same(regularDurationMessage, {
        value: {
            seconds: {low: 4, high: 0, unsigned: false},
            nanos: 2
        }
    }, "toObject should understand regular Duration message");

    test.same(Test.toObject(integerDurationMessage, {json: true, values: true}), {value: "3s"}, "toObject should produce integer seconds");
    test.same(Test.toObject(fractionalDuration1Message, {json: true, values: true}), {value: "3.000000001s"}, "toObject should produce fractional seconds 1");
    test.same(Test.toObject(fractionalDuration2Message, {json: true, values: true}), {value: "3.000001s"}, "toObject should produce fractional seconds 2");
    test.same(Test.toObject(regularDurationMessage, {json: true, values: true}), {value: "4.000000002s"}, "toObject should produce fractional seconds 3");
    test.same(Test.toObject(regularDurationMessage), regularDurationMessage, "toObject should produce a regular Duration object by default");

    test.same(Test.toObject({ value: { seconds: 0, nanos: 100000000 }}, {json: true, values: true}), { value: "0.100s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 10000000 }}, {json: true, values: true}), { value: "0.010s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 1000000 }}, {json: true, values: true}), { value: "0.001s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 100000 }}, {json: true, values: true}), { value: "0.000100s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 10000 }}, {json: true, values: true}), { value: "0.000010s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 1000 }}, {json: true, values: true}), { value: "0.000001s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 100 }}, {json: true, values: true}), { value: "0.000000100s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 10 }}, {json: true, values: true}), { value: "0.000000010s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 1 }}, {json: true, values: true}), { value: "0.000000001s"}, "toObject string should contain 3, 6, or 9 fractional digits 1");
    test.same(Test.toObject({ value: { seconds: 0, nanos: 0 }}, {json: true, values: true}), { value: "0s"}, "toObject string is valid for zero duration");

    test.end();
});
