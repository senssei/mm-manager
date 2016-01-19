import {BoundDirective} from '../../../../core/directive';

// TODO(feature) define it as form
export default class MMSearchMovieDirective extends BoundDirective {

  constructor() {
    super(MMSearchMovieController);

    this.restrict = 'E';
    this.templateUrl = require('./search-movie.tpl.html');
    this.scope = {
      'movies': '=movies'
    }
  }

  /*@ngInject*/
  static factory() {
    return new MMSearchMovieDirective();
  }
}

/*@ngInject*/
function MMSearchMovieController($log, mmSearchMovie) {
  const vm = this;

  vm.searchInDatabases = mmSearchMovie.searchEngines;
  vm.search = {
    'query'   : undefined,
    'database': pickDefaultDatabase(),
    'inAll'   : false
  };
  vm.doSearch = doSearch;

  function doSearch() {
    $log.debug(`Searching with query='${vm.search.query}' and database='${vm.search.database}'`);

    mmSearchMovie.byTitle(
      vm.search.database,
      vm.search.query
    ).then((data)=> {
      vm.movies = data;
    });
  }

  function pickDefaultDatabase() {
    return vm.searchInDatabases.length > 0 ? vm.searchInDatabases[0].key : undefined;
  }
}
