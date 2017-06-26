var fs = require('fs');

var xx = fs.createReadStream('./test.txt');

console.log(xx);


xx.resume();

xx.on('end', function () {
	console.log('DONE');
});

setTimeout(function () {
	xx.addListener('data', function (data) {
		setTimeout( () => {
			console.log(data.toString());
		},1000)
	});
}, 0);
