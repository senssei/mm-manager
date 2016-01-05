import gutil from 'gulp-util';
import gulp from 'gulp';
import webpack from 'webpack';
import {Server} from 'karma';

import conf from '../conf';
import {karmaConf} from '../conf/karma.conf';
import {DEBUG, TEST_OPTS} from '../constants';

const SUPPORTED_BROWSERS = ['Chrome', 'PhantomJS', 'Firefox'];
const LOG = gutil.log;
const COLORS = gutil.colors;

export function karma() {
  return (done) => {
    let karmaOpts = karmaConf();

    karmaOpts.singleRun = !TEST_OPTS.watch;
    karmaOpts.autoWatch = !!TEST_OPTS.watch;
    karmaOpts.browsers = verifyBrowsers(TEST_OPTS.browsers);
    karmaOpts.logLevel = DEBUG ? 'DEBUG' : 'INFO';

    LOG(COLORS.green(`Running tests with ${karmaOpts.browsers}`));

    let server = new Server(
      karmaOpts,
      (code) => {
        if (code === 1) {
          LOG(COLORS.red('Error: unit test failed'));
          return process.exit(1);
        }
        done();
      }
    );

    server.start();
  }
}

function verifyBrowsers(browsers) {
  browsers.forEach(browser => {
    if (SUPPORTED_BROWSERS.indexOf(browser) < 0) {
      throw new gutil.PluginError('test:unit', `${browser} not among supported browsers ${SUPPORTED_BROWSERS}`);
    }
  });
  return browsers;
}
