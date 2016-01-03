import angular from 'angular';
import angularMaterial from 'angular-material';

import ToastService from './toast.service';

const module = angular.module('mm-manager.toast', [
    angularMaterial
  ])
  .service('mmToast', ToastService);

export default module.name;