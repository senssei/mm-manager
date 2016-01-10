import {BoundDirective} from '../../../../core/directive';

// TODO(feature) define it as form
export default class MMSearchMovieDirective extends BoundDirective {

  constructor(){
    super(()=>{});

    this.restrict = 'E';
    this.templateUrl = require('./search-movie.tpl.html');
    this.require = ['?ngModel'];

  }

  /*@ngInject*/
  static factory() {
    return new MMSearchMovieDirective();
  }
}


