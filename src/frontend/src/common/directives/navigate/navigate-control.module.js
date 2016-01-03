import angular from 'angular';
import uiRouter from 'angular-ui-router';

import NavigateControlDirective from './navigate-control.directive';

const module = angular.module('mm-manager.directives.navigate-control', [
    uiRouter
  ])
  .directive('mmNav', NavigateControlDirective);

export default module.name;