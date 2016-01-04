import angular from 'angular';

import stateConfig from './app.state';
import {appThemeConfig, templateConfig} from './app.config';
import AppController from './app.controller';
import AppControlsController from './app-controls.controller';

import mmFireModule from '../common/fire/fire.module';
import managerModule from './manager/manager.module';

const module = angular.module('mm-manager.app', [
    mmFireModule,
    managerModule
  ])
  .config(stateConfig)
  .config(appThemeConfig)
  .config(templateConfig)
  .controller('appControlsController', AppControlsController)
  .controller('appController', AppController);

export default module.name;
