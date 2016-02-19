'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';

import {compile} from './build/tasks/compile';
import {clean, distFolder} from './build/tasks/common';
import {index} from './build/tasks/index';
import {serve} from './build/tasks/serve';
import {watch} from './build/tasks/watch';
import {testUnit, testE2E} from './build/tasks/test';
import {karma} from './build/tasks/karma';
import {backend} from './build/tasks/backend';

import {TEST_SUITES} from './build/constants';

gulp.task('default', ['build']);
gulp.task('clean', clean());
gulp.task('create-dist-folder', distFolder());
gulp.task('compile', compile());
gulp.task('index', index());
gulp.task('build', (done) => {
  return runSequence.use(gulp)(
    'clean',
    'create-dist-folder',
    'compile',
    'index',
    done
  );
});

gulp.task('dev:watch', watch());
gulp.task('dev:serve', serve());

gulp.task('dev', (done) => {
  return runSequence.use(gulp)(
    'build',
    ['dev:serve', 'dev:watch'],
    done
  );
});

gulp.task('test', (done) => {
  let testTasks = [];
  TEST_SUITES.forEach((ts)=>{
    testTasks.push(`test:${ts}`);
  });
  gutil.log(`Running tests=${testTasks}`);

  return runSequence.use(gulp)(
    testTasks,
    done
  );
});
gulp.task('karma', karma());
gulp.task('test:unit', ['karma'], testUnit());
gulp.task('test:e2e', testE2E());

gulp.task('backend', backend());
