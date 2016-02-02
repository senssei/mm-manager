import {clone} from 'lodash/lang';

import Controller from '../../../core/controller';
import {name as appState} from '../../app.state';

const STATE = new WeakMap();
const TOAST = new WeakMap();
const MOVIES_REF = new WeakMap();
const PRIV = new WeakMap();

/**
 * @class MovieController
 * @type MovieController
 * @description
 *  MovieController is primary controller for
 */
// TODO(doc) finish writing documentation
export default class MovieController extends Controller {
  /*@ngInject*/
  constructor($scope, $state, $mdToast, mmFire) {
    super($scope);
    STATE.set(this, $state);
    TOAST.set(this, $mdToast);
    MOVIES_REF.set(this, mmFire.firebaseArray('/movies'));
    PRIV.set(this, {});
  }

  $setup() {
    const vm = this;

    vm.foundMovies = undefined; // from search movie directive
    vm.movieSelected = false;
    vm.movie = {}; // movie form

    this.$watch('vm.foundMovies', (newValue, oldValue)=> {
      vm.movieSelected = !(newValue && newValue !== oldValue)
    });

    PRIV.get(this).toast = preCreateToast(TOAST.get(this));
  }

  $destroy() {
    STATE.del(this);
    TOAST.del(this);
    MOVIES_REF.del(this);
    PRIV.del(this);

    this.foundMovies = undefined;
    this.movie = undefined;
  }

  submitForm($event, movie) {
    $event.stopImmediatePropagation();

    const toast_ok = getToast.bind(this)('submit_ok');
    const toast_fail = getToast.bind(this)('submit_fail');
    const successCallback = ()=> {
      TOAST.get(this).show(toast_ok);
    };
    const errorCallback = ()=> {
      TOAST.get(this).show(toast_fail);
    };

    MOVIES_REF
      .get(this)
      .$add(clone(movie))
      .then(successCallback, errorCallback)
  }

  clearForm($event) {
    $event.stopImmediatePropagation();

    const toast = getToast.bind(this)('clear');
    TOAST.get(this).show(toast).then((response)=> {
      if (response === 'yes') {
        this.$apply(()=> {
          this.movieSelected = false;
          this.movie = undefined;
        })
      }
    });
  }

  cancelForm($event) {
    $event.stopImmediatePropagation();

    const toast = getToast.bind(this)('cancel');
    TOAST.get(this).show(toast).then((response)=> {
      if (response === 'yes') {
        STATE.get(this).go(appState);
      }
    });
  }

  selectMovieFromSearch($event, movie) {
    $event.stopImmediatePropagation();

    // mark selection
    this.movieSelected = true;

    // copy into form model
    this.movie = {
      title      : movie.title,
      subtitle   : movie.subtitle,
      description: movie.description,
      releasedAt : movie.releasedAt
    }
  }
}

function preCreateToast($mdToast) {
  return {
    'clear'      : $mdToast
      .simple()
      .textContent('Are you sure to clear the form ?')
      .action('Yes')
      .action('No')
      .highlightAction(false),
    'cancel'     : $mdToast
      .simple()
      .textContent('Are you sure to cancel the form ?')
      .action('Yes')
      .action('No')
      .highlightAction(false),
    'submit_ok'  : $mdToast
      .simple()
      .textContent('Movie has been successfully updated'),
    'submit_fail': $mdToast
      .simple()
      .textContent('There was an error when submitting the movie')
  }
}

function getToast(key) {
  return PRIV.get(this)['toast'][key];
}
