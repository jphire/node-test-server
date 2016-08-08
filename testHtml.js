// Creates a small node server that can be used to execute POSTed scripts.
// Used to benchmark iothub against NodeJS in execution speed.
// TODO: Add a way to stop executing scripts if they take too long, maybe:
// https://github.com/tjanczuk/tripwire

function requestHandler(req, res) {
  	res.writeHead(200, {'Content-Type': 'application/json'});
  
  	if (req.method == 'GET') {
	    console.log('connection');
	    res.end(JSON.stringify([1,2,43,532]));
	}
	else if (req.method == 'POST') {
	    var scriptCode = '';
 	    req.on('data', function (data) {
                scriptCode += data;
            });

            req.on('end', function () {
                try {
                        console.log('Executing');
                        res.end('hello');
                } catch (e) {
                        res.end('Error occurred: ' + e.message);
                }
            });

	} else {
            console.log('unspported method', req.params, req.body);
	    res.end('Not supported method: ' + req.method);
	}
}
 

var http = require('http');

http.createServer(requestHandler)
 .listen(9000);
