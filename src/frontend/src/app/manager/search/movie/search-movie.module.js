import angular from 'angular';

import MMSearchMovieDirective from './search-movie.directive';

const module = angular.module('mm-manager.manager.search.movie', [])
  .directive('mmSearchMovie', MMSearchMovieDirective.factory);

export default module.name;