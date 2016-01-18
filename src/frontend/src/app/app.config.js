import {DEBUG} from 'common/flags';

/**
 *
 * @param $compileProvider
 * @ngInject
 */
export function templateConfig($compileProvider) {
  $compileProvider.debugInfoEnabled(DEBUG);
}
