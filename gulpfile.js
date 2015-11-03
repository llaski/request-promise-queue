var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var util = require('gulp-util');

gulp.task('connect', function() {
	connect.server({
		base: 'http://localhost',
		port: 9000,
		root: './dist',
		livereload: true
	});
});

gulp.task('js', function() {
  browserify('./src/RequestPromiseQueue.js')
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('RequestPromiseQueue.js'))
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('js-tests', function() {
  browserify('./tests/index.js')
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('tests.js'))
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('default', ['js', 'connect', 'watch'], function() {

});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['js']);
});