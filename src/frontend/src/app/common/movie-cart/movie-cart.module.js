import angular from 'angular';
import ngMaterialDataTable from 'angular-material-data-table';

import MMMovieCartDirective from './movie-cart.directive';
import MovieCartController from './movie-cart.controller';

export default angular.module('mm-manager.app.common.movieCart', [
    ngMaterialDataTable
  ])
  .directive('mmMovieCart', MMMovieCartDirective.factory)
  .controller('MovieCartController', MovieCartController);