import angular from 'angular';
import ngResource from 'angular-resource';

import omdbSearch from './omdb.search.service';
import movieSearch from './common.search.service';

const module = angular.module('mm-manager.search', [
    ngResource
  ])
  .service('mmOmdbSearchMovie', omdbSearch)
  .service('mmSearchMovie', movieSearch);

export default module.name;