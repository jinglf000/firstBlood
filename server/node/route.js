//  路由处理模块

function route (handle,path,req,res){
    console.log("requset from : " + path);
    if(typeof handle[path] === "function"){
        console.log("he");
        handle[path](req,res);
    }else{
        console.log("没有对应 " + path + "路径的处理程序");
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write("404 NO found");
        res.end();
    }
}

exports.route = route;