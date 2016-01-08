import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import stateConfig from './app.stateConfig';
import {appThemeConfig, templateConfig} from './app.config';
import AppController from './app.controller';
import AppControlsController from './app-controls.controller';

import managerModule from './manager/manager.module';

const module = angular.module('mm-manager.app', [
    uiRouter,
    ngMaterial,
    managerModule
  ])
  .config(stateConfig)
  .config(appThemeConfig)
  .config(templateConfig)
  .controller('appControlsController', AppControlsController)
  .controller('appController', AppController);

export default module.name;
