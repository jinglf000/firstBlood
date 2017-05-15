// 使用gulp来做打包发布工作
const gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    gulp_rename = require('gulp-rename'),
    gulp_refresh = require('gulp-refresh'),
    http        = require('http'),
    st          = require('st'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    // httpProxy   = require('http-proxy'),
    proxy       = require('http-proxy-middleware'),
    modRewrite  = require('connect-modrewrite');
    // proxy = httpProxy.createProxyServer({
    //     target : 'http://www.baidu.com',
    //     // target : {
    //     //     host : '',
    //     //     port : ''
    //     // }
    // });


    // proxy.on('error',function(err ,req ,res){
    //     console.log(err);
    //     res.writeHead(500, {
    //         'Content-Type' : 'text/plain'
    //     });
    //     res.end("代理服务出错啦~~~~~");
    // })

    var apiProxy = proxy('/api',    {
        target: 'https://translate.google.com.hk/',
        changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
        logLevel: 'debug'
    })

// less 编译：
gulp.task('less',function(){
    gulp
    .src('./src/assest/bootstrap/less/bootstrap.less')
    .pipe(gulp_rename(function(path){
        console.log(path);
    }))
    .pipe(less({// 指定less文件中@import引用文件目录
        paths: [ path.join(__dirname,'src','assest','bootstrap','less'),path.join(__dirname,'src','assest','bootstrap','less','mixins')]
    }))
    .pipe(gulp.dest('./src/assest/bootstrap/css/'));
});

gulp.task('fileChange',function(){
    gulp
    .src('./src/**/*.*')
    // .pipe(gulp.dest('dist'))
    .pipe(gulp_refresh());
});

gulp.task('dev_old',function(){
    gulp_refresh.listen({
        basrPath : path.join(__dirname,'src'),
        port : 8081
    })
    gulp.watch('./src/**/*.*',['fileChange']);
}); 
 
gulp.task('dev',function(){
    browserSync({
        server: {
            baseDir: 'src',
            // middleware : function(req , res ,next ){
            //     // console.log(req);
            //     // if(req.originalUrl.indexOf('/apisss/')){
            //     //     proxy.web(req,res);
            //     // }
            //     // next();
                
            // }
            // middleware: [
            //     modRewrite([
            //         '^/test/proxy/(.*)$ https://translate.google.com.hk/$1 [P]'
            //     ])
            // ]
            middleware: [apiProxy]
        },
        tunnel: true
    });
    gulp.watch(['**/*.html','**/*.css','**/*.js'],{cwd: 'src'},reload);
});