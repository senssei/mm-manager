import commonModule from './common.module';

import {moduleUnitTest} from  'test/utils';

moduleUnitTest(
  'mm-manager.common',
  [
    'mm-manager.directives',
    'mm-manager.toast'
  ]
);