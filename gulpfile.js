var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/css/**/*.scss', ['sass']);
});