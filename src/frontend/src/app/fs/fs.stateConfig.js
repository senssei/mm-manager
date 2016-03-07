import {name, url} from './fs.state';

stateConfig.$inject = ['$stateProvider'];
export default function stateConfig($stateProvider) {
  const state = {
    name : name,
    url  : url,
    views: {
      '@': {
        templateUrl: require('./fs.tpl.html')
      }
    }
  };
  $stateProvider.state(state);
}