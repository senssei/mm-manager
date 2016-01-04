import Controller from '../../../core/controller';

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