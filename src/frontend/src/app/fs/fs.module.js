import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import fsStateConfig from './fs.stateConfig';

export default angular.module('mm-manager.app.fs', [
    ngMaterial,
    uiRouter
  ])
  .config(fsStateConfig);