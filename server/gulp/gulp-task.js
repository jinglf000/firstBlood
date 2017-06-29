var gulp = require('gulp');
var gullpSequence = require('gulp-requence');

gulp.task('zero', function () {
	return gulp.src('./src/**/*.html')
	.pipe(gulp.dest('test'));// 返回流，gulp内部调用stream的end事件，得知任务结束
});


gulp.task('one', function (callback) {
	setTimeout( function () {
		console.log('task: one');
		callback(); // 显式执行 回调函数，标记任务已经执行结束可以，执行下一步任务
	}, 1000);
});

gulp.task('two', function (callback) {
	var promise = new Promise(function (resolve, reject) {
		setTimeout( function () {
			console.log('task : two');
			resolve();
		}, 2000);
	});
	return promise; // 使用promise ，并返回promise，gulp内部自动添加.then 方法，等任务执行完成
});

gulp.task('default', function () {
	console.log('task : default');
});

gulp.task('sequence', function (callback) {
	gullpSequence('zero', 'one', 'two', callback);
});
