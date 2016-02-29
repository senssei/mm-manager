import path from 'path';

const basePath = path.join(__dirname, '../');
const frontendPath = path.join(basePath, './src/frontend');
const backendPath = path.join(basePath, './src/backend');
const serverPath = path.join(basePath, './src/backend');

export default {
  /**
   * basePath for the application build system
   */
  basePath: basePath,
  paths   : {
    nodeModules: path.join(basePath, './node_modules'),
    frontend   : frontendPath,
    backend    : backendPath,
    client     : path.join(frontendPath, './src'),
    assets     : path.join(frontendPath, './assets')
  },
  test    : {
    entryFile: path.join(frontendPath, './src/test-webpack.js'),
    specs    : './src/**/*.spec.js'
  },
  backend : {
    dir      : backendPath,
    entryFile: path.join(serverPath, './index.js')
  },
  build   : {
    dir       : path.join(basePath, './dist_client'),
    serverDir : path.join(basePath, './dist_server'),
    jsFile    : 'index.js',
    cssFile   : 'index.css',
    vendorFile: 'vendor.js',
    indexFile : 'index.html'
  }
};
