import Controller from '../../../core/controller';

export default class MovieCartController extends Controller {
  
  /*@ngInject*/
  constructor($scope) {
    super($scope);
    console.log('LOL');
  }

  $setup() {
    const vm = this;
    console.log(vm);
  }
}