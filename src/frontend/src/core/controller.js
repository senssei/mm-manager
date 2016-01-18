import timer from 'timers';

const PRIVATE = new WeakMap();
const SCOPE = new WeakMap();

export default class Controller {

  constructor($scope) {
    let self = this;

    PRIVATE.set(self, {
      listeners: []
    });

    SCOPE.set(this, $scope);

    this.$listen('$destroy', ()=> {
      let priv = PRIVATE.get(self);

      console.log(`${self.constructor.name}
                  destroys ${priv.listeners.length} listeners`);

      priv.listeners.forEach(listener => listener());

      // call ctrl method $destroy for user action cleaning up
      self.$destroy();

      PRIVATE.delete(self); // remove references
      SCOPE.delete(self); // remove reference
    });

    timer.setTimeout(()=> {
      self.$setup();
    }, 50);
  }

  /**
   * Setting up view controller.
   *
   * Allows to create view binding, create listeners.
   * Pretty much execute all jobs prior to showing
   * the view controller is associated with.
   */
  $setup() {
    // do nothing by default
  }

  /**
   * Destroying controller.
   *
   * Called upon $destroy event of the controller's scope.
   * Useful to do any cleaning.
   */
  $destroy() {
    // do nothing by default
  }

  $emit(eventName, args = {}, scope = undefined) {
    if(!eventName){
      return false;
    }
    if (!scope) {
      scope = SCOPE.get(this);
    }
    scope.$emit(eventName, args);
  }

  $broadcast(eventName, args = {}, scope = undefined) {
    if(!eventName){
      return false;
    }
    if (!scope) {
      scope = SCOPE.get(this);
    }
    scope.$broadcast(eventName, args);
  }

  /**
   * Registers new listeners with specified callback.
   *
   * New listeners is collected for future cleaning up.
   *
   * @param event event to listen to
   * @param callback method to execute
   */
  $listen(event, callback = undefined) {
    if (!(event && callback)) {
      return false;
    }

    let listeners = PRIVATE.get(this).listeners;
    let listener = SCOPE.get(this).$on(event, callback);
    listeners.push(listener);

    return true;
  }

  $watch(expression, callback = undefined) {
    if (!(expression && callback)) {
      return false;
    }

    let listeners = PRIVATE.get(this).listeners;
    let watcher = SCOPE.get(this).$watch(expression, callback);
    listeners.push(watcher);

    return true;
  }
}
