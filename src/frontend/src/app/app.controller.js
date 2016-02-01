import Controller from '../core/controller';

import {name as movieState} from './manager/movie/movie.state';

const STATE = new WeakMap();
const MOVIES_REF = new WeakMap();
const LOG = new WeakMap();

export default class AppController extends Controller {

  /*@ngInject*/
  constructor($scope, $state, $log, mmFire) {
    super($scope);
    STATE.set(this, $state);
    MOVIES_REF.set(this, mmFire.firebaseArray('/movies'));
    LOG.set(this, $log);
  }

  $setup() {
    const vm = this;
    const data = MOVIES_REF.get(this);

    data.$loaded(()=> {
      if (data.length == 0) {
        console.log('No movies data');
      } else {
        vm.movies = data
          .sort((m1, m2) => {
            const m1Title = m1.title || '';
            const m2Title = m2.title || '';
            return m1Title.localeCompare(m2Title);
          })
      }
    });
  }

  newMovieForm($event) {
    $event.stopImmediatePropagation();
    STATE.get(this).go(movieState);
  }

  hasApplicationView() {
    const currentState = STATE.get(this).current;
    const views = currentState.views;
    return 'application' in views;
  }

}
