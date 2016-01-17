import angular from 'angular';

import searchModule from '../../../../common/search/search.module';

import MMSearchMovieDirective from './search-movie.directive';

const module = angular.module('mm-manager.manager.search.movie', [
    searchModule
  ])
  .directive('mmSearchMovie', MMSearchMovieDirective.factory);

export default module.name;