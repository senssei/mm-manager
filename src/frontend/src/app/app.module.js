import angular from 'angular';

import stateConfig from './app.state';
import {appThemeConfig, templateConfig} from './app.config';
import AppController from './app.controller';

import mmFireModule from '../common/fire/fire.module';

const module = angular.module('mm-manager.app', [
    mmFireModule
  ])
  .config(stateConfig)
  .config(appThemeConfig)
  .config(templateConfig)
  .controller('appController', AppController);

export default module.name;