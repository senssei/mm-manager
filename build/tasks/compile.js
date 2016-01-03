'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import {webpackConf} from '../conf/webpack.conf';

import conf from '../conf';
import {DEBUG} from '../constants';

const LOG = gutil.log;
const COLORS = gutil.colors;

export function compile() {
  return () => {
    let wConf = webpackConf();
    let rootFile = path.join(conf.paths.client, 'index.module.js');
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
      .pipe(gulp.dest(conf.build.dir));
  };
}
