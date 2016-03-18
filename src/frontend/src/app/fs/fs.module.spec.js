import './fs.module';
import stateConfig from './fs.stateConfig';

import {moduleUnitTest} from  'test/utils';


moduleUnitTest(
  'mm-manager.app.fs',
  [
    'ui.router',
    'ngMaterial',
    'mm-manager.app.fs.dir'
  ],
  {
    name : 'state setup',
    logic: ()=> {
      let stateProvider = {};

      beforeEach(() => {
        stateProvider = {
          state: sinon.spy()
        };
      });

      it('should set state name to \'mm.fs\'', (done) => {
        let callArgs;

        stateConfig(stateProvider);

        expect(stateProvider.state.calledOnce).to.equal(true);
        callArgs = stateProvider.state.getCall(0).args[0];
        expect(callArgs.name).to.equal('mm.fs');

        done();
      });

      it('should set state url to \'fs/\'', (done) => {
        let callArgs;

        stateConfig(stateProvider);

        expect(stateProvider.state.calledOnce).to.equal(true);
        callArgs = stateProvider.state.getCall(0).args[0];
        expect(callArgs.url).to.equal('fs/');

        done();
      });

      it('should define top level view', ()=> {
        let callArgs;
        let view;

        stateConfig(stateProvider);

        expect(stateProvider.state.calledOnce).to.equal(true);
        callArgs = stateProvider.state.getCall(0).args[0];
        expect(callArgs.views).to.have.key('@');

        view = callArgs.views['@'];

        expect(view.controller).to.equal('FSController');
        expect(view.controllerAs).to.equal('vm');
        expect(view.bindToController).to.equal(true);
      })
    }
  }
);