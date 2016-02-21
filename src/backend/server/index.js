'use strict';

import koa from 'koa';
import koaBunyanLogger from 'koa-bunyan-logger';
import koaResponseTime from 'koa-response-time';
import koaCompress from 'koa-compress';
import Promise from 'promise';

import zlib from 'zlib';

import root from './api/root';
import versions from './api/versions';
import v1 from './api/v1';

class Server {

  constructor(app) {
    this.app = app;
  }

  init(config = {}) {
    let server = this;
    let app = server.app;
    let port = config.server.port;

    return new Promise((resolve, reject)=> {
      server._load_middleware();
      server._load_api();
      app.listen(port);
      resolve(port);
    });
  }

  _load_api() {
    let app = this.app;

    // set up non versioned mounts
    app.use(versions);
    app.use(root);

    // set up versioned mounts
    for (let mPoint of v1) {
      app.use(mPoint);
    }
  }

  _load_middleware() {
    let app = this.app;

    // compressing
    app.use(koaCompress({
      threshold: 2048,
      flush    : zlib.Z_SYNC_FLUSH
    }));

    // response time
    app.use(koaResponseTime());

    // set up loggers
    app.use(koaBunyanLogger());
    app.use(koaBunyanLogger.requestLogger());
    app.on('error', ()=> {
    });
  }

}

export default function (config) {
  let app = koa();
  let server = new Server(app);
  return server.init(config);
}