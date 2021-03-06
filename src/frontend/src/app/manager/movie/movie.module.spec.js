import movieModule from './movie.module';
import movieModuleState from './movie.stateConfig.js';

import {moduleUnitTest} from 'test/utils';

moduleUnitTest(
  'mm-manager.manager.movie',
  [
    'angularMoment',
    'ui.router',
    'ngMaterial',
    'mm-manager.fire',
    'mm-manager.manager.search.movie'
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

  it('should set state name to \'mm.movie\'', (done) => {
    let callArgs;

    movieModuleState(stateProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.name).to.equal('mm.movie');

    done();
  });

  it('should set state url to \'movie/\'', (done) => {
    let callArgs;

    movieModuleState(stateProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.url).to.equal('movie/');

    done();
  });

}
