import Server from './server';
import config from './config';

let startTime = process.hrtime();
let endTime;

Server(config)
  .then((port)=> {
    endTime = getServerLoadTime();
    console.log(`Application running on ${port}`);
    console.log(`Server up and running in ${endTime} ms`)
  });

function getServerLoadTime() {
  return (process.hrtime(startTime)[1] / 10 ^ 6).toFixed(3);
}