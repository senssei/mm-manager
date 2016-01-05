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

  context('$broadcast', () => {

    beforeEach(inject((_$rootScope_)=> {
      $scope = _$rootScope_.$new();
    }));

    it('should not $broadcast if eventName undefined', () => {
      let spy;
      let ctrl = new AController($scope);

      spy = sinon.spy($scope, '$broadcast');

      ctrl.$broadcast(undefined);

      expect(spy.called).to.be.false;
    });

    it('should not use different $broadcast if valid is passed', () => {
      let spy;
      let spy2;
      let differentScope = $scope.$new();
      let ctrl = new AController($scope);

      spy = sinon.spy(differentScope, '$broadcast');
      spy.withArgs(sinon.match.string, sinon.match.object);

      spy2 = sinon.spy($scope, '$broadcast');
      spy2.withArgs(sinon.match.string, sinon.match.object);

      ctrl.$broadcast('event', {}, differentScope);

      expect(spy.withArgs(sinon.match.string, sinon.match.object).called).to.be.true;
      expect(spy2.withArgs(sinon.match.string, sinon.match.object).called).to.be.false;
    });

    it('should use different $broadcast if undefined is passed', () => {
      let spy;
      let spy2;
      let differentScope = $scope.$new();
      let ctrl = new AController($scope);

      spy = sinon.spy(differentScope, '$broadcast');
      spy.withArgs(sinon.match.string, sinon.match.object);

      spy2 = sinon.spy($scope, '$broadcast');
      spy2.withArgs(sinon.match.string, sinon.match.object);

      ctrl.$broadcast('event');

      expect(spy.withArgs(sinon.match.string, sinon.match.object).called).to.be.false;
      expect(spy2.withArgs(sinon.match.string, sinon.match.object).called).to.be.true;
    });
  });

  context('$emit', () => {

    beforeEach(inject((_$rootScope_)=> {
      $scope = _$rootScope_.$new();
    }));

    it('should not $emit if eventName undefined', () => {
      let spy;
      let ctrl = new AController($scope);

      spy = sinon.spy($scope, '$emit');

      ctrl.$emit(undefined);

      expect(spy.called).to.be.false;
    });

    it('should not use different $scope if valid is passed', () => {
      let spy;
      let spy2;
      let differentScope = $scope.$new();
      let ctrl = new AController($scope);

      spy = sinon.spy(differentScope, '$emit');
      spy.withArgs(sinon.match.string, sinon.match.object);

      spy2 = sinon.spy($scope, '$emit');
      spy2.withArgs(sinon.match.string, sinon.match.object);

      ctrl.$emit('event', {}, differentScope);

      expect(spy.withArgs(sinon.match.string, sinon.match.object).called).to.be.true;
      expect(spy2.withArgs(sinon.match.string, sinon.match.object).called).to.be.false;
    });

    it('should use different $scope if undefined is passed', () => {
      let spy;
      let spy2;
      let differentScope = $scope.$new();
      let ctrl = new AController($scope);

      spy = sinon.spy(differentScope, '$emit');
      spy.withArgs(sinon.match.string, sinon.match.object);

      spy2 = sinon.spy($scope, '$emit');
      spy2.withArgs(sinon.match.string, sinon.match.object);

      ctrl.$emit('event');

      expect(spy.withArgs(sinon.match.string, sinon.match.object).called).to.be.false;
      expect(spy2.withArgs(sinon.match.string, sinon.match.object).called).to.be.true;
    });
  });

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

      ctrl.$watch('test', ()=> {
      });

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
