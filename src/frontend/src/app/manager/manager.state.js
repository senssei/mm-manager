export const name = 'mm.mgr';

/*@ngInject*/
export default function managerState($stateProvider) {
  const state = {
    name        : name,
    url         : 'mgr/',
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
