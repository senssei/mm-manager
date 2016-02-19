import server from './server';
import config from './config';

server.init(config)
  .then((port)=> {
    console.log(`Application running on ${port}`);
  });