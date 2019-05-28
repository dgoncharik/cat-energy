'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var postscc = require('gulp-postcss');

gulp.task('html', function() {
  return gulp.src('./source/*.html')
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./source"
      }
  });

   gulp.watch('./source/sass/**/*.{scss, sass}', gulp.series('css'));
   gulp.watch('./source/**/*.html', gulp.series('html'));
});

gulp.task('css', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'expanded'})
    .on('error', sass.logError))
    .on("error", notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running css"
    }))
    .pipe(postscc([
      autoprefixer()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./source/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', gulp.series('css', 'server'));
