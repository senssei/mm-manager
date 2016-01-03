import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import appModule from './app/app.module';
import commonModule from './common/common.module';

import './index.less';

// vendor dependencies module
const vendorDependencies = [
  ngAnimate,
  ngAria,
  ngMaterial,
  uiRouter
];
const vendorModule = angular.module('mm-manager.vendor', vendorDependencies).name;

export default angular.module('mm-manager', [
  vendorModule,
  appModule,
  commonModule
]).name;