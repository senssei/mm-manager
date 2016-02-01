import angular from 'angular';

import movieModule from './movie/movie.module';

const module = angular.module('mm-manager.manager', [
  movieModule
]);

export default module.name;
