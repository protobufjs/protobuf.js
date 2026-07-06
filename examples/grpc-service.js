// this example demonstrates how to use reflected services with gRPC through the
// `@grpc/grpc-js` npm package, covering both the server and the client side.

/*eslint-disable strict, no-console*/
const grpc = require("@grpc/grpc-js"); // npm install @grpc/grpc-js
const protobuf = require(".."); // require("protobufjs")

const root = protobuf.parse(`
    syntax = "proto3";
    package example;

    service Greeter {
        rpc SayHello (HelloRequest) returns (HelloReply);
    }

    message HelloRequest {
        string name = 1;
    }

    message HelloReply {
        string message = 1;
    }
`).root.resolveAll();

const service = root.lookupService("example.Greeter");

// A gRPC service definition can be built entirely from the reflected service,
// reusing each method's gRPC-style path and its request and response types:

function serviceDefinition(service) {
    const definition = {};
    for (const method of service.methodsArray) {
        definition[method.name] = {
            path: method.path,
            requestStream: Boolean(method.requestStream),
            responseStream: Boolean(method.responseStream),
            requestSerialize: (message) => method.resolvedRequestType.encode(message).finish(),
            requestDeserialize: (data) => method.resolvedRequestType.decode(data),
            responseSerialize: (message) => method.resolvedResponseType.encode(message).finish(),
            responseDeserialize: (data) => method.resolvedResponseType.decode(data)
        };
    }
    return definition;
}

(async function main() {

    // Server: register the service definition with a plain implementation object

    const server = new grpc.Server();
    server.addService(serviceDefinition(service), {
        SayHello(call, callback) {
            callback(null, { message: "Hello, " + call.request.name + "!" });
        }
    });

    const port = await new Promise((resolve, reject) => {
        server.bindAsync("127.0.0.1:0", grpc.ServerCredentials.createInsecure(),
            (err, port) => err ? reject(err) : resolve(port));
    });

    // Client: connect a reflected service client to a generic gRPC client. Since
    // protobuf.js already handles message encoding and decoding, requests and
    // responses pass through as raw data:

    const Client = grpc.makeGenericClientConstructor({});
    const client = new Client("127.0.0.1:" + port, grpc.credentials.createInsecure());

    const greeter = service.create(function rpcImpl(method, requestData, callback) {
        if (!method) { // signals that the service has been ended
            client.close();
            return;
        }
        client.makeUnaryRequest(method.path, (data) => data, (data) => data, requestData, callback);
    });

    // Service methods support both callbacks and promises:

    const reply = await greeter.sayHello({ name: "world" });
    console.log(reply.message);

    greeter.end();
    server.forceShutdown();
})();
