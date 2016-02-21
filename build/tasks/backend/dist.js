import gulp from 'gulp';

import conf from '../../conf';

export function backendDistFolder() {
  return () => {
    let buildDir = conf.build.serverDir;
    return gulp.src('').pipe(gulp.dest(buildDir));
  };
}
