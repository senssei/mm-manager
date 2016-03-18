import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import {name as ctrlName, FSDirController} from './dir.tree.controller';
import {name as dirName, FSTreeDirective} from './dir.tree.directive.js';

export default angular
  .module('mm-manager.app.fs.dir', [
    ngMaterial,
    uiRouter
  ])
  .directive(dirName, FSTreeDirective.factory)
  .controller(ctrlName, FSDirController);
