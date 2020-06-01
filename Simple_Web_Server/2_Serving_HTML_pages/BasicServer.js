// Modules needed

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs');

// Types of file which we must be able to serve

const mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpg",
	"png" : "text/png",
	"js" : "text/javascript",
	"css" : "text/css"
};

// Now we will use create server function

http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(), unescape(uri));
	console.log('Loading'+uri);
	var stats;

	// Now we need to confirm that the html page is there

	try{
		stats=fs.lstatSync(fileName);
	}catch(e){
		res.writeHead(404,{'Content-type' : 'text/plain'});
		res.write('404 not found');
		res.end();
		return;
	}

	// Now if there is a file then

	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200,{'Content-type' : mimeType});
		
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if(stats.isDirectory()) {
		//We are going to redirect it to index.html file
		res.writeHead(302,{
			'Location' : 'index.html'
		});
		res.end();
	} else{
		res.writeHead(500,{'Content-type' : 'text/plain'});
		res.write('500 Internal error\n');
		res.end();
	}


}).listen(1337);