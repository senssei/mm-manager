import searchMovieModule from './search-movie.module';
import MMSearchMovieDirective from './search-movie.directive';

import 'angular-mocks';

describe('mm-search-movie directive', ()=> {
  const module = angular.mock.module;
  const inject = angular.mock.inject;

  let $compile,
      $rootScope;

  context('class', () => {
    let instance;

    beforeEach(() => {
      instance = new MMSearchMovieDirective();
    });

    it('should have E restriction', () => {
      expect(instance.restrict).to.be.equal('E');
    });

    it('should have ngModel in require', () => {
      let require = instance.require;
      expect(require).to.contain('?ngModel');
    });

  });

  context('angular', () => {
    beforeEach(module(searchMovieModule));

    beforeEach(inject((_$compile_, _$rootScope_)=> {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));
  })
})