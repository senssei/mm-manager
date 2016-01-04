import Controller from './controller';

import 'angular-mocks';

class AController extends Controller {
  constructor($scope) {
    super($scope)
  }
}

describe('abstract Controller', () => {

  const inject = angular.mock.inject;

  let $scope;
  let $rootScope;

  context('$watch', () => {

    beforeEach(inject((_$rootScope_)=> {
      $scope = _$rootScope_.$new();
    }));

    it('should not call $scope.$watch if event undefined', ()=> {
      let spy;
      let ctrl = new AController($scope);

      spy = sinon.spy($scope, '$watch');

      ctrl.$watch(undefined, ()=> {
      });

      expect(spy.called).to.be.false;
    });

    it('should not call $scope.$watch if callback undefined', ()=> {
      let spy;
      let ctrl = new AController($scope);

      spy = sinon.spy($scope, '$watch');

      ctrl.$watch('test', undefined);

      expect(spy.called).to.be.false;
    });

    it('should call $scope.$watch', ()=> {
      let spy;
      let ctrl = new AController($scope);

      spy = sinon.spy($scope, '$watch');
      spy.withArgs('test', sinon.match.func);

      ctrl.$watch('test', ()=>{});

      expect(spy.withArgs('test', sinon.match.func).called).to.be.true;
    });

  });

  context('$listen', ()=> {

    context('preventing', ()=> {

      beforeEach(inject((_$rootScope_)=> {
        $scope = _$rootScope_.$new();
      }));

      it('should not call $scope.$on if event undefined', ()=> {
        let $onSpy;
        let ctrl = new AController($scope);

        $onSpy = sinon.spy($scope, '$on');

        ctrl.$listen(undefined, ()=> {
        });

        expect($onSpy.called).to.be.false;
      });
      it('should not call $scope.$on if callback undefined', ()=> {
        let $onSpy;
        let ctrl = new AController($scope);

        $onSpy = sinon.spy($scope, '$on');

        ctrl.$listen('a event', undefined);

        expect($onSpy.called).to.be.false;
      });
    });

    context('listening on $destroy', ()=> {

      beforeEach(inject((_$rootScope_)=> {
        $scope = _$rootScope_.$new();
      }));

      it('should create listener for $scope.$destroy method', ()=> {

        const $onSpy = sinon.spy($scope, '$on');
        $onSpy.withArgs('$destroy', sinon.match.func);

        new AController($scope);

        expect($onSpy.withArgs('$destroy', sinon.match.func).calledOnce).to.be.true;
      });
    });

    context('reacting on $destroy event', ()=> {

      beforeEach(inject((_$rootScope_)=> {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
      }));

      it('should call Controller.$destroy method', ()=> {
        const ctrl = new AController($scope);
        const $destroyMock = sinon.mock(ctrl).expects('$destroy');

        $destroyMock.once();

        $scope.$destroy();
        $rootScope.$digest();

        $destroyMock.verify();
      })

    });
  });
});