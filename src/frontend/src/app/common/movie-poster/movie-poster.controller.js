import angular from 'angular';
import Controller from '../../../core/controller';

const MD_DIALOG = new WeakMap();
const SCOPE = new WeakMap();
const POPUP_TPL = require('./movie-poster.popup.tpl.html');

export default class MoviePosterController extends Controller {

  /*@ngInject*/
  constructor($scope, $mdDialog) {
    super($scope);
    MD_DIALOG.set(this, $mdDialog);
    SCOPE.set(this, $scope);
  }

  popupPoster(event, poster = '') {
    if (!poster) {
      return false;
    }
    let $scope = SCOPE.get(this);
    let $mdDialog = MD_DIALOG.get(this);
    let parentEl = angular.element(document.body);

    $mdDialog.show({
      clickOutsideToClose: true,
      scope              : $scope,        // use parent scope in template
      preserveScope      : true,  // do not forget this if use parent scope
      parent             : parentEl,
      targetEvent        : event,
      templateUrl        : POPUP_TPL
    });
  }
}