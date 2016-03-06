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

  describe('setup/destroy', ()=> {
    it('should setup properly', ()=> {
      ctrl = getCtrlInstance();
      $rootScope.$digest();

      expect(ctrl.foundMovies).to.be.eq(undefined);
      expect(ctrl.movieSelected).to.be.eq(false);
      expect(ctrl.movie).to.deep.eq({});

    });

    it('should clear references in destroy', () => {
      ctrl = getCtrlInstance();
      $rootScope.$digest();

      $rootScope.$apply(()=> {
        ctrl.foundMovies = [];
        ctrl.movie = true;
        ctrl.movieSelected = true;
      });

      $scope.$destroy();
      $rootScope.$digest();

      expect(ctrl.foundMovies).to.be.eq(undefined);
      expect(ctrl.movie).to.be.eq(undefined);
      expect(ctrl.movieSelected).to.be.eq(undefined);
    });

  });

  describe('toggleSearchNav', () => {
    it('should toggle search nav', ()=> {
      let toggleFn = sinon.spy();
      let nameOfSideNav = 'movieSearchSideNav';
      let sideNav = sinon
        .stub()
        .withArgs(nameOfSideNav)
        .returns({
          'toggle': toggleFn
        });

      ctrl = getCtrlInstance({
        $mdSidenav: sideNav
      });
      $rootScope.$digest();

      ctrl.toggleSearchNav();

      expect(sideNav.calledWithExactly(nameOfSideNav)).to.be.eql(true);
      expect(toggleFn.calledOnce).to.be.eql(true);

    });
  });

  describe('selectMovieFromSearch', () => {
    let $event = undefined;
    let expectedKeys = [
      'title', 'subtitle', 'description',
      'releasedAt', 'poster', 'duration',
      'director'
    ];
    let movie = {
      title   : 'Terminator',
      duration: 500
    };
    let keys = Object.keys(movie);

    beforeEach(()=> {
      ctrl = getCtrlInstance();
      ctrl.toggleSearchNav = sinon.spy();

      $event = {
        stopImmediatePropagation: sinon.spy()
      }
    });

    it('should set movieSelected to true', () => {
      let movie = {};
      ctrl.selectMovieFromSearch($event, movie);

      expect(ctrl.movieSelected).to.be.eql(true);
      expect(ctrl.toggleSearchNav.calledOnce).to.be.eql(true);
      expect($event.stopImmediatePropagation.calledOnce).to.be.eql(true);
    });

    it('should copy defined keys from movie to scope movie', ()=> {
      ctrl.selectMovieFromSearch($event, movie);

      expect(ctrl.movieSelected).to.be.eql(true);
      expect(ctrl.toggleSearchNav.calledOnce).to.be.eql(true);
      expect($event.stopImmediatePropagation.calledOnce).to.be.eql(true);

      // check movie
      expect(ctrl.movie).to.not.be.undefined;
      expect(Object.keys(ctrl.movie)).to.eql(expectedKeys);

      expect(ctrl.movie).to.have.any.keys(keys);
      for (let key of keys) {
        expect(ctrl.movie[key]).to.eql(movie[key]);
      }
    });

    it('should set only defined keys, rest to null', () => {
      ctrl.selectMovieFromSearch($event, movie);

      expect(ctrl.movieSelected).to.be.eql(true);
      expect(ctrl.toggleSearchNav.calledOnce).to.be.eql(true);
      expect($event.stopImmediatePropagation.calledOnce).to.be.eql(true);

      // check movie
      expect(ctrl.movie).to.not.be.undefined;
      for (let key of Object.keys(ctrl.movie)) {
        if (keys.indexOf(key) >= 0) {
          continue;
        }
        expect(ctrl.movie[key]).to.eql(null);
      }
    })
  });

  function getCtrlInstance(overrides = {}) {
    let args = {
      $scope    : $scope,
      $state    : $state,
      $mdToast  : $mdToast,
      $mdSidenav: $mdSidenav,
      mmFire    : mmFire
    };
    let actualArgs = Object.assign(args, overrides);

    let controller = $controller(ctrlName, actualArgs);
    $scope.vm = controller;
    return controller;
  }
}