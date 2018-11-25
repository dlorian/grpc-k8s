const PROTO_PATH = __dirname + "/../proto/gcd.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const gcd = grpc.loadPackageDefinition(packageDefinition).gcd;

const compute = (call, callback) => {
  console.log(`Received from client '${call.request.a},${call.request.b}'`);
  const result = call.request.a + call.request.b;
  callback(null, { result });
};

const createServer = () => {
  var server = new grpc.Server();
  server.addService(gcd.GCDService.service, { compute });
  return server;
};

const server = createServer();
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
server.start();

console.log("Server is running on port 50051");
