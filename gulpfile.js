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
    proxy       = require('http-proxy-middleware'),
    friendlyFormatter = require('eslint-friendly-formatter'),
    eslint      = require('gulp-eslint');

    // http://130.10.9.19:8081/syjyzt/qtgl/grqz/GwssAction.do?method=gwssCx

gulp.task('eslint',function(){
    gulp.src('./src/assest/js/base.js')
        .pipe(eslint({
            configFile : '.eslintrc.js',
            fix : true
        }))
        .pipe(eslint.format(friendlyFormatter))
        // .pipe(eslint.failAfterError());

    // return gulp.watch('./src/assest/js/*.js',event => {
    //     if (event.type !== 'deleted'){
    //         gulp.src(event.path)
    //             .pipe(lintAndPrint,{end: false});
    //     }
    // })
    
}); 
gulp.task('lint',function(){
    gulp.watch('./src/assest/js/base.js',['eslint'])
});


gulp.task('dev',['lint'],function(){
    // proxy
    var apiProxy = proxy('/syjyzt',{
        target: 'http://130.10.9.19:8081',
        changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
        logLevel: 'debug'
    })

    // borwerSync 
    browserSync({
        server: {
            baseDir: 'src',
            middleware: [apiProxy]
        },
        port : 8080,
        logPrefix : 'Gold',
        tunnel: false
    });
    

    gulp.watch(['**/*.html','**/*.css','**/*.js'],{cwd: 'src'},reload);
    
});