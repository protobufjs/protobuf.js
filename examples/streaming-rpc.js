var protobuf = require("..");

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

var Greeter = root.lookup("Greeter"),
    Hello   = root.lookup("Hello"),
    World   = root.lookup("World");

var ended = false;

// Implement: Stream-aware RPC implementation
function rpcImpl(method, requestData, callback) {
    if (ended)
        return;
    if (!requestData) {
        console.log("rpc ended client-side.");
        ended = true;
        return;
    }
    setTimeout(function() {
        try {
            // <exemplary server side code>
            var hello = Hello.decodeDelimited(requestData);
            var responseData = World.encodeDelimited({ message: 'Hello ' + hello.name + ' !' }).finish();
            // </exemplary server side code>
            callback(null, responseData);
        } catch (err) {
            callback(err);
        }
    }, Math.random() * 500);
}

var greeter = Greeter.create(rpcImpl, true, true);

greeter.on("data", function(response, method) {
    console.log("data:", response.message);
});

greeter.on("end", function(method) {
    console.log("ended.");
});

greeter.on("error", function(err, method) {
    console.log("error:", err);
});

greeter.sayHello({ name: 'protocol' });
greeter.sayHello({ name: 'buffers' });
greeter.sayHello({ name: 'for' });

setTimeout(function() {
    greeter.end();
    // ^ Signals rpcImpl that the service has been ended client-side by calling it with a null buffer.
    //   Likewise, rpcImpl can end the stream by calling its callback with an explicit null buffer.

    greeter.sayHello({ name: 'javascript' }); // does nothing
}, 1000);
