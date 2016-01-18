'use strict';

import appModule from './app.module';
import appModuleState from './app.stateConfig';
import {appThemeConfig} from './app.config';

import {moduleUnitTest} from  'test/utils';

moduleUnitTest(
  appModule,
  [
    'ui.router',
    'ngMaterial',
    'mm-manager.manager'
  ],
  {
    name : 'state setup',
    logic: testStateSetup
  }
);

function testStateSetup() {
  let stateProvider = {};
  let urlRouterProvider = {};

  beforeEach(() => {
    stateProvider = {
      state: sinon.spy()
    };
    urlRouterProvider = {
      otherwise: sinon.spy()
    }
  });

  it('should set state name to \'mm\'', (done) => {
    let callArgs;

    appModuleState(stateProvider, urlRouterProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.name).to.equal('mm');

    done();
  });

  it('should set state url to \'/\'', (done) => {
    let callArgs;

    appModuleState(stateProvider, urlRouterProvider);

    expect(stateProvider.state.calledOnce).to.equal(true);
    callArgs = stateProvider.state.getCall(0).args[0];
    expect(callArgs.url).to.equal('/');

    done();
  });

  it('should call urlRouterProvider to point at itself, i.e. \'/\'', (done) => {
    let callArgs;

    appModuleState(stateProvider, urlRouterProvider);

    expect(urlRouterProvider.otherwise.calledOnce).to.equal(true);
    callArgs = urlRouterProvider.otherwise.getCall(0).args[0];
    expect(callArgs).to.equal('/');

    done();
  })
}
