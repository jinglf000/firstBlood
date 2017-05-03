// 使用gulp来做打包发布工作
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var gulp_rename = require('gulp-rename');

console.log(__dirname);
gulp.task('less',function(){
    gulp.src('./src/assest/bootstrap/less/bootstrap.less')
    .pipe(gulp_rename(function(path){
        console.log(path);
    }))
    .pipe(less({
        paths: [ path.join(__dirname,'src','assest','bootstrap','less'),path.join(__dirname,'src','assest','bootstrap','less','mixins')]
    }))
    .pipe(gulp.dest('css/'));
});


