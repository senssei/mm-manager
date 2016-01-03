import path from 'path';
import gutil from 'gulp-util';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NgAnnotatePlugin from 'ng-annotate-webpack-plugin';

import conf from '../conf';
import {PRODUCTION, DEBUG, PROFILE} from '../constants';

const LOG = gutil.log;
const COLORS = gutil.colors;

export function webpackConf(isTest = false) {

  LOG(COLORS.green(`webpackConf >> PRODUCTION=${PRODUCTION}, DEBUG=${DEBUG}, PROFILE=${PROFILE}`));

  let rootFile = path.join(conf.paths.client, 'index.module.js');

  let plugins = getPlugins(isTest);
  let vendor = getVendor();
  let alias = getAliases();

  return {
    context: `${conf.basePath}`,
    profile: PROFILE,
    cache  : !PRODUCTION,
    devtool: PRODUCTION ? 'eval' : 'inline-source-map',
    output : {
      filename: '[name].js'
    },
    entry  : {
      index : rootFile,
      vendor: vendor
    },
    module : {
      preLoaders: [
        {
          test  : /\.js$/,
          loader: 'baggage?[file].tpl.html'
        }
      ],
      // ES6 modules have to be preprocessed with Babel loader to work in browsers.
      loaders   : [
        {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
        {test: /\.tpl.html$/, loader: 'ngtemplate?relativeTo=' + conf.paths.client + '/!html'},
        {
          test  : /\.less$/,
          loader: ExtractTextPlugin.extract(
            'style',
            ['css?sourceMap', 'less?sourceMap&strictMath&noIeCompat']
          )
        }
      ]
    },
    resolve: {
      alias: alias
    },
    plugins: plugins,
    quiet  : !DEBUG
  };

}

function getVendor() {
  return [
    // required by angular bindings
    'firebase',
    // angular stuff
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-ui-router',
    'angularfire',
    // rest of libraries
    'lodash',
    'bowser'
  ];
}

function getPlugins(isTest = false) {
  LOG(COLORS.green(`getPlugins(isTest=${isTest})`));

  let plugins = [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin(`${conf.build.cssFile}`, {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      FIREBASE_URL          : '\'https://mm-manager.firebaseio.com/\'',
      BROWSER_SUPPORTS_HTML5: true
    })
  ];

  if (!isTest) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name    : 'vendor',
      filename: `${conf.build.vendorFile}`
    }));
  }

  if (PRODUCTION && !isTest) {
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new NgAnnotatePlugin({
        add: true
      })
    ].forEach((plugin) => {
      plugins.push(plugin);
    });
  } else if (isTest && PRODUCTION) {
    throw new gutil.PluginError(
      COLORS.yellow('webpack.conf'),
      'Failed to getPlugins, it is mode production and also test in progress');
  }

  return plugins;
}

function getAliases() {
  return {
    // useful to create aliases for top-level client packages
    common: [`${conf.paths.client}/common`],
    app   : [`${conf.paths.client}/app`],
    model : [`${conf.paths.client}/model`]
  };
}
