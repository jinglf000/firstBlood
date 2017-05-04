// 使用gulp来做打包发布工作
const gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    gulp_rename = require('gulp-rename'),
    gulp_refresh = require('gulp-refresh'),
    http        = require('http'),
    st          = require('st'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;
    
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
            baseDir: 'src'
        }
    });
    gulp.watch(['**/*.html','**/*.css','**/*.js'],{cwd: 'src'},reload);
});