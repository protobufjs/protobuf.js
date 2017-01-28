var tape = require("tape");

var protobuf = require("..");

tape.test("runtime services", function(test) {

    // FIXME

    protobuf.load("tests/data/rpc.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var MyService  = root.lookup("MyService"),
            MyMethod   = MyService.get("MyMethod").resolve(),
            MyRequest  = MyMethod.resolvedRequestType,
            MyResponse = MyMethod.resolvedResponseType;

        var statusCodes = [200, 400];
        var timesCalled = 0;
       
        MyService = root.lookup("MyService");

        test.plan(2);

        test.test(test.name + " - closed server-side", function(test) {

            function rpc(method, requestData, callback) {
                if (++timesCalled < 3) {
                    test.test(test.name + " - should call the rpc impl with", function(test) {
                        test.equal(method, MyMethod, "the reflected method");
                        test.ok(requestData.length, "a buffer");
                        test.ok(typeof callback === "function", "a callback function");
                        test.end();
                    });
                    test.test(test.name + " - should call with a buffer that contains", function(test) {
                        test.equal(requestData[0], 3, "ldelim 3");
                        test.equal(requestData[1], 10, "id 1, wireType 2");
                        test.equal(requestData[2], 1, "length 1");
                        test.equal(requestData[3], 0x2f, "the original string");
                        test.end();
                    });
                    setTimeout(function() {
                        var status = statusCodes.shift();
                        callback(null, MyResponse.encode({
                            status: status
                        }).finish());
                        if (status === 200)
                            callback(null, null); // ended server-side
                    });
                } else {
                    test.equal(requestData, null, "should signal ended client-side");
                }
            }

            var service = MyService.create(rpc, true, false);
            service.myMethod(MyRequest.create({
                path: "/"
            }), function(err, response) {
                if (err)
                    return test.fail(err.message);
                test.ok(response instanceof MyResponse.ctor, "should return an instance of MyResponse");
                test.deepEqual(response, {
                    status: 200
                }, "should return status 200");

                test.end();
            });
        });

        test.test(test.name + " - closed client-side", function(test) {

            function rpc(method, requestData, callback) {
                if (++timesCalled < 3) {
                    test.test(test.name + " - should call the rpc impl with", function(test) {
                        test.equal(method, MyMethod, "the reflected method");
                        test.ok(requestData.length, "a buffer");
                        test.ok(typeof callback === "function", "a callback function");
                        test.end();
                    });
                    test.test(test.name + " - should call with a buffer that contains", function(test) {
                        test.equal(requestData[0], 3, "ldelim 3");
                        test.equal(requestData[1], 10, "id 1, wireType 2");
                        test.equal(requestData[2], 1, "length 1");
                        test.equal(requestData[3], 0x2f, "the original string");
                        test.end();
                    });
                    setTimeout(function() {
                        var status = statusCodes.shift();
                        callback(null, MyResponse.encode({
                            status: status
                        }).finish());
                        if (status === 200)
                            callback(null, null); // ended server-side
                    });
                } else {
                    test.equal(requestData, null, "should signal ended client-side");
                }
            }

            var service = MyService.create(rpc, true, false);
            service.myMethod(MyRequest.create({
                path: "/"
            }), function(err, response) {
                if (err)
                    return test.fail(err.message);
                test.ok(response instanceof MyResponse.ctor, "should return an instance of MyResponse");
                test.deepEqual(response, {
                    status: 400
                }, "should return status 400");
                service.end(); // ended client-side

                var count = 0,
                    total = 1;

                if (typeof Promise !== "undefined") {
                    ++total;
                    var promise = service.myMethod(MyRequest.create({ path: "/" }));
                    promise.catch(function(err) {
                        test.ok(err, "should return an error if already ended (Promise)");
                        if (++count === total)
                            test.end();
                    });
                    test.ok(promise instanceof Promise, "should return a promise if callback has been omitted (even if already ended)");
                }

                service.myMethod(MyRequest.create({ path: "/" }), function(err) {
                    test.ok(err, "should return an error if already ended");
                    if (++count === total)
                        test.end();
                });
            });
        });
    });
});

function fakeRPC(test) {
    function rpc(method, requestData, callback) {
        if (++timesCalled < 3) {
            test.test(test.name + " - should call the rpc impl with", function(test) {
                test.equal(method, MyMethod, "the reflected method");
                test.ok(requestData.length, "a buffer");
                test.ok(typeof callback === "function", "a callback function");
                test.end();
            });
            test.test(test.name + " - should call with a buffer that contains", function(test) {
                test.equal(requestData[0], 3, "ldelim 3");
                test.equal(requestData[1], 10, "id 1, wireType 2");
                test.equal(requestData[2], 1, "length 1");
                test.equal(requestData[3], 0x2f, "the original string");
                test.end();
            });
            setTimeout(function() {
                var status = statusCodes.shift();
                callback(null, MyResponse.encode({
                    status: status
                }).finish());
                if (status === 200)
                    callback(null, null); // ended server-side
            });
        } else {
            test.equal(requestData, null, "should signal ended client-side");
        }
    }
    return rpc;
}