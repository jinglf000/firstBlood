var fs = require('fs');
var ws = fs.createWriteStream('message.txt');

ws.write('beep 通过流来进行，文件写入');

setTimeout(function () {
	ws.end('boop\n');
}, 1000);

var Stream = require('stream');
var stream = new Stream();
stream.readable = true;

var c = 0;
var iv = setInterval(function () {
	if (++c >= 120) {
	clearInterval(iv);
	stream.emit('end');
}    else stream.emit('data', String.fromCharCode(c));
}, 100);

stream.pipe(process.stdout);
