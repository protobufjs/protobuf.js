var tape = require("tape");

var protobuf = require("..");

tape.test("RPC", function(test) {

    protobuf.load("tests/data/rpc.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var MyService  = root.lookup("MyService"),
            MyMethod   = MyService.get("MyMethod").resolve(),
            MyRequest  = MyMethod.resolvedRequestType,
            MyResponse = MyMethod.resolvedResponseType;

        function rpc(method, requestData, callback) {

            test.test("should call the rpc impl with", function(test) {
                test.equal(method, MyMethod, "the reflected method");
                test.ok(requestData.length, "a buffer");
                test.ok(typeof callback === 'function', "a callback function");
                test.end();
            });
            test.test("should call with a buffer that contains", function(test) {
                test.equal(requestData[0], 3, "ldelim 3");
                test.equal(requestData[1], 10, "id 1, wireType 2");
                test.equal(requestData[2], 1, "length 1");
                test.equal(requestData[3], 0x2f, "the original string");
                test.end();
            });

            setTimeout(function() {
                callback(null, MyResponse.encode({
                    status: 200
                }).finish());
            });
        }
        
        var MyService = root.lookup("MyService");
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

});