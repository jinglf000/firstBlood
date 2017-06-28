var stream = require('stream');

var c = 0;

var readable = stream.Readable({// 生产流
	highWaterMark: 2,			// buffer暂存区的大小
	read: function () {			// 产生流的函数 buffer为二进制文件，显示方式问16进制
		process.nextTick( () => {
			var data = c < 26 ? String.fromCharCode(c++ + 97) : null;
			console.log("push: ",data);
			this.push(data);
		})
	}
});

var transform = stream.Transform({// 转换流
	highWaterMark: 2,			  // buffer暂存区的大小
	transform: function (buf, enc, next) {
		console.log('transform:' , buf);// 打印出来的为<Buffer 61>（16进制） ---> 97 （10机制）；
		next(null, buf);				// next (null, buff)两个功能：第一执行下一步的写操作，第二把数据流传递
	}
});

var writeable = stream.Writable({
	highWaterMark: 2,
	write: function (buf, enc, next){
		console.log('write: ', buf);
	}
});

readable.pipe(transform).pipe(process.stdout);


