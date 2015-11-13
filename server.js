// Creates a small node server that can be used to execute POSTed scripts.
// Used to benchmark iothub against NodeJS in execution speed.
// TODO: Add a way to stop executing scripts if they take too long, maybe:
// https://github.com/tjanczuk/tripwire

function requestHandler(req, res) {
  	res.writeHead(200, {'Content-Type': 'application/json'});
  
  	if (req.method == 'POST') {
	    var scriptCode = '';

	    req.on('data', function (data) {
	        scriptCode += data;
	    });

	    req.on('end', function () {
	        try {
	        	res.end(eval(scriptCode));
	        } catch (e) {
	        	res.end('Error occurred: ' + e.message);
	        }
	    });
	} else {
		res.end('Not supported method: ' + req.method);
	}
}
 

var http = require('http');

http.createServer(requestHandler)
 .listen(3000);
