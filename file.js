const fs = require('fs');

fs.readFile('server.js', function(err, data){
	console.log(data);
});