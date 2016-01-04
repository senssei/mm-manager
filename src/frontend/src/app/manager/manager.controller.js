import Controller from '../../core/controller';

import Firebase from 'firebase';

const MOVIES_REF = new WeakMap();

export default class ManagerController extends Controller {

  /*@ngInject*/
  constructor($scope, mmFire) {
    super($scope);
    MOVIES_REF.set(this, mmFire.firebaseArray('/movies'));
  }

  $setup() {
    const vm = this;
    const data = MOVIES_REF.get(this);

    data.$loaded(()=> {
      if (data.length == 0) {
        console.log('No movies data');
      }
    });

    vm.data = data;
  }

}
