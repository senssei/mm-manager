import {name as parentStateName} from '../manager.state';

export const name = `${parentStateName}.movie`;

/*@ngInject*/
export default function managerMovieState($stateProvider) {
  const state = {
    name     : name,
    url      : 'movie/',
    templates: {
      '@': {
        template       : 'test'
      }
    }
  };
  $stateProvider.state(state);
}
