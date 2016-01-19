import searchMovieModule from './search-movie.module';
import MMSearchMovieDirective from './search-movie.directive';

import 'angular-mocks';

describe('mm-search-movie directive', ()=> {
  const module = angular.mock.module;
  const inject = angular.mock.inject;

  context('class', () => {
    let instance;

    beforeEach(() => {
      instance = new MMSearchMovieDirective();
    });

    it('should have E restriction', () => {
      expect(instance.restrict).to.be.equal('E');
    });

    [
      ['movies', '=movies']
    ].forEach((expectedScopeEntry) => {
      const keyIndex = 0;
      const valueIndex = 1;
      it(`should have ${expectedScopeEntry[keyIndex]} in scope`, () => {
        const key = expectedScopeEntry[keyIndex];
        const value = expectedScopeEntry[valueIndex];
        const scope = instance.scope;

        expect(scope).to.have.key(key);
        expect(scope[key]).to.equal(value)
      })
    })

  });

  context('angular', () => {
    let $compile,
        $rootScope;
    beforeEach(module(searchMovieModule));

    beforeEach(inject((_$compile_, _$rootScope_)=> {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    describe('hinting', () => {
      it('should display searchQuery hint if empty', ()=> {
        let scope = $rootScope.$new(true);
        let element = $compile('<mm-search-movie></mm-search-movie>')(scope);

        scope.$digest();

        // hints are in span elements, lets lookup these with hint class
        let hints = Array.from(element.find('span')).filter((el)=> {
          el = angular.element(el);
          return el.hasClass('hint') && el.text() === 'Query to search engine';
        });

        expect(hints).to.have.length(1);

      });

      it('should not display searchInDatabases hint, search engines available', ()=> {
        let scope = $rootScope.$new(true);
        let element = $compile('<mm-search-movie></mm-search-movie>')(scope);

        scope.$digest();

        // hints are in span elements, lets lookup these with hint class
        let hints = Array.from(element.find('span')).filter((el)=> {
          el = angular.element(el);
          return el.hasClass('hint') && el.text() === 'Database to search in';
        });

        expect(hints).to.have.length(0);

      });

      it('should display searchInDatabases, no search engines available', () => {
        // TODO(mock) mock mmSearchMovie to return no available search engines
      });
    })
  })
});
