import angular from 'angular';

import movieModule from './movie/movie.module';

import mgrState from './manager.state';

const module = angular.module('mm-manager.manager', [
    movieModule
  ])
  .config(mgrState);

export default module.name;
