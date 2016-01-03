class Directive {
  constructor() {}
}

class BoundDirective extends Directive {
  constructor(ctrlNameOrFunction){
    super();
    this.controller = ctrlNameOrFunction;
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
}

export default Directive;
export {Directive, BoundDirective};
