var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins	= gulpLoadPlugins();

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