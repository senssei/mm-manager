import Controller from '../core/controller';

const STATE = new WeakMap();

export default class AppController extends Controller {

  /*@ngInject*/
  constructor($scope, $state) {
    super($scope);
    STATE.set(this, $state);
  }

  $setup() {
    const $state = STATE.get(this);
    const vm = this;

    vm.cards = $state.get()
      .filter((state)=>state.mainPageCard)
      .map((state)=> {
        return {
          name   : state.name,
          icon   : state.icon || 'bookmark',
          onClick: ()=> {
            $state.go(state.name);
          }
        }
      })
      .sort((a, b)=> {
        const aName = a.name;
        const bName = b.name;
        return aName.localeCompare(bName);
      });
  }

}
