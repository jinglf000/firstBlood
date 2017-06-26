//  流

'use strict';

var fs = require('fs');

// 打开一个流

var rs = fs.createReadStream('./index.js', 'utf-8');

rs.on('data', function (chunk){
    console.log("==DATA");
    console.log(chunk);
});

rs.on('end', function (){
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR' + err);
});

var  ws1 = fs.createWriteStream('stream测试.txt', 'utf-8');

ws1.write('我使用Stream来写入数据...\r\n');
ws1.write('而不是使用fs.模块中的write来进行写文件的操作');
ws1.write('end');
ws1.end();

// var fs = require('fs');

// fs.readFile('../movie.rmvb', function (err, data) {
// 	if ( !err ) {
// 		console.log(data);
// 	}
// });

// fs.createReadStream('../movie.rmvb').pipe(process.stdout);


'use strict';
const Readable = require('stream').Readable;

class ToReadable extends Readable {
	// 构造函数
	constructor (iterator) {
		supper();
		this.iterator = iterator;
	}

	// 原型上的方法
	// 产生数据的方法
	_read() {
		const res = this.iterator.next();
		if (res.done) {
			//
			return this.push(null);
		}

		setTimeout(() => {
			this.push(res.value + '\n');
		},0)
	}
}

module.exports = ToReadable;
