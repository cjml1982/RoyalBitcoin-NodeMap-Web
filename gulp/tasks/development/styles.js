var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var plumber        = require('gulp-plumber');
var sourcemaps     = require('gulp-sourcemaps');
var size           = require('gulp-size');
var gutil          = require('gulp-util');
var browsersync    = require('browser-sync');
var atimport       = require('postcss-import')
var nesting        = require('postcss-nesting')
var autoprefixer   = require('autoprefixer');
var colorfunction  = require('postcss-color-function')
var cssvariables   = require('postcss-css-variables');
var mqpacker       = require('css-mqpacker');
var config         = require('../../config').styles;


function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}

/**
 * 通过 PostCSS 和它的插件运行 CSS
 * 构建 sourcemaps 并进行压缩
 */
var processors = [
  atimport(),
  nesting(),
  autoprefixer(config.options.autoprefixer),
  cssvariables(),
  colorfunction(),
  mqpacker(config.options.mqpacker),
];

gulp.task('styles', function() {
  browsersync.notify('使用 PostCSS 转换 CSS');

  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(browsersync.stream());
});
