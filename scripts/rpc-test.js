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

function rpcImpl(method, requestData, callback) {
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

greeter.on("data", function(response) {
    console.log("data:", response.message);
});

greeter.on("end", function() {
    console.log("ended.");
});

greeter.on("error", function(err) {
    console.log("error:", err);
});

greeter.sayHello({ name: 'node' });
greeter.sayHello({ name: 'protobuf' });
greeter.sayHello({ name: 'paralin' });

setTimeout(function() {
    greeter.end();
    greeter.sayHello({ name: 'dcode' }); // does nothing
}, 1000);
// Likewise, the RPC impl can end the stream by calling its callback with an explicit null message
