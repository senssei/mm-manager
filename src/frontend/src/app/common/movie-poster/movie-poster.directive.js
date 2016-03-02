import {BoundDirective} from '../../../core/directive';

export default class MMMoviePosterDirective extends BoundDirective {
  constructor() {
    super('MoviePosterController');
    this.templateUrl = require('./movie-poster.tpl.html');
    this.replace = true;
    this.scope = {
      alt   : '=',
      poster: '='
    }
  }

  link(scope, element, attrs, ctrl) {
    let img;
    let watcher = scope.$watch('vm.poster', (poster)=> {
      if (poster) {
        img = element.find('img');
        img.on('click', (event) => {
          ctrl.popupPoster(event, poster);
        });
      }
    });
    scope.$on('$destroy', watcher); // deregister
  }

  /*@ngInject*/
  static factory() {
    return new MMMoviePosterDirective();
  }
}
