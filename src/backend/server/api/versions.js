import router from 'koa-router';
import mount from 'koa-mount';

const requestPath = '/';
const mountPath = '/versions';

export default mount(
  mountPath,
  router({methods: ['GET', 'OPTIONS']})
    .get(requestPath, onGet)
    .options(requestPath, onOptions)
    .middleware()
)

function *onGet() {
  this.type = 'json';
  this.status = 200;
  this.body = {
    versions: {
      current: 'v1',
      all    : {
        v1: {
          uri    : '/v1',
          patch  : 0,
          release: '20.02.2016'
        }
      }
    }
  }
}

function *onOptions() {
  this.status = 200;
  this.set('X-Api-Version', 'v1');
}