import router from 'koa-router';
import mount from 'koa-mount';

const requestPath = '/';
const mountPath = '/';

export default mount(
  mountPath,
  router({methods: ['GET', 'HEAD']})
    .get(requestPath, onGet)
    .options(requestPath, onOptions)
    .middleware()
)

function *onGet() {
  this.type = 'json';
  this.status = 200;
  this.body = {
    message: 'mm-manager',
    version: '0.0.1'
  }
}

function *onOptions() {
  this.status = 200;
}