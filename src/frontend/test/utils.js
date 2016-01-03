'use strict';

import angular from 'angular';

export function verifyMapContent(map, content = {}) {
  if (!map) {
    return;
  }
  for(let key in content){
    let value = content[key];
    expect(map.has(key), `Map should contain ${key}`).to.equal(true);
    expect(map.get(key), `Map value under ${key} should equal to ${value}`).to.equal(value);
  }
}

export function moduleUnitTest(name, requiredDependencies = [], ...logicTestFn) {

  describe(name + ' module', function () {
    var testedModule;

    before(()=> {
      // get the module object
      testedModule = angular.module(name)
    });

    it("should be registered", ()=> {
      expect(testedModule).not.to.equal(null);
    });

    if (requiredDependencies && requiredDependencies.length > 0) {
      context('dependencies', () => {
        let deps;

        before(()=> {
          deps = testedModule.value(name).requires;
        });

        it('should match dependency count', (done) => {
          let dependenciesLength = deps.length;
          let requiredDependenciesLength = requiredDependencies.length;
          let msg = `Has ${dependenciesLength} dependencies, but ${requiredDependenciesLength} was specified`;
          expect(deps.length, msg).to.equal(requiredDependencies.length);
          done();
        });

        requiredDependencies.forEach((dep) => {
          it(`should dependent on ${dep}`, ()=> {
            expect(hasModule(dep), 'No dependency for testedModule ' + dep).to.equal(true);
          });
        });

        function hasModule(m) {
          return deps.indexOf(m) >= 0;
        }
      });
    }

    if (logicTestFn) {
      logicTestFn.forEach((fn) => {
        let name = fn.name;
        let logic = fn.logic;
        if (!name) {
          throw new Error('Missing name of the logic test');
        }
        if (!logic) {
          throw new Error(`${name} does not define logic function`);
        }
        context(name, logic);
      })
    }
  });
}