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
