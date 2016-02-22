import fs from 'fs';
import path from 'path';
import os from 'os';
import thunkify from 'thunkify';
import logger from '../logger';
import S from 'string';

const LOGGER = logger('FSScanner');
const readDir = thunkify(fs.readdir);
const fileStat = thunkify(fs.stat);

export default class FSScanner {

  static *ls(dir = os.homedir(), filter = undefined) {
    LOGGER.debug('ls(dir=%s, filter=%s)', dir, filter);
    let items = yield readDir(dir);
    let files = yield items
      .filter((filePath)=> {
        // cannot actually determine if file is hidden in windows
        if (process.platform === 'win32') {
          return true;
        }
        return !(/^\./.test(filePath));
      })
      .map((filePath)=> {
        let actualPath = path.join(dir, filePath);
        let stats = fileStat(actualPath);
        return {
          path: S(actualPath).replaceAll(path.sep, '/').s,
          stat: stats
        }
      });

    LOGGER.debug('ls found %d files in directory %s', files.length, dir);

    return files;
  }

}

function getFilterFn(filter = undefined) {
  if (!!filter) {
    return ()=> {
      return true
    };
  }
  return (item)=> {
    // need to add support for multiple items in filter, splitted by ,
    let reg = new RegExp(`.+${filter}$`, 'gi');
    return reg.test(item);
  }
}
