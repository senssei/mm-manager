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

    // search form
    vm.search = {
      'query': undefined,
      'database': undefined,
      'inAll': false
    };
    vm.movie = {}; // movie form

    vm.searchDatabases = [
      {
        label: 'IMDB'
      }
    ]

  }
}