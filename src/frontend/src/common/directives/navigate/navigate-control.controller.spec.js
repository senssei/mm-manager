import navigateControlController from './navigate-control.controller';

describe('navigateControlController', () => {
  let $state;
  let controller;

  const states = [
    {
      name  : 'test',
      master: false
    },
    {
      name  : 'master',
      master: true
    }
  ];

  beforeEach(() => {
    $state = {
      get: sinon.stub().returns(states)
    }
  });

  it('should set tooltipDir to \'bottom\' by default', () => {
    let ctrl = new navigateControlController($state);

    expect(ctrl.tooltipDir).to.be.ok;
    expect(ctrl.tooltipDir).to.be.equal('bottom');
  });

  it('should leave tooltipDir if set', () => {
    navigateControlController.prototype.tooltipDir = 'top';
    let ctrl = new navigateControlController($state);
    expect(ctrl.tooltipDir).to.be.equal('top');
  });

  it('should set label from title', () => {
    navigateControlController.prototype.label = undefined;
    navigateControlController.prototype.title = 'title';

    let ctrl = new navigateControlController($state);

    expect(ctrl.label).to.be.equal('title');
  });

  it('should set title from label', () => {
    navigateControlController.prototype.label = 'label';
    navigateControlController.prototype.title = undefined;

    let ctrl = new navigateControlController($state);

    expect(ctrl.title).to.be.equal('label');
  });

  it('should set tooltipText from label', () => {
    navigateControlController.prototype.label = 'label';
    navigateControlController.prototype.title = undefined;

    let ctrl = new navigateControlController($state);

    expect(ctrl.tooltipText).to.be.equal('Navigate to label');
  });

  it('should set tooltipText from title', () => {
    navigateControlController.prototype.label = undefined;
    navigateControlController.prototype.title = 'title';

    let ctrl = new navigateControlController($state);

    expect(ctrl.tooltipText).to.be.equal('Navigate to title');
  });

  it('should find master state if not set', () => {
    navigateControlController.prototype.state = undefined;

    let ctrl = new navigateControlController($state);

    expect(ctrl.state).to.be.equal('master');
    expect(ctrl.icon).to.be.equal('home');
  });
});