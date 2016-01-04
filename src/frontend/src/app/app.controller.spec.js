import timer from 'timers';
import appModule from './app.module';

import 'angular-mocks';

describe('mm-manager.app appController', () => {

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

  it('should set cards to empty array if no states', (done)=> {
    $state.get = sinon.stub().returns([]);
    ctrl = $controller('appController', {
      $scope: $scope,
      $state: $state
    });

    timer.setTimeout(()=> {
      expect(ctrl.cards).to.be.empty;
      done();
    }, 100);

  });

  it('should set 2 elements array if two mainPageCard states are present', (done)=> {
    const states = [
      {
        name        : 'test',
        mainPageCard: true,
        icon        : 'test'
      },
      {
        name        : 'test2',
        mainPageCard: true,
        icon        : 'test2'
      }
    ];

    $state.get = sinon.stub().returns(states);
    ctrl = $controller('appController', {
      $scope: $scope,
      $state: $state
    });

    timer.setTimeout(()=> {
      expect(ctrl.cards).not.to.be.empty;
      expect(ctrl.cards).to.have.length(2);
      done();
    }, 100);
  });

  it('should pick one mainPageCard even if 99 normal states are defined', (done)=> {
    const states = (()=> {
      const max = 100;
      const arr = [];
      for (let i = 0; i < max; i++) {
        arr.push(
          {
            name        : `test{$i}`,
            mainPageCard: i == 99,
            icon        : `test{$i}`
          }
        )
      }
      return arr;
    })();

    $state.get = sinon.stub().returns(states);
    ctrl = $controller('appController', {
      $scope: $scope,
      $state: $state
    });

    timer.setTimeout(()=> {
      expect(ctrl.cards).not.to.be.empty;
      expect(ctrl.cards).to.have.length(1);
      done();
    }, 100);
  });

});