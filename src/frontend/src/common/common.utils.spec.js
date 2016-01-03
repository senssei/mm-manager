import angular from 'angular';
import commonModule from './common.module';

import {verifyMapContent} from '../../test/utils';

import 'angular-mocks';

describe('mmUtils', () => {

  const inject = angular.mock.inject;

  beforeEach(angular.mock.module(commonModule));

  it('mmUtils should be defined', inject((mmUtils)=> {
    expect(mmUtils).to.be.defined;
  }));

  context('urlParams', () => {
    it('should read params from url without #', inject((mmUtils) => {
      let url = '/test?a=1&b=2';
      let params = mmUtils.urlParams(url);

      let expectedParams = {
        a: '1',
        b: '2'
      };

      verifyMapContent(params, expectedParams);
    }));

    it('should read params from url with #', inject((mmUtils) => {
      let url = '/#/test?a=1&b=2';
      let params = mmUtils.urlParams(url);

      let expectedParams = {
        a: '1',
        b: '2'
      };

      verifyMapContent(params, expectedParams);
    }));
  });

  context('isDebug', () => {
    it('should return debug=true if equal to 1', inject((mmUtils)=> {
      let url = '/#/test?debug=1';
      expect(mmUtils.isDebug(url)).to.equal(true);
    }));

    it('should return debug=true if equal to \'true\'', inject((mmUtils)=> {
      let url = '/#/test?debug=true';
      expect(mmUtils.isDebug(url)).to.equal(true);
    }));

    it('should return debug=true if present in url without value', inject((mmUtils)=> {
      let url = '/#/test?debug';
      expect(mmUtils.isDebug(url)).to.equal(true);
    }));

    it('should return debug=false if not found in url', inject((mmUtils)=> {
      let url = '/';
      expect(mmUtils.isDebug(url)).to.equal(false);
    }));

    it('should return debug=false if equal to \'false\'', inject((mmUtils)=> {
      let url = '/debug=false';
      expect(mmUtils.isDebug(url)).to.equal(false);
    }));

    it('should return debug=false if equal to \'-1\'', inject((mmUtils)=> {
      let url = '/debug=-1';
      expect(mmUtils.isDebug(url)).to.equal(false);
    }));

  });

  context('dumpObject', () => {
    it('should dump plain object to string', inject((mmUtils)=> {
      let data = {
        a: 1
      };
      let expectedDataStr = `{
        "a": 1
      }`;
      let dataAsStr = mmUtils.dumpObject(data);

      expect(JSON.parse(expectedDataStr)).to.deep.equal(JSON.parse(dataAsStr));
    }));
  })

});