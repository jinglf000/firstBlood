var readable = require('stream').Readable;
var rs = readable();
var c = 97;

rs._read = function () {
	rs.push(String.fromCharCode(c++));
	if (c > 'z'.charCodeAt(0)) {
		rs.push(null);
	}
};

rs.pipe(process.stdout);

process.on('exit', function () {
	console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', process.exit);
