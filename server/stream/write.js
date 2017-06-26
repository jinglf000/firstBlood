var fs = require('fs');
var util = require('util');
var zlib = require('zlib');
var read = fs.createReadStream('data.txt');
var write = fs.createWriteStream('test.txt.gz');
util.inspect.styles = {
	number: 'yellow'
};

read.pipe(zlib.createGzip()).pipe(write);

read.on('data', function (data) {
	var str = data.toString();
	console.log(util.inspect(str, {color: true}));
	console.log('\n\n\r\n\r\n');
	console.log(util.inspect(str.length, {color: true}));
});


