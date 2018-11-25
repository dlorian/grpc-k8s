const PROTO_PATH = __dirname + '/../proto/gcd.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const gcd = grpc.loadPackageDefinition(packageDefinition).gcd;

const client = new gcd.GCDService('localhost:50051', grpc.credentials.createInsecure());

client.compute({ a: 2, b: 3 }, (err, response) => console.log(response.result));