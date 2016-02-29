import angular from 'angular';

import movieCartModule from './movie-cart';
import moviePosterModule from './movie-poster';

export default angular.module('mm-manager.app.common', [
  movieCartModule,
  moviePosterModule
]);