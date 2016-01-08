import angular from 'angular';

import mmFireModule from 'common/fire/fire.module'

import state from './movie.stateConfig.js';
import MovieController from './movie.controller'

const module = angular.module('mm-manager.manager.movie', [
    mmFireModule
  ])
  .config(state)
  .controller('movieController', MovieController);


export default module.name;
