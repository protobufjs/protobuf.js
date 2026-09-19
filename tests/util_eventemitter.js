var tape = require("tape");

var EventEmitter = require("../src/util/eventemitter");

tape.test("eventemitter", function(test) {

    var ee = new EventEmitter();
    var fn;
    var ctx = {};

    test.equal(Object.getPrototypeOf(ee._listeners), null, "should not inherit listener lookup keys");

    test.doesNotThrow(function() {
        ee.emit("a", 1);
        ee.off();
        ee.off("a");
        ee.off("a", function() {});
    }, "should not throw if no listeners are registered");
    
    test.equal(ee.on("a", function(arg1) {
        test.equal(this, ctx, "should be called with this = ctx");
        test.equal(arg1, 1, "should be called with arg1 = 1");
    }, ctx), ee, "should return itself when registering events");
    ee.emit("a", 1);

    ee.off("a");
    test.same(Object.keys(ee._listeners), [ "a" ], "should keep the event key when calling off(evt)");
    test.same(ee._listeners.a, [], "should remove all listeners of the respective event when calling off(evt)");

    ee.off();
    test.equal(Object.getPrototypeOf(ee._listeners), null, "should keep the listener table isolated when just calling off()");
    test.same(Object.keys(ee._listeners), [], "should remove all listeners when just calling off()");

    ee.on("a", fn = function(arg1) {
        test.equal(this, ctx, "should be called with this = ctx");
        test.equal(arg1, 1, "should be called with arg1 = 1");
    }, ctx).emit("a", 1);

    ee.off("a", fn);
    test.same(Object.keys(ee._listeners), [ "a" ], "should keep the event key when calling off(evt, fn)");
    test.same(ee._listeners.a, [], "should remove the exact listener when calling off(evt, fn)");

    ee.on("a", function() {
        test.equal(this, ee, "should be called with this = ee");
    }).emit("a");

    test.doesNotThrow(function() {
        ee.off("a", fn);
    }, "should not throw if no such listener is found");

    test.test(test.name + " - removing a listener during emission", function(test) {
        var ee = new EventEmitter(),
            calls = [];
        function first(value) {
            calls.push("first:" + value);
            ee.off("a", first);
        }
        ee.on("a", first);
        ee.on("a", function(value) { calls.push("second:" + value); });
        ee.emit("a", 1);
        ee.emit("a", 2);
        test.same(calls, ["first:1", "second:1", "second:2"], "should not skip the remaining listener");
        test.end();
    });

    test.test(test.name + " - removing another listener during emission", function(test) {
        var ee = new EventEmitter(),
            calls = [];
        function second(value) { calls.push("second:" + value); }
        ee.on("a", function(value) {
            calls.push("first:" + value);
            ee.off("a", second);
        });
        ee.on("a", second);
        ee.emit("a", 1);
        ee.emit("a", 2);
        test.same(calls, ["first:1", "second:1", "first:2"], "should remove listeners from the next emission");
        test.end();
    });

    test.test(test.name + " - adding a listener during emission", function(test) {
        var ee = new EventEmitter(),
            calls = [];
        ee.on("a", function(value) {
            calls.push("first:" + value);
            if (value === 1)
                ee.on("a", function(value) { calls.push("added:" + value); });
        });
        ee.on("a", function(value) { calls.push("second:" + value); });
        ee.emit("a", 1);
        ee.emit("a", 2);
        test.same(calls, ["first:1", "second:1", "first:2", "second:2", "added:2"], "should defer new listeners until the next emission");
        test.end();
    });

    test.test(test.name + " - nested emission after listener changes", function(test) {
        var ee = new EventEmitter(),
            calls = [];
        function first(value) {
            calls.push("first:" + value);
            ee.off("a", first);
            ee.on("a", function(value) { calls.push("added:" + value); });
            ee.emit("a", 2);
        }
        ee.on("a", first);
        ee.on("a", function(value) { calls.push("second:" + value); });
        ee.emit("a", 1);
        test.same(calls, ["first:1", "second:2", "added:2", "second:1"], "should use the changed listeners only for the nested emission");
        test.end();
    });

    test.test(test.name + " - removing duplicate listeners", function(test) {
        var ee = new EventEmitter(),
            calls = 0;
        function listener() { ++calls; }
        ee.on("a", listener, {}).on("a", listener, {});
        ee.off("a", listener).emit("a");
        test.equal(calls, 0, "should remove every registration of the listener");
        test.end();
    });

    test.test(test.name + " - special event names", function(test) {
        var ee = new EventEmitter();
        var calls = 0;

        test.doesNotThrow(function() {
            ee.off("__proto__", function() {});
        }, "should not throw when removing an absent special event listener");

        ee.on("__proto__", function(arg) {
            ++calls;
            test.equal(arg, 1, "should pass arguments for __proto__ events");
        });
        ee.on("constructor", function(arg) {
            ++calls;
            test.equal(arg, 2, "should pass arguments for constructor events");
        });
        ee.emit("__proto__", 1);
        ee.emit("constructor", 2);

        test.equal(calls, 2, "should dispatch special event names");
        test.equal(Object.getPrototypeOf(ee._listeners), null, "should keep the listener table isolated");
        test.ok(Object.prototype.hasOwnProperty.call(ee._listeners, "__proto__"), "should store __proto__ as an own event key");
        test.ok(Object.prototype.hasOwnProperty.call(ee._listeners, "constructor"), "should store constructor as an own event key");

        ee.off("__proto__");
        ee.off("constructor");
        test.same(ee._listeners.__proto__, [], "should clear __proto__ listeners");
        test.same(ee._listeners.constructor, [], "should clear constructor listeners");
        test.end();
    });

    test.end();
});
