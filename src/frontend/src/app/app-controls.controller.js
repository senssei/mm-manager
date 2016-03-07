import Controller from '../core/controller';

import {name as movieState} from './manager/movie/movie.state.js';
import {name as fsState} from './fs/fs.state';

const STATE = new WeakMap();

export default class AppControlsController extends Controller {

  /*@ngInject*/
  constructor($scope, $state) {
    super($scope);
    STATE.set(this, $state);
  }

  openNewMovie() {
    STATE.get(this).go(movieState);
  }

  browseFS() {
    STATE.get(this).go(fsState);
  }

}
