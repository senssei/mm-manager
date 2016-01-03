'use strict';

import gulp from 'gulp';
import del from 'del';

import conf from '../conf';

export function clean() {
  return (done) => {
    let buildDir = conf.build.dir;
    return del([buildDir], done);
  };
}

export function distFolder() {
  return () => {
    let buildDir = conf.build.dir;
    return gulp.src('').pipe(gulp.dest(buildDir));
  };
}
