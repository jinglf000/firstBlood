// 使用gulp来做打包发布工作
var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	gulp_rename = require('gulp-rename'),
	gulp_refresh = require('gulp-refresh'),
	http = require('http'),
	st = require('st'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	proxy = require('http-proxy-middleware'),
	friendlyFormatter = require('eslint-friendly-formatter'),
	eslint = require('gulp-eslint');

// http://130.10.9.19:8081/syjyzt/qtgl/grqz/GwssAction.do?method=gwssCx

gulp.task('eslint', function () {
	gulp.src('./src/assest/js/*.js')
		.pipe(eslint({
			configFile: '.eslintrc.js',
			fix: true
		}))
		.pipe(eslint.format(friendlyFormatter));
});
gulp.task('lint', function () {
	gulp.watch('./src/assest/js/*.js', ['eslint']);
});


gulp.task('dev', function () {
	// proxy
	var apiProxy = proxy(['/api', '/syjyztc'], {
		// target: 'http://localhost:10000/mock/5938ab8c09fc2a0bac8a2c60/',
		// target: 'http://localhost:36742',
		target: 'http://130.10.9.26:10000/mock/593946d182ba6613dc6e4895',
		changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
		logLevel: 'debug'
	});


	// borwerSync
	browserSync({
		server: {
			baseDir: 'src',
			middleware: [apiProxy]
		},
		port: 8080,
		logPrefix: 'Gold',
		tunnel: false
	});

	gulp.watch(['**/*.html', '**/*.css', '**/*.js'], { cwd: 'src' }, reload);
});
