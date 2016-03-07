import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import stateConfig from './app.stateConfig';
import {
  templateConfig,
  httpConfig,
  appThemeConfig,
  urlRouterConfig
} from './app.config';
import AppController from './app.controller';
import AppControlsController from './app-controls.controller';

import managerModule from './manager/manager.module';
import mmFireModule from 'common/fire/fire.module'
import commonAppModule from './common';
import fsModule from './fs';

import './app.less';

const module = angular.module('mm-manager.app', [
    uiRouter,
    ngMaterial,
    mmFireModule,
    managerModule,
      commonAppModule,
      fsModule
  ])
  .config(stateConfig)
  .config(urlRouterConfig)
  .config(templateConfig)
  .config(httpConfig)
  .config(appThemeConfig)
  .controller('appControlsController', AppControlsController)
  .controller('appController', AppController);

export default module.name;
