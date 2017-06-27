// var fs = require('fs');

// var xx = fs.createReadStream('./test.txt');

// 流的初始状态（State.flowing)为null
// 通过调用一下方法，则可以实现流的‘流动模式’；在流动模式下流会源源不断的从底层读取数据
// 并通过'data'事件来通知
// xx.resume();
// xx.pipe(process.stdout());
// xx.on('data', function (data) {
// 	var q = xx.read();
// 	console.log(data.toString());
// 	console.log(q.toString());
// });
var Readable = require('stream').Readable;

var dataSource = ['a', 'b', 'c'];

var readable = Readable();

readable._read = function () {
	process.nextTick(() => {
		if (dataSource.length) {
			this.push(dataSource.shift());
		} else {
			this.push(null);
		}
	});
};


readable.on('end', function () {
	console.log('DONE');
});

//
readable.pause();

readable.on('data', function (data) {
	process.stdout.write('\ndata: ' + data);
});

// _read为同步的时候，通过read()方法可以直接获取到数据

// var readData = readable.read();

// while (readData !== null) {
// 	process.stdout.write('\nread: ' + readData);
// 	readData = readable.read();
// 	console.log(readData);
// }

readable.on('readable', function () {
	// while (null !== readable.read());
	console.log(23);
});

console.log(readable);
