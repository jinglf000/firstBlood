/**
 * ###### Fri Jun 23 16:18:53 CST 2017
 * @author jinglf000
 * @description 文件的流读取，stream用于node的IO操作,（为异步操作）；
 *
 */

// 无法处理“读写”流不一致的情况
var fs = require('fs');

// var readStream = fs.createReadStream('message.txt');
// var writeStream = fs.createWriteStream('nihao.js');

// readStream.on('data', function (data) {//
// 	writeStream.write(data);
// });

// readStream.on('end', function () {
// 	writeStream.end();
// });

// 优化

// var readStream = fs.createReadStream('message.txt');
// var writeStream = fs.createWriteStream('nihao.js');

// readStream.on('data', function (data) {// 有数据读取，开始写
// 	if (writeStream.write(data) === false) {// 如果没有写完，暂停读取流
// 		readStream.pause();
// 	}
// });

// writeStream.on('drain', function () {// 写完之后继续读取
// 	readStream.resume();
// });

// readStream.on('end', function () {// 没有数据时，关闭数据流
// 	writeStream.end();
// });

// 使用 pipe
fs.createReadStream('message.txt').pipe(fs.createWriteStream('nihao.jsx'));
