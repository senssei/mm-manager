import managerModule from './manager.module';
import managerModuleState from './manager.state';

import {moduleUnitTest} from 'test/utils';

moduleUnitTest(
  'mm-manager.manager',
  [
    'mm-manager.manager.movie',
    'mm-manager.fire'
  ],
  {
    name : 'state setup',
    logic: testStateSetup
  }
);

function testStateSetup() {
  let stateProvider = {};

  beforeEach(() => {
    stateProvider = {
      state: sinon.spy()
    };
  });

  it('should set state name to \'mm.mgr\'', (done) => {
    let callArgs;

    managerModuleState(stateProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.name).to.equal('mm.mgr');

    done();
  });

  it('should set state url to \'mgr/\'', (done) => {
    let callArgs;

    managerModuleState(stateProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.url).to.equal('mgr/');

    done();
  });

  it('should set state to be mainPageCard',() =>{
    let callArgs;

    managerModuleState(stateProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.mainPageCard).to.equal(true);
  });
}
