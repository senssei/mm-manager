import {BoundDirective} from '../../../core/directive';

import navigateControlController from './navigate-control.controller';

class NavigateControlDirective extends BoundDirective {

  constructor() {
    super(navigateControlController);
    this.restrict = 'E';
    this.templateUrl = require('./navigate-control.tpl.html');
    this.scope = {
      state      : '@',
      label      : '@',
      title      : '@',
      icon       : '@',
      tooltipDir : '@',
      tooltipText: '@'
    }
  }

  /*@ngInject*/
  static factory() {
    return new NavigateControlDirective();
  }
}

export default NavigateControlDirective.factory;