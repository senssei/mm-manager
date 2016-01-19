import searchModule from './search.module';
import {moduleUnitTest} from  'test/utils';

const expectedName = 'mm-manager.search';
const expectedDependencies = [
  'ngResource'
];

moduleUnitTest(expectedName, expectedDependencies);
