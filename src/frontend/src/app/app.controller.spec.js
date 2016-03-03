import appModule from './app.module';

import 'angular-mocks';

describe('app', ()=> {
  describe('appController', ()=> {

    const module = angular.mock.module;
    const inject = angular.mock.inject;

    let $state;
    let $scope;
    let $controller;
    let ctrl;

    beforeEach(module(appModule));
    beforeEach(inject((_$rootScope_, _$state_, _$controller_)=> {
      $state = _$state_;
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
    }));

    it('should proceed to new movie state', () => {
      let stateMock = sinon.mock();
      let mmFireMock = {
        firebaseArray: () => {
          return {
            $loaded: sinon.mock()
          }
        }
      };
      let instance = $controller('appController', {
        $scope: $scope,
        $state: $state,
        $log  : sinon.mock(),
        mmFire: mmFireMock
      })
    })
  });

});