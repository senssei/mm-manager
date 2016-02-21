import nodemon from 'gulp-nodemon';
import path from 'path';

import conf from '../../conf';

export function runBackend() {
  return ()=> {
    nodemon({
      script: path.join(conf.build.serverDir, './server.js'),
      ext   : 'js html',
      watch : path.join(conf.paths.backend, '**/*.js'),
      tasks : ['backend:compile'],
      env   : {'NODE_ENV': 'development'}
    }).on('restart', function () {
      console.log('restarted!')
    })
  }
}