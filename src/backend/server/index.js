import koa from 'koa';
import router from 'koa-router';
import mount from 'koa-mount';

import Promise from 'promise';

export default class Server {

  constructor(app) {
    this.app = app;
  }

  static init(config = {}) {
    return new Promise((resolve, reject)=> {
      let port = config.server.port;
      let app = koa();

      app.listen(port);

      resolve(port);
    });
  }

  _mount() {

  }


}