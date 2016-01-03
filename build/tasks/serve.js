'use strict';

import browserSync from 'browser-sync';
import browserSyncSpa from 'browser-sync-spa';

import conf from '../conf';
import {PRODUCTION, DEBUG} from '../constants';

export function serve() {
  return PRODUCTION ? serveProd : serveDev;
}

function serveDev() {
    return doServe([
        conf.build.dir,
        conf.paths.client,
        conf.paths.assets
    ]);
}

function serveProd() {
    return doServe([
      conf.build.dir
    ]);
}

function doServe(paths) {
  browserSync.use(browserSyncSpa({
      selector: '[ng-app]'
  }));
  return browserSync.init({
      startPath: '/',
      logPrefix: 'mm',
      logLevel: DEBUG ? 'debug' : 'info',
      logConnections: DEBUG,
      logFileChanges: DEBUG,
      logSnippet: DEBUG,
      server: {
          offline: true,
          baseDir: paths
      },
      watchOptions: {
          ignoreInitial: true,
          ignored: '*.txt'
      },
      browser: [] // Needed so that the browser does not auto-launch.
  });
}
