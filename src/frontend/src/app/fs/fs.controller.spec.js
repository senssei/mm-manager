import fsModule from './index';

import 'angular-mocks';

const module = angular.mock.module;
const inject = angular.mock.inject;
const ctrlName = 'FSController';

describe('app', ()=> {
  describe('fs', ()=> {
    describe(ctrlName, fsControllerSpec);
  });
});

function fsControllerSpec() {
  let $scope;
  let $rootScope;
  let $controller;

  beforeEach(module(fsModule));
  beforeEach(inject((_$rootScope_,
                     _$controller_)=> {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
  }));

  it('should create instance of controller', () => {
    let instance = $controller(ctrlName, {
      $scope: $scope
    });
    expect(instance).to.be.defined;
  });
}