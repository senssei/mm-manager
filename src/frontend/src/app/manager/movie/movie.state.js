import {name as parentStateName} from '../manager.state';

export const name = `${parentStateName}.movie`;

/*@ngInject*/
export default function managerMovieState($stateProvider) {
  const state = {
    name : name,
    url  : 'movie/',
    views: {
      '@': {
        controller      : 'movieController',
        controllerAs    : 'vm',
        bindToController: true,
        templateUrl     : require('./movie.tpl.html')
      }
    }
  };
  $stateProvider.state(state);
}
