import angular from 'angular';
import ngMoment from 'angular-moment';

import mmFireModule from 'common/fire/fire.module';
import mmSearchMovie from '../search/movie/search-movie.module';

import state from './movie.stateConfig.js';
import MovieController from './movie.controller'

const module = angular.module('mm-manager.manager.movie', [
    ngMoment['name'],
    mmFireModule,
    mmSearchMovie
  ])
  .config(state)
  .controller('movieController', MovieController);


export default module.name;
