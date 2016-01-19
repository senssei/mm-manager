import searchModule from './search-movie.module.js';

import {moduleUnitTest} from 'test/utils';

const expectedName = 'mm-manager.manager.search.movie';
const expectedDependencies = [
  'mm-manager.search'
];

export default moduleUnitTest(
  expectedName,
  expectedDependencies
);
