import angular from 'angular';

import directivesModule from './directives/directives.module';
import toastModule from './toast/toast.module';
import fireModule from './fire/fire.module';

import mmUtils from './common.utils';

const module = angular.module('mm-manager.common', [
    directivesModule,
    toastModule
  ])
  .service(mmUtils.name, mmUtils.factory);

export default module.name;