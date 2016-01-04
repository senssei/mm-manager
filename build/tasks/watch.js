'use strict';

import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';

import conf from '../conf';

export function watch(){
  return () => {
    // watch changes in index.html
    gulp.watch(
        path.join(conf.paths.client, 'index.html'),
        ['index']
    ).on('change', browserSync.reload);

    // watch changes in less files
    gulp.watch(
        path.join(conf.paths.client, '**/*.less')
        ['compile']
    ).on('change', browserSync.reload);

    // watch changes in scripts
    gulp.watch(
      path.join(conf.paths.client, '**/*.js'),
      ['compile']
    ).on('change', browserSync.reload);

    // watch changes in templates
    gulp.watch(
      path.join(conf.paths.client, '**/*.tpl.html'),
      ['compile']
    ).on('change', browserSync.reload);
  };
}
