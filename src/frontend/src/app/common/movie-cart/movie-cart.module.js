import angular from 'angular';
import ngMaterialDataTable from 'angular-material-data-table';

import MMMovieCartDirective from './movie-cart.directive';
import MovieCartController from './movie-cart.controller';

import moviePosterModule from '../movie-poster';

export default angular.module('mm-manager.app.common.movieCart', [
    ngMaterialDataTable,
    moviePosterModule
  ])
  .directive('mmMovieCart', MMMovieCartDirective.factory)
  .controller('MovieCartController', MovieCartController);