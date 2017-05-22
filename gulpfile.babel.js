import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import exec from 'gulp-exec';
import webpack from 'webpack';
import im from 'imagemagick';

import devConfig from './config/webpack.chrome.dev';

gulp.task('chrome:copy', () => {
  gutil.log('[chrome:copy]', "generate different size icon");
  var build = "./build/static/media/icon/";
  var src = "./chrome/assets/static/media/icon/icon.png";
  [16, 48, 128].forEach(function (size) {
    im.convert([src, '-resize', size + 'x' + size, build + 'icon-' + size + '.png'],
      function (err, stdout) {
        if (err) {
          throw new gutil.PluginError('chrome:copy', err);
        };
      });
  });
  src = "./chrome/assets/static/media/icon/icon-revert.png";
  [24].forEach(function (size) {
    im.convert([src, '-resize', size + 'x' + size, build + 'icon-revert-' + size + '.png'],
      function (err, stdout) {
        if (err) {
          throw new gutil.PluginError('chrome:copy', err);
        };
      });
  });
  gulp.src('./chrome/assets/**/*').pipe(gulp.dest("./build/"));
});

gulp.task('chrome:webpack:', (callback) => {
  webpack(devConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:dev', err);
    }
    gutil.log('[chrome:webpack]', stats.toString({ colors: true }));
  });
  gutil.log('[chrome:webpack]', "Now you can set chrome extesnion dir to build in chome-exteions://");
  callback();
});

gulp.task('chrome:react', (callback) => {
  gutil.log('[chrome:react]', "run react-scripts start");
  var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: true // default = false, true means stdout is written to file.contents 
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err 
    stderr: true, // default = true, false means don't write stderr 
    stdout: true // default = true, false means don't write stdout 
  }
  return gulp.src('./')
    .pipe(exec('./node_modules/.bin/react-scripts start', options))
    .pipe(exec.reporter(reportOptions));
});


gulp.task('default', ['chrome:copy', 'chrome:webpack:', 'chrome:react']);
