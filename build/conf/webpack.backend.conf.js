import fs from 'fs';
import webpack from 'webpack';

import conf from '../conf';
import {DEBUG} from '../constants';

let nodeModules = {};
fs.readdirSync(conf.paths.nodeModules)
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


export default {
  context  : `${conf.basePath}`,
  target   : 'node',
  entry    : [
    'babel-polyfill',
    conf.backend.entryFile
  ],
  devtool  : 'sourcemap',
  output   : {
    path    : conf.build.serverDir,
    filename: 'server.js'
  },
  quiet    : !DEBUG,
  module   : {
    loaders: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query  : {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  externals: nodeModules,
  plugins  : [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ]
}