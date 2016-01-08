import {name,url} from './app.state';

/**
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @ngInject
 */
export default function appState($stateProvider, $urlRouterProvider) {
  const state = {
    name  : name,
    master: true,
    url   : url,
    views : {
      '@'        : {
        controller      : 'appController',
        controllerAs    : 'vm',
        bindToController: true,
        templateUrl     : require('./app.tpl.html')
      },
      'controls@': {
        controller      : 'appControlsController',
        controllerAs    : 'vm',
        bindToController: true,
        templateUrl     : require('./app-controls.tpl.html')
      }
    }
  };
  $stateProvider.state(state);
  $urlRouterProvider.otherwise(`${state.url}`);
}
