import {name, url} from './fs.state';
import {name as controllerName} from './fs.controller';

stateConfig.$inject = ['$stateProvider'];
export default function stateConfig($stateProvider) {
  const state = {
    name : name,
    url  : url,
    views: {
      '@': {
        controller      : controllerName,
        controllerAs    : 'vm',
        bindToController: true,
        templateUrl     : require('./fs.tpl.html')
      }
    }
  };
  $stateProvider.state(state);
}