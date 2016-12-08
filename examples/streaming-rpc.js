var protobuf = require("..");

// Load a definition with services:

var root = protobuf.Root.fromJSON({
    nested: {
        Greeter: {
            methods: {
                "SayHello": {
                    requestType: 'Hello',
                    requestStream: true,
                    responseType: 'World',
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
            console.log("rpc ended client-side.");
            ended = true;
            return;
        }
        setTimeout(function() {
            try {
                // begin exemplary server side code
                var hello = Hello.decodeDelimited(requestData);
                var responseData = World.encodeDelimited({ message: 'Hello ' + hello.name + ' !' }).finish();
                // end exemplary server side code
                callback(null, responseData);
            } catch (err) {
                callback(err);
            }
        }, Math.random() * 500);
    };
})(), /* requestDelimited? */ true, /* responseDelimited? */ true);

// Listen for events:

greeter.on("data", function(response, method) {
    console.log("data:", response.message);
});

greeter.on("end", function(method) {
    console.log("ended.");
});

greeter.on("error", function(err, method) {
    console.log("error:", err);
});

// Call methods:

greeter.sayHello({ name: 'protocol' });
greeter.sayHello({ name: 'buffers' });
greeter.sayHello(Hello.create({ name: 'for' })); // or use runtime messages

// Listen to and emit your own events if you want:

greeter.on("status", function(code, text) {
    console.log("status:", code, text);
});
greeter.emit("status", 200, "OK");

// And, if applicable, end the service when you are done:

setTimeout(function() {
    greeter.end();
    // ^ Signals rpcImpl that the service has been ended client-side by calling it with a null buffer.
    //   Likewise, rpcImpl can also end the stream by calling its callback with an explicit null buffer.

    greeter.sayHello({ name: 'javascript' }); // does nothing
}, 1000);
