/**
 * 测试服务
 * @author jinglf000
 */
const express = require("express");
const path = require("path");

const app = express();

app.set('port',process.env.PORT || 8080);

app.use(express.static(path.join(__dirname,"/src")));

app.listen(app.get('port'));

console.log("server is running at 8080");
