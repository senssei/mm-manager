'use strict';

import gutil from 'gulp-util';

const LOG = gutil.log;
const COLORS = gutil.colors;

export function testUnit() {
  return (done) => {
    done();
  };
}

export function testE2E() {
  return (done) => {
    done();
  };
}
