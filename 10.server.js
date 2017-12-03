function handleHTTP(req, res) {
    if(req.method === 'GET') {
        if(/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.addListener('end', function() {
                req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
                static_files.serve(req, res);
            });
            req.resume();
        } else if(req.url === '/jquery.js') {
            static_files.serve(req, res);
        } else {
            res.writeHead(403);
            res.end('Bounce nerd!');    
        }
    } else {
        res.writeHead(403);
        res.end('Bounce nerd!');
    }
}

function handleIO(socket) {
    function disconnect() {
        clearInterval(interval);
        console.log('client disconnected');
    }

    console.log('client connected');
    socket.on('disconnect', disconnect);

    var interval = setInterval(function() {
        socket.emit('hello', Math.random());
    }, 1000);

    socket.on('marco', function(msg) {
        socket.broadcast.emit('polo', msg);
    });

    socket.on('spy', function(x, y) {
        socket.broadcast.emit('spy', {x, y});
    });
}

var host = 'localhost';
var port = 8006;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);

var ASQ = require('asynquence');

var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);

var io = require('socket.io').listen(http_serv);

io.on('connection', handleIO);

io.configure(function() {
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.set('log level', 1);
    io.set('transports', [
        'websocket',
        'xhr-polling',
        'jsonp-polling'
    ]);
});
