import fsTreeModule from './';
import {name as ctrlName} from './dir.tree.controller';

import 'angular-mocks';

const module = angular.mock.module;
const inject = angular.mock.inject;

describe('app', ()=> {
  describe('fs', ()=> {
    describe('dir', () => {
      describe(ctrlName, ()=> {

        let $scope;
        let $rootScope;
        let $log;
        let $controller;
        let ctrl;

        beforeEach(module(fsTreeModule));
        beforeEach(inject((_$rootScope_,
                           _$log_,
                           _$controller_)=> {
          $rootScope = _$rootScope_;
          $scope = _$rootScope_.$new();
          $log = _$log_;
          $controller = _$controller_;
        }));

        describe('setup', ()=> {
          it('should create initial variables', ()=> {
            ctrl = getCtrlInstance();
            $rootScope.$digest();

            expect(ctrl.content).to.be.instanceof(Array);
            expect(ctrl.content).to.be.have.length(0);

            expect(ctrl.directory).to.be.undefined;
          });
        });

        describe('displayDirectory', () => {
          it('should display home directory by default', ()=> {
            ctrl = getCtrlInstance();
            $rootScope.$digest();

            sinon.spy(ctrl, 'getDirectoryContent');

            ctrl.displayDirectory();

            expect(ctrl.getDirectoryContent.calledOnce).to.be.true;
            expect(ctrl.getDirectoryContent.calledWith('~/')).to.be.true;
          });
          it('should display passed directory', ()=> {
            let directory = '/home/test';

            ctrl = getCtrlInstance();
            $rootScope.$digest();

            sinon.spy(ctrl, 'getDirectoryContent');

            ctrl.displayDirectory(directory);

            expect(ctrl.getDirectoryContent.calledOnce).to.be.true;
            expect(ctrl.getDirectoryContent.calledWith(directory)).to.be.true;
          });
        });

        function getCtrlInstance(overrides = {}) {
          let args = {
            $scope: $scope,
            $log  : $log
          };
          let actualArgs = Object.assign(args, overrides);
          let controller = $controller(ctrlName, actualArgs);
          $scope.vm = controller;
          return controller;
        }

      });

    });
  });
});
