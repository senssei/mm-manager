import angular from 'angular';

import mmFireModule from 'common/fire/fire.module'
import movieModule from './movie/movie.module';

import mgrState from './manager.state';
import mgrController from './manager.controller';

const module = angular.module('mm-manager.manager', [
    movieModule,
    mmFireModule
  ])
  .config(mgrState)
  .controller('mgrController', mgrController);

export default module.name;
