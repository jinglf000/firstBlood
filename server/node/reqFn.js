var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(req,res){
    console.log("调用了/start 的处理程序");

    // function sleep(seconds){ // 在事件队列中 同步操作会阻塞任务的进行，因此尽可能使用非阻塞操作
    //     var startTime = new Date().getTime();
    //     while(new Date().getTime() < startTime + seconds);
    // }
    // sleep(5000);
    // var content = "empty";
    // exec("ls -lah",function(error,stdout,stderr){
    //     content = stdout;
    //     res.writeHead(200,{"Content-Type":"text/plain"});
    //     res.write(content);
    //     res.end();
    // });
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(body);
    res.end();
}
function upload(req,res){
    console.log("调用了/upload 的处理程序");
    console.log(req.method);
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        console.log(files);
        //if(error){return};
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/test.png");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("received image:<br/>");
        res.write("<img src='/show' />");
        res.end();
    });
}
function show(req, res) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(error + "\n");
      res.end();
    } else {
      res.writeHead(200, {"Content-Type": "image/png"});
      res.write(file, "binary");
      res.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;