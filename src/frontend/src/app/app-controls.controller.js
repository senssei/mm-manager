import Controller from '../core/controller';

import {name as movieState} from './manager/movie/movie.state';

const STATE = new WeakMap();

export default class AppControlsController extends Controller {

  /*@ngInject*/
  constructor($scope, $state) {
    super($scope);
    STATE.set(this, $state);
  }

  $setup() {
    const vm = this;

    // setup toolbar
    vm.toolbar = {
      isOpen   : false,
      direction: 'right',
      actions  : [
        {
          label : 'Add movie',
          icon  : 'note_add',
          action: vm._on_add_movie.bind(vm)
        }
      ]
    }
  }

  _on_add_movie(){
    STATE.get(this).go(movieState);
  }

}
