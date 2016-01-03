import toastModule from './toast.module';

import 'angular-mocks';

describe('mmToast', () => {

  const module = angular.mock.module;
  const inject = angular.mock.inject;

  let $mdToast;
  let mmToast;

  beforeEach(module(toastModule));
  beforeEach(inject((_$mdToast_, _mmToast_) => {
    $mdToast = _$mdToast_;
    mmToast = _mmToast_;
  }));

  it('should show toast for info', () => {
    const preset = $mdToast.simple(); // get preset to spy on it
    const msg = 'sample msg';
    let contentSpy;
    let showSpy;

    contentSpy = sinon.spy(preset, 'content');
    contentSpy.withArgs(msg);

    showSpy = sinon.spy($mdToast,'show');
    showSpy.withArgs(preset);

    sinon.stub($mdToast,'simple').returns(preset); // return spied preset

    mmToast.info(msg);

    expect($mdToast.simple.calledOnce).to.be.ok;
    expect(contentSpy.withArgs(msg).calledOnce).to.be.ok;
    expect(showSpy.withArgs(preset).calledOnce).to.be.ok;
  });

  it('should not call toast if message undefined', () => {
    const msg = undefined;
    const simpleSpy = sinon.spy($mdToast,'simple');
    const showSpy = sinon.spy($mdToast,'show');

    mmToast.info(msg);

    expect(simpleSpy.called).to.not.be.ok;
    expect(showSpy.called).to.not.be.ok;
  });

});