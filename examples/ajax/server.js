var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var open = require('open');

// Copy dependencies to "www/" (example specific, you usually don't have to care
var deps = [
    ['long.js', './node_modules/protobufjs/node_modules/bytebuffer/node_modules/long/dist/long.js'],
    ['bytebuffer.js', './node_modules/protobufjs/node_modules/bytebuffer/dist/bytebuffer.js'],
    ['protobuf.js', './node_modules/protobufjs/dist/protobuf.js']
];
var frontendDirectory = 'www';
for (var i=0, dep; i<deps.length; i++) {
    dep = deps[i];
    if (!fs.existsSync(path.join(__dirname, frontendDirectory, dep[0]))) {
        console.log('Copying '+dep[0]+' from '+dep[1]);
        try {
            fs.writeFileSync(path.join(__dirname, frontendDirectory, dep[0]), fs.readFileSync(path.join(__dirname, dep[1])));
        } catch (err) {
            console.log('Copying failed: '+err.message);
            console.log('\nDid you run `npm install` ?');
            process.exit(1);
        }
    }
}

var ProtoBuf = require('protobufjs');
var TestProtobuf = ProtoBuf.loadProtoFile(path.join(__dirname, frontendDirectory, 'TestProtobuf.proto')).build('TestProtobuf'),
    TestProto = TestProtobuf.TestProto;

var BufferHelper = require('bufferhelper');

var cache = {};
var port = 3000;

var server = http.createServer(function(request, response){
    var filePath = false;
    if(request.url == '/'){
        filePath = 'index.html';
    }else if(request.method === 'POST' && request.url.lastIndexOf('proto') != -1){
        //http://www.infoq.com/cn/articles/nodejs-about-buffer/
        var bufferHelper = new BufferHelper();
        request.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        request.on('end', function () {
            var buffer = bufferHelper.toBuffer();
            var testProtoData = TestProto.decode(buffer);
            response.writeHead(200, {'Content-Type': 'application/x-protobuf'});
            response.end(testProtoData.toBuffer());
        });

        return;
    }else{
        filePath = request.url;
    }

    serveStatic(response, cache, path.join(__dirname, frontendDirectory, filePath));
});

server.listen(port, function(){
    console.log('Server listening on porn '+port);
    open('http://localhost:'+port);
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});

function serveStatic(response, cache, absPath){
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else{
        fs.exists(absPath, function(exists){
            if(!exists){
                send404(response);
                return;
            }

            fs.readFile(absPath, function(err, data){
                if(err){
                    send404(response);
                    return;
                }

                cache[absPath] = data;
                sendFile(response, absPath, data);
            });
        });
    }
}

function send404(response){
    response.writeHead(404, {'content-type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContens){
    response.writeHead(200, {'content-type':mime.lookup(path.basename(filePath))});
    response.end(fileContens);
}