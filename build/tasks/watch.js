'use strict';

import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';

import conf from '../conf';

export function watch(){
  return () => {
    // watch changes in index.html
    gulp.watch(
        [path.join(conf.paths.client, 'index.html'), 'bower.json'],
        ['index']
    ).on('change', browserSync.reload);

    // watch changes in less files
    gulp.watch(
        [path.join(conf.paths.client, '**/*.less'), 'bower.json'],
        ['compile']
    ).on('change', browserSync.reload);

    // watch changes in scrips
    gulp.watch(
        [path.join(conf.paths.client, '**/*.js'), 'bower.json'],
        ['compile']
    ).on('change', browserSync.reload);
  };
}
