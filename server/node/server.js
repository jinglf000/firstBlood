var http = require("http");
var url = require('url');
var queryStr =  require("querystring");

function start(route,handle){
    function requestListener(req,res){
       var pathname = url.parse(req.url).pathname;
        route(handle, pathname,req,res);
    }
    http.createServer(requestListener).listen(3333);
    console.log("server is runing~~");
}
module.exports.start = start;