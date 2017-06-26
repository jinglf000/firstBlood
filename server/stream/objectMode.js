// 流的objectMode 模式

var Stream = require('stream');

var source = [];
for (var i = 0; i < 1520; i ++) {
	source.push(i);
}

var readable = Stream.Readable({
	read: function () {
		var data = source.shift();
		data = data === undefined ? null : data;
		this.push(data.toString());
	}
});

readable.pause();

readable.on('data', function (data) {
	console.log('data: +++ +' + data);
});

var xxx = readable.read();

while (xxx !== null ) {
	process.stdout.write('\nread : ' + xxx);
	xxx = readable.read();
}
