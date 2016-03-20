import fs from 'fs';
import path from 'path';
import os from 'os';
import thunk from 'thunkify';
import logger from '../logger';
import S from 'string';

const LOGGER = logger('FSScanner');
const fsReadDir = thunk(fs.readdir);
const fsStat = thunk(fs.stat);

const noopFilter = ()=> {
  return true;
};

export default class FSScanner {

  constructor(dir, filter, onlyDirectory) {
    this.dir = dir || os.homedir();
    this.filter = filter || '';
    this.onlyDirectory = onlyDirectory || true;
  }

  *ls() {
    const dir = this.dir;
    const onlyDirectory = this.onlyDirectory;
    const filter = this.filter;

    LOGGER.debug('ls(dir=%s, filter=%s)',
      dir,
      filter,
      onlyDirectory
    );

    let items = yield fsReadDir(dir);
    let stats = yield items.map((item)=> {
      return fsStat(path.join(dir, item));
    });

    let files = yield items
      .filter(hiddenFilter())
      .filter(onlyDirectoryFilter(stats, onlyDirectory))
      .filter(expressionFilter(filter))
      .map(fullPathMapper(dir))
      .map(resultMapper(stats, dir));

    LOGGER.debug('ls found %d files in directory %s', files.length, dir);

    return files;
  }

  static *ls(dir = os.homedir(), filter = undefined, onlyDirectory = true) {
    const fsScanner = new FSScanner(dir, filter, onlyDirectory);
    return yield fsScanner.ls();
  }

}

function hiddenFilter() {
  const win32 = process.platform === 'win32';
  if (win32) {
    LOGGER.warn(`Current platform is ${process.platform}, where it cannot be said if file is hidden or not`);
    return noopFilter;
  }
  return (filePath)=> {
    return !(/^\./.test(filePath));
  }
}

function onlyDirectoryFilter(stats, onlyDirectory = true) {
  if (onlyDirectory) {
    return (filePath)=> {
      LOGGER.trace(`Verifying isDirectory for path=${filePath}`);
      let isDir = stats[filePath].isDirectory();
      LOGGER.debug(`isDirectory for path=${filePath} is ${isDir}`);
      return isDir;
    }
  }
  return noopFilter;
}


function fullPathMapper(dir) {
  return (filePath)=> {
    return {
      rawPath: filePath,
      path   : path.join(dir, filePath)
    };
  }
}

function resultMapper() {
  return (item) => {
    let actualPath = item.path;
    let rawPath = item.rawPath;
    let stats = fsStat(actualPath);

    return {
      path   : S(actualPath).replaceAll(path.sep, '/').s,
      rawPath: rawPath,
      stat   : stats
    }
  }
}

function expressionFilter(filter = '') {
  let filterArray;
  if (!filter || !(filterArray = filter.split(',')).length) {
    return noopFilter;
  }
  return (item)=> {
    let path = item.rawPath;
    return filterArray
      .map((expr)=> {
        return new RegExp(`.+${expr}$`, 'gi');
      })
      .some((regExpression)=> {
        return regExpression.test(path);
      });
  }
}
