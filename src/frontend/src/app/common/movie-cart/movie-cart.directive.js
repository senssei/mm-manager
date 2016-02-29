import {BoundDirective} from '../../../core/directive';
import MMError from '../../../core/error';

const TABLE_KEY = Symbol('mmMovieCart.table');
const TEMPLATES = {
  TABLE_KEY: require('./movie-cart.table.tpl.html')
};

class UnsupportedDisplayAs extends MMError {
  constructor(key = '') {
    super(`${key} is not supported as display mode for mm-movie-cart`);
  }
}

export default class MMMovieCartDirective extends BoundDirective {
  constructor() {
    super('MovieCartController');
    
    this.templateUrl = (el, attributes)=> {
      let displayAs = attributes.mmDisplayAs || 'table';
      switch (displayAs) {
        case 'table':
          displayAs = TEMPLATES['TABLE_KEY'];
          break;
        default:
          throw new UnsupportedDisplayAs(displayAs);
      }
      return displayAs;
    };
    this.restrict = 'E';
    this.scope = {
      'mmDisplayAs': '=',
      'movies'     : '=mmMovies'
    };
  }

  /*@ngInject*/
  static factory() {
    return new MMMovieCartDirective();
  }
}