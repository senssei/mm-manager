'use strict';

import indexModule from './index.module';

import {moduleUnitTest} from  '../test/utils';

moduleUnitTest(indexModule, [
  'mm-manager.vendor',
  'mm-manager.app',
  'mm-manager.common'
]);