import {name, url} from './manager.state';

/*@ngInject*/
export default function managerState($stateProvider) {
  const state = {
    name        : name,
    url         : url,
    mainPageCard: true,
    views       : {
      '@': {
        templateUrl     : require('./manager.tpl.html'),
        controller      : 'mgrController',
        controllerAs    : 'vm',
        bindToController: true
      }
    }
  };
  $stateProvider.state(state);
}
