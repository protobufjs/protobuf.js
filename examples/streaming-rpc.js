// this example demonstrates how to consume a streaming rpc service.

/*eslint-disable strict, no-console*/
var protobuf = require("..");

// Load a definition with services:

var root = protobuf.Root.fromJSON({
    nested: {
        Greeter: {
            methods: {
                "SayHello": {
                    requestType: "Hello",
                    requestStream: true,
                    responseType: "World",
                    responseStream: true
                }
            }
        },
        Hello: {
            fields: {
                name: {
                    type: "string",
                    id: 1
                }
            }
        },
        World: {
            fields: {
                message: {
                    type: "string",
                    id: 1
                }
            }
        }
    }
});

// Get its types:

var Greeter = root.lookup("Greeter"),
    Hello   = root.lookup("Hello"),
    World   = root.lookup("World");

// Provide a stream-aware RPC implementation:

var greeter = Greeter.create(/* rpcImpl */ (function() { // API documentation: Service#create
    var ended = false;
    return function myRPCImpl(method, requestData, callback) {
        if (ended)
            return;
        if (!requestData) {
            ended = true;
            return;
        }
        // in a real-world scenario, the client would now send requestData to a server using some
        // sort of transport layer (i.e. http), wait for responseData and call the callback.
        performRequestOverTransportChannel(requestData, function(responseData) {
            callback(null, responseData);
        });
    };
})(), /* requestDelimited? */ true, /* responseDelimited? */ true);

// examplary server-side code for the sake of this example
function performRequestOverTransportChannel(requestData, callback) {
    setTimeout(/* simulated delay */function() {
        // 1. server decodes the request
        var request = Hello.decodeDelimited(requestData);
        // 2. server handles the request and creates a response
        var response = { message: "Hello " + request.name };
        setTimeout(/* simulated delay */function() {
            // 3. server encodes and sends the response
            callback(World.encodeDelimited(response).finish());
        }, Math.random() * 250);
    }, Math.random() * 250);
}

// Listen for events:

greeter.on("data", function(response, method) {
    console.log("data in " + method.name + ":", response.message);
});

greeter.on("end", function() {
    console.log("end");
});

greeter.on("error", function(err, method) {
    console.log("error in " + method.name + ":", err);
});

// Call methods:

greeter.sayHello({ name: "one" });
greeter.sayHello(Hello.create({ name: "two" })); // or use runtime messages

// Listen to and emit your own events if you like:

greeter.on("status", function(code, text) {
    console.log("custom status:", code, text);
});

greeter.emit("status", 200, "OK");

// And, if applicable, end the service when you are done:

setTimeout(function() {
    greeter.end();
    // ^ Signals rpcImpl that the service has been ended client-side by calling it with a null buffer.
    //   Likewise, rpcImpl can also end the stream by calling its callback with an explicit null buffer.
    greeter.sayHello({ name: "three" }, function(err) {
        console.error("this should fail: " + err.message);
    });
}, 501);
