// Service implementation using the `@grpc/grpc-js` npm package

const grpc = require('@grpc/grpc-js')

const Client = grpc.makeGenericClientConstructor({})
const client = new Client(
  grpcServerUrl,
  grpc.credentials.createInsecure()
)

const rpcImpl = function(method, requestData, callback) {
  const methodPath = `/${method.parent.fullName.slice(1)}/${method.name}`;
  client.makeUnaryRequest(
    methodPath,
    arg => arg,
    arg => arg,
    requestData,
    callback
  )
}
