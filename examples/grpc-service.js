// Legacy example for the deprecated `grpc` package.
// Prefer `@grpc/grpc-js` for new code.

const grpc = require('grpc')

const Client = grpc.makeGenericClientConstructor({})
const client = new Client(
  grpcServerUrl,
  grpc.credentials.createInsecure()
)

const rpcImpl = function(method, requestData, callback) {
  client.makeUnaryRequest(
    method.name,
    arg => arg,
    arg => arg,
    requestData,
    callback
  )
}
