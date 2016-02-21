'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import wConf from '../../conf/webpack.backend.conf.js';

import conf from '../../conf';
import {DEBUG} from '../../constants';

const LOG = gutil.log;
const COLORS = gutil.colors;

export function compileBackend() {
  return () => {
    let rootFile = conf.backend.entryFile;
    let onFinish = (err, stats) => {
      if (err) {
        throw new gutil.PluginError('compile', err);
      }
      if (DEBUG) {
        LOG(COLORS.yellow('compile'), stats.toString({
          colors: true
        }));
      }
    };

    return gulp.src(rootFile)
      .pipe(webpackStream(
        wConf,
        webpack,
        onFinish
      ))
      .pipe(gulp.dest(conf.build.serverDir));
  };
}
