'use strict';

import angular from 'angular';
import angularFire from 'angularfire';

import FireUtils from './fire-utils.service';

const module = angular.module('mm-manager.fire', [
    angularFire
  ])
  .service('mmFire', FireUtils);

export default module.name;