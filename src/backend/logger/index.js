import bunyan from 'bunyan';

const rootName = 'mm';
const rootLogger = bunyan.createLogger({
  name : rootName,
  level: 'debug'
});

export default function (name) {
  return rootLogger.child({
    component: `${rootName}.${name}`
  });
}
