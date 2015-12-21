var gulp = require("gulp"),
	browserSync = require('browser-sync');
	
gulp.task('server', function() {
	browserSync({
		port: 9000,
		server: {
			baseDir: "app"
		}
	})
});

gulp.task('watch', function() {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change',browserSync.reload);
});

gulp.task('default', ['server', 'watch']);
// /////////////////////////////////////////////////
// var gulp = require("gulp"),
// 	connect = require('gulp-connect-php'),
// 	browserSync = require('browser-sync');

// gulp.task('connect-sync', function() {
//   connect.server({base: "app"}, function (){
//     browserSync({
// 		port: 8000,
// 		server: {
// 			baseDir: "app"
// 		}
// 	})
//   });
//  });

// gulp.task('watch', function() { 
// 	gulp.watch([
// 			'app/*.html',
// 			'app/js/**/*.js',
// 			'app/css/**/*.css',
// 			'app/*.php'
// 		]).on('change',browserSync.reload);
// });

// gulp.task('default', ['watch','connect-sync']);
