'use strict';

const Transform = require('stream').Transform;

class Rotate extends Transform {
	constructor (n) {
		super()
		this.offset = (n || 13) % 26;
	}

	_transform(buf, enc, next) {
		var res = buf.toString().split('').map(c => {
			var code = c.charCodeAt(0);

			if (c >= 'a' && c <= 'z') {
				code += this.offset;
				if( code > 'z'.charCodeAt(0)){
					code -= 26;
				}
			}else if (c >= 'A' && c <= 'Z') {
				code += this.offset;
				if (code > 'Z'.charCodeAt(0)){
					code -= 26;
				}
			}

			return String.fromCharCode(code);
		}).join('');

		// 调用push方法将变换后的数据添加到可读端
		this.push(res);

		// 调用 next 处理下一个
		next()
	}
}

var transform = new Rotate(3);

transform.on('data' , data => {
	process.stdout.write(data);
});
setTimeout(() => {
	transform.write('aaaa \n');
},0	)

setTimeout(() => {
	transform.write('bbbb \n');
	transform.end();
},10)



