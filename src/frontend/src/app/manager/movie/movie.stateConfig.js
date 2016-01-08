import {name, url} from './movie.state';

/*@ngInject*/
export default function managerMovieState($stateProvider) {
  const state = {
    name : name,
    url  : url,
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
