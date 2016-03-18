import Controller from '../../../core/controller';
import {Promise} from 'es6-promise';

// place holders for variables for controller
const LOG = new WeakMap();

// local constants
const HOME_DIR_MARKER = '~/';

export const name = 'FSDirController';
export class FSDirController extends Controller {
  /*@ngInject*/
  constructor($scope, $log) {
    super($scope);
    LOG.set(this, $log);
  }

  $setup() {
    LOG.get(this).debug(`Setting up ${name}`);
    const vm = this;

    vm.directory = undefined;
    vm.content = [];
  }

  displayDirectory(directory = HOME_DIR_MARKER) {
    const vm = this;
    LOG.get(this).debug(`Setting up directory ${directory} to display content`);
    vm.getDirectoryContent(directory).then((dir, content)=> {
      vm.directory = dir;
      vm.content = content;
    });
  }

  getDirectoryContent(directory) {
    // replace it with resource call once it is available
    return new Promise((resolve)=> {
      resolve(directory, []);
    });
  }

}