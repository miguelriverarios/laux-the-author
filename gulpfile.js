var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var config = require('./webpack.config');

gulp.task('sass', function () {
  var plugins = [
    autoprefixer(),
    cssnano()
  ];
  return gulp.src('./src/ui/stylesheets/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: 'map',
      includePaths: ['node_modules']
    },
      { errLogToConsole: true }))
    .pipe(postcss(plugins))
    .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
    .pipe(gulp.dest('dist/stylesheets/'))
    .pipe(reload({ stream: true }));
});

gulp.task('javascripts', function () {
  return gulp.src(['./src/ui/javascripts/javascript.js',
    './src/ui/javascripts/index.js',
    './src/ui/javascripts/urban-glossary.js',
    './src/ui/javascripts/contact-me.js',
    './src/ui/javascripts/our-story.js',
    './src/ui/javascripts/my-team.js',
    './src/ui/javascripts/events.js',
    './src/ui/javascripts/main.js'])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('src/ui/javascripts/'))
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest('dist/javascripts/'));
});

// gulp.task('svgPanZoom', function () {
//   return gulp.src(['./dist/js/svg-pan-zoom/svg-pan-zoom.js'])
//     .pipe(concat('svg-pan-zoom2.min.js'))
//     .pipe(webpackStream(config, webpack))
//     .pipe(gulp.dest('dist/js/svg-pan-zoom/'));
// });

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:5000"
  });
});

gulp.task('start', ['sass', 'javascripts', 'browser-sync'], function () {
  gulp.watch("src/ui/stylesheets/**/*.scss", ['sass']);
  gulp.watch("src/ui/javascripts/**/*.js", ['javascripts']);
  gulp.watch(["dist/javascripts/**/*.js", "src/views/**/*.hbs"], reload);
});


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({ script: 'src/bin/www' }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  });
});