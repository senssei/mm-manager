import os from 'os';
import path from 'path';
import S from 'string';

import router from 'koa-router';
import mount from 'koa-mount';

import FSScanner from '../../../scanner';
import {getQueryParam} from '../../utils';

const mountPath = '/v1/fs';
export default mount(
  mountPath,
  router()
    .get('/', onGet)
    .options('/', onOptions)
    .middleware()
)

function *onGet() {
  try {
    let basePath = getQueryParam(this.query, 'path', os.homedir());
    let filter = getQueryParam(this.query, 'filter');
    let recursive = getQueryParam(this.query, 'recursive', false);
    let depth = getQueryParam(this.query, 'depth', 1);
    let items;

    if (recursive) {
      items = yield FSScanner.traverse(basePath, depth, filter)
    } else {
      items = yield FSScanner.ls(basePath, filter);
    }

    this.status = 200;
    this.body = {
      count: items.length,
      dir  : S(basePath).replaceAll(path.sep, '/').s,
      files: items
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function *onOptions() {
  this.status = 200;
  this.type = 'json';
  this.body = {
    'GET': {
      'description': 'List all files withing directory, by default home directory of user that runs application is used',
      'parameters' : {
        'path'     : {
          'description': 'Path to list files in',
          'default'    : 'home directory'
        },
        'filter'   : {
          'description': 'List of extensions to apply to list',
          'default'    : undefined
        },
        'recursive': {
          'description': 'Should listing be recursive',
          'default'    : false
        },
        'depth'    : {
          'description': 'How deep recursion should go ?',
          'default'    : 1
        }
      }
    }
  }
}
