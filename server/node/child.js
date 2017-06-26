// 这是一个子进程

console.log('这是一个子进程');
console.log(process.pid);// 进程的pid
console.log(process.execPath);// 得到node命令程序的完整路径
console.log(process.cwd());// 得到当前的工作目录
console.log(process.memoryUsage());// 内存使用情况




process.on('message', function (m) {
    console.log(m);
});

// process 表示自身进程。而 fork 出来的进程，相对于当前进程，fork出来的都是子进程，这句话要理解好。
// 所有process 都不认为自己是子进程，而只有别的进程通过 fork 它时，fork它的这个所谓主进程会当作它是子进程。
// pocess 表示当前进程，
// js文件是死的，fork后才生成一个进程，多次fork会生成多个子进程，而相互之间毫无关系。
setInterval(function(){
    process.send("从子进程 来");
},2000);