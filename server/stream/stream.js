var http = require('http');
var fs 	 = require('fs');
var oppressor = require('oppressor');

// 使用stream管道流的思想来处理大量的数据传输

var server  = http.createServer(function (req, res) {
	var  stream  = fs.createReadStream(__dirname + '/data.txt');

	stream.pipe(oppressor(req)).pipe(res);

	// fs.readFile(__dirname + '/data.txt', function (err, data) {
	// 	res.end(data);
	// });
});
server.listen(8000);

console.log('server is running at 8000');

