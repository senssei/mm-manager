import fs from 'fs';
import path from 'path';
import os from 'os';
import thunkify from 'thunkify';

import router from 'koa-router';
import mount from 'koa-mount';

import {getQueryParam} from '../../utils';

const mountPath = '/v1/fs';
const readDir = thunkify(fs.readdir);

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

    let items = yield readDir(path);
    let files = items.map((file)=> {
      return path.join(basePath, file);
    });

    this.status = 200;
    this.body = {
      count: files.length,
      files: files
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
        }
      }
    }
  }
}
