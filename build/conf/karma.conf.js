'use strict';

import {webpackConf} from './webpack.conf';
import conf from '../conf';

import {DEBUG} from '../constants';

export function karmaConf() {
  let webpack = webpackConf(true);

  webpack.entry = {};
  webpack.watch = true;
  webpack.output = {};
  webpack.cache = false;
  webpack.resolve.alias.test = [[`${conf.paths.frontend}/test`]];

  return {
    basePath             : conf.basePath,
    port                 : 8666,
    colors               : true,
    captureTimeout       : 60000,
    frameworks           : ['mocha', 'chai', 'sinon'],
    reporters            : ['mocha'],
    files                : [
      // need to use it like this
      {pattern: 'src/frontend/src/test-webpack.js', watched: false},
      {pattern: 'src/frontend/**/*.tpl.html'}
    ],
    preprocessors        : {
      'src/frontend/src/test-webpack.js': ['webpack'],
      'src/frontend/**/*.tpl.html'      : ['ng-html2js']
    },
    client               : {
      mocha: {
        reporter   : 'html',
        ui         : 'bdd',
        ignoreLeaks: false
      }
    },
    webpack              : webpack,
    webpackServer        : {
      noInfo: !DEBUG,
      stats : {
        colors: true
      }
    },
    ngHtml2JsPreprocessor: {
      cacheIdFromPath: (filePath)=> {
        const path = filePath.replace('src/frontend/src/', '');
        console.log(`path is ${path}`);
        return path;
      },
      moduleName     : 'ng'
    },
    browsers             : ['PhantomJS'],
    logLevel             : DEBUG ? conf.LOG_DEBUG : conf.LOG_INFO,
    singleRun            : true,
    watch                : false
  };
}
