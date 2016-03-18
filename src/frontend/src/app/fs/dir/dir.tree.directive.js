import BoundDirective from '../../../core/directive';

import {name as FSTreeController} from './dir.tree.controller';

export const name = 'mmFsDirList';
export class FSTreeDirective extends BoundDirective {

  constructor() {
    super(FSTreeController);
    this.restrict = 'E';
    this.templateUrl = require('./dir.tree.tpl.html');
    this.scope = {
      'directory': '=' // currently display directory
    }
  }

  link(scope, element, attrs, ctrl) {
    let directoryWatcher = scope.$watch('vm.directory', (directory)=> {
      if (directory) {
        ctrl.displayDirectory(directory);
      }
    });

    // un register watchers
    scope.$on('$destroy', directoryWatcher);
  }

  /*@ngInject*/
  static factory() {
    return new FSTreeDirective();
  }
}

