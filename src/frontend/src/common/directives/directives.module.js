import angular from 'angular';

import navigateControlModule from './navigate/navigate-control.module';

const module = angular.module('mm-manager.directives', [
  navigateControlModule
]);

export default module.name;