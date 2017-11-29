function handleHTTP(req, res) {
    if(req.method === 'GET') {
        if(req.url === '/') {
            ASQ(function(done) {
                setTimeout(function() {
                    done(Math.random());
                }, 1000);
            })
            .then(function(done, num) {
                setTimeout(function() {
                    res.writeHead(200, {'Content-type': 'text/plain'});
                    res.end('Hello World: ' + num);
                }, 1000);
            });
        } else {
            res.writeHead(403);
            res.end('Bounce nerd!');    
        }
    } else {
        res.writeHead(403);
        res.end('Bounce nerd!');
    }
}

var host = 'localhost';
var port = 8006;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);

var ASQ = require('asynquence');
