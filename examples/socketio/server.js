var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var open = require('open');
var ProtoBuf = require('protobufjs');
var socketio = require('socket.io');

// Copy dependencies to 'www/' (example specific, you usually don't have to care
var deps = [
    ['long.js', './node_modules/protobufjs/node_modules/bytebuffer/node_modules/long/dist/long.js'],
    ['bytebuffer.js', './node_modules/protobufjs/node_modules/bytebuffer/dist/bytebuffer.js'],
    ['protobuf.js', './node_modules/protobufjs/dist/protobuf.js'],
    ['socket.io.js', './node_modules/socket.io/node_modules/socket.io-client/socket.io.js']
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

// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname, 'www', 'example.proto')),
    Message = builder.build('Message');

// HTTP server
var server = http.createServer(function(req, res) {
    var file = null,
        type = 'text/html';
    if (req.url == '/') {
        file = 'index.html';
    } else if (/^\/(\w+(?:\.min)?\.(?:js|html|proto))$/.test(req.url)) {
        file = req.url.substring(1);
        if (/\.js$/.test(file)) {
            type = 'text/javascript';
        }
    } else if(req.url.lastIndexOf('.js') >= 0){
        file = req.url.substring(1);
        type = 'text/javascript';
    }
    if (file) {
        fs.readFile(path.join(__dirname, 'www', file), function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': type});
                res.end('Internal Server Error: '+err);
            } else {
                res.writeHead(200, {'Content-Type': type});
                res.write(data);
                res.end();
                console.log('Served www/'+file);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('Not Found');
    }
});

var port = 3000;
server.listen(port);
server.on('listening', function() {
    console.log('Server started');
    open('http://localhost:'+port+'/');
});
server.on('error', function(err) {
    console.log('Failed to start server:', err);
    process.exit(1);
});

// SocketIO adapter
var io = socketio.listen(server);
io.set('log level', 1);
io.sockets.on('connection', function(socket){
    console.log(socket.id+' connecting...');
    socket.on('disconnect', function() {
        console.log('WebSocket disconnected');
    });
    socket.on('message', function(data) {
        try {
            // Decode the Message
            var msg = Message.decode(data);
            console.log('Received: '+msg.text);
            // Transform the text to upper case
            msg.text = msg.text.toUpperCase();
            // Re-encode it and send it back
            socket.send(msg.toBuffer());
            console.log('Sent: '+msg.text);
        } catch (err) {
            console.log('Processing failed:', err);
        }
    });
});