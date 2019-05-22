'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require("gulp-notify");
const sourcemaps = require('gulp-sourcemaps');
// const tinypng = require('gulp-tinypng-unlimited');

sass.compiler = require('node-sass');

gulp.task('html', function() {
  return gulp.src('./source/*.html')
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./source"
      }
  });
});

gulp.task('autoprefix', function () {
  return gulp.src('./source/css/**/*.css')
      .pipe(autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./source/css'));
});

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .on("error", notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running sass"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./source/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', function () {
  gulp.watch(['./source/sass/**/*.scss'], gulp.series('sass'));
  gulp.watch(['./source/**/*.html'], gulp.series('html'));
});

gulp.task('default', gulp.series('sass', gulp.parallel('watch', 'browser-sync')))
