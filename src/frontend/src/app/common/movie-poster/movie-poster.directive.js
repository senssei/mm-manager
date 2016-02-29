import {Directive} from '../../../core/directive';

export default class MMMoviePosterDirective extends Directive {
  constructor() {
    super();
    this.templateUrl = require('./movie-poster.tpl.html');
    this.replace = true;
    this.scope = {
      alt   : '=',
      poster: '='
    }
  }

  /*@ngInject*/
  static factory() {
    return new MMMoviePosterDirective();
  }
}