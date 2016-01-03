'use strict';

import gutil from 'gulp-util';

const ENV = gutil.env;

export const PRODUCTION = 'NODE_ENV' in process.env && process.env.NODE_ENV === 'production';
export const DEBUG = 'debug' in ENV && ENV.debug === true;
export const PROFILE = 'profile' in ENV && ENV.profile === true;
export const TEST_SUITES = 'test-suites' in ENV && ENV['test-suites'].split(',') || ['unit'];
export const TEST_OPTS = {
  watch: 'watch' in ENV && ENV.watch === true,
  browsers: 'browsers' in ENV && ENV.browsers.split(',') || ['PhantomJS']
};
