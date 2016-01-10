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
  },
  {
    name : 'theme setup',
    logic: themeSetup
  }
);

function themeSetup() {
  let mdThemingProvider = {};

  before(()=> {
    mdThemingProvider = {
      definePalette : sinon.spy(),
      theme         : sinon.stub().returnsThis(),
      dark          : sinon.stub().returnsThis(),
      primaryPalette: sinon.stub().returnsThis()
    }
  });

  it('should create custom mmPalette', (done)=> {
    const expectedExtendedPalette = 'blue';
    const expectedExtendedDefinition = {
      '500': '326de6'
    };

    let paletteDefinition = {a: 1};
    let extendedPalette;
    let extendedDefinition;

    mdThemingProvider.extendPalette = sinon.stub().returns(paletteDefinition);

    appThemeConfig(mdThemingProvider);
    expect(mdThemingProvider.extendPalette.calledOnce).to.equal(true);

    extendedPalette = mdThemingProvider.extendPalette.getCall(0).args[0];
    extendedDefinition = mdThemingProvider.extendPalette.getCall(0).args[1];
    expect(extendedPalette).to.equal(expectedExtendedPalette);
    expect(extendedDefinition).to.deep.equal(expectedExtendedDefinition);

    expect(mdThemingProvider.definePalette.calledOnce).to.equal(true);
    expect(mdThemingProvider.definePalette.getCall(0).args[0]).to.equal('mmPalette');
    expect(mdThemingProvider.definePalette.getCall(0).args[1]).to.deep.equal(paletteDefinition);

    expect(mdThemingProvider.theme.calledOnce).to.equal(true);
    expect(mdThemingProvider.theme.calledWith('default')).to.equal(true);

    expect(mdThemingProvider.dark.calledOnce).to.equal(true);

    expect(mdThemingProvider.primaryPalette.calledOnce).to.equal(true);
    expect(mdThemingProvider.primaryPalette.calledWith('mmPalette')).to.equal(true);

    done();
  })
}

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
