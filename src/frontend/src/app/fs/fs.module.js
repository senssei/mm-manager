import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import fsStateConfig from './fs.stateConfig';
import {name as FSControllerName, FSController} from './fs.controller';

import fsDir from './dir';

const required = [
  ngMaterial,
  uiRouter,
  fsDir
];
export default angular
  .module('mm-manager.app.fs', required)
  .config(fsStateConfig)
  .controller(FSControllerName, FSController)