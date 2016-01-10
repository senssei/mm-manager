import angular from 'angular';

import searchMovie from './movie/search-movie.module';

const module = angular.module('mm-manager.manager.search', [
  searchMovie
]);

export default module.name;