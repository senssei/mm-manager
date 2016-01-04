import angular from 'angular';

import state from './movie.state';

const module = angular.module('mm-manager.manager.movie', [])
  .config(state);


export default module.name;
