import angular from 'angular';
import ngMaterial from 'angular-material';

import MoviePosterController from './movie-poster.controller';
import MMMoviePosterDirective from './movie-poster.directive';
import './movie-poster.less';

export default angular
  .module('mm-manager.app.common.moviePoster', [
    ngMaterial
  ])
  .controller('MoviePosterController', MoviePosterController)
  .directive('mmMoviePoster', MMMoviePosterDirective.factory);