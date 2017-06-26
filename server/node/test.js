// node 进程测试
// 当前文档就是主进程
const fs  = require('fs');
const cdr = require('child_process');
const util = require('util');
const childExec = cdr.exec;

setTimeout(function () {
    console.log(process.pid);
},100);

setTimeout(function () {
    console.log(process.pid);
},200);

process.on('uncaughtException',function (e) {
    console.log(e);
});
process.on('exit',function (e) {
    console.log('进程退出-----',e);
});



// 执行子进程
var cp = cdr.fork(__dirname + '/child.js');
// childExec('start https:www.google.com.hk'); 打开浏览器

// 干掉子进程
// setTimeout(function () {
//     cp.kill();
// },3000);

// 一旦主进程收到信息，则向cp（子进程）发送新信息
cp.on('message', function (m) {
    console.log(m);
    cp.send('HI !');
});

// childExec('clear');

