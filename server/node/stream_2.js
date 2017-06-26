// var stream = require('stream');
// var Readable =  stream.Readable;

// var rs = new Readable;

// // rs.push('beep');
// // rs.push('boop \n');
// // rs.push(null);

// // rs.pipe(process.stdout);


// var c = 97;

// rs._read = function (){
//     rs.push(String.fromCharCode(c++));
//     if(c > 'z'.charCodeAt(0)) {
//         rs.push(null);
//     }
// };

// rs.pipe(process.stdout);

var Readable = require('stream').Readable;
var rs = Readable();

var c = 97 - 1;

rs._read = function () {
    if (c >= 'z'.charCodeAt(0)) return rs.push(null);

    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};

rs.pipe(process.stdout);

process.on('exit', function () {
    console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', process.exit);