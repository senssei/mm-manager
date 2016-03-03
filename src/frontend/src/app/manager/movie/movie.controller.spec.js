import movieModule from './movie.module';

import 'angular-mocks';

const module = angular.mock.module;
const inject = angular.mock.inject;
const ctrlName = 'movieController';

describe('app', ()=> {
  describe('manager', ()=> {
    describe('movie', () => {
      describe('MovieController', movieControllerSpec);
    });
  });
});

function movieControllerSpec() {
  let $state;
  let $scope;
  let $rootScope;
  let $mdToast;
  let $mdSidenav;
  let $controller;
  let mmFire;
  let ctrl;

  beforeEach(module(movieModule));
  beforeEach(inject((_$rootScope_,
                     _$state_,
                     _$mdToast_,
                     _$mdSidenav_,
                     _mmFire_,
                     _$controller_)=> {
    $state = _$state_;
    $controller = _$controller_;
    $mdToast = _$mdToast_;
    $mdSidenav = _$mdSidenav_;
    mmFire = _mmFire_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();

    mmFire.firebaseArray = sinon
      .stub()
      .withArgs('/movies')
      .returns({
        $add: sinon.stub()
      });
  }));

  describe('setup', ()=> {
    it('should setup properly', ()=> {
      ctrl = getCtrlInstance();
      $rootScope.$digest();
      expect(ctrl.foundMovies).to.be.eq(undefined);
      expect(ctrl.movieSelected).to.be.eq(false);
      expect(ctrl.movie).to.be.eq({});
    });
  });

  function getCtrlInstance() {
    let controller = $controller(ctrlName, {
      $scope    : $scope,
      $state    : $state,
      $mdToast  : $mdToast,
      $mdSidenav: $mdSidenav,
      mmFire    : mmFire
    });
    $scope.vm = controller;
    return controller;
  }
}