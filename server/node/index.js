// 主引导模块 用于启动应用
var server = require('./server.js');
var router = require('./route.js');
var reqFn  = require("./reqFn.js");// 使用顶层传递 函数的方式而不是，层层嵌套

// 不同路由 对应的不同是事件处理程序
var handle = {};
handle['/'] = reqFn.start;
handle['/start'] = reqFn.start;
handle['/upload'] = reqFn.upload;
handle['/show'] = reqFn.show;
// 开启服务
server.start(router.route,handle);