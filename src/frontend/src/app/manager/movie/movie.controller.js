import Controller from '../../../core/controller';

/**
 * @class MovieController
 * @type MovieController
 * @description
 *  MovieController is primary controller for
 */
// TODO(doc) finish writing documentation
export default class MovieController extends Controller {
  /*@ngInject*/
  constructor($scope) {
    super($scope);
  }

  $setup() {
    const vm = this;

    vm.foundMovies = undefined; // from search movie directive
    vm.movieSelected = false;
    vm.movie = {}; // movie form

    this.$watch('vm.foundMovies', (newValue, oldValue)=> {
      vm.movieSelected = !(newValue && newValue !== oldValue)
    })
  }

  selectMovieFromSearch($event, movie) {
    $event.stopImmediatePropagation();

    // mark selection
    this.movieSelected = true;

    // copy into form model
    this.movie = {
      title     : movie.title,
      subtitle  : movie.subtitle,
      releasedAt: movie.releasedAt
    }
  }

}
