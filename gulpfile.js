var gulp      = require('gulp');
var gutil     = require('gulp-util');
var sass      = require('gulp-sass');
var csscomb   = require('gulp-csscomb');
var bower     = require('gulp-bower');

var config = {
  bowerDir: 'bower_components'
}

gulp.task('default', ['build-css', 'watch']);
gulp.task('setup', ['bower', 'build-css']);

gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['build-css']);
});

gulp.task('build-css', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(csscomb())
    .pipe(gulp.dest('css'));
});

gulp.task('bower', function() {
  return bower();
});