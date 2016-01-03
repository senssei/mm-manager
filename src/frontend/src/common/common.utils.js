const WINDOW = new WeakMap();

class Utils {
  constructor($window) {
    WINDOW.set(this, $window);
  }

  urlParams(url) {
    url = url || WINDOW.get(this).location.href;
    if (!url || (url.indexOf("?") < 0 && url.indexOf("&") < 0)) {
      return new Map();
    }
    if (url.indexOf('#') > -1) {
      url = url.substring(url.indexOf('#') + 2, url.length);
    }
    var params = url.substr(url.indexOf("?") + 1);
    return urlDecode(params);

    function urlDecode(params) {
      return params.split('&')
        .map(v => v.split("="))
        .reduce((map, [key, value]) => map.set(key, decodeURIComponent(value)), new Map());
    }
  }

  dumpObject(obj) {
    return JSON.stringify(obj, null, 2);
  }

  isDebug(url) {
    url = url || WINDOW.get(this).location.href;
    let params = this.urlParams(url);
    let hasDebugInParams = params.has('debug');
    return (hasDebugInParams && ['true', '1'].indexOf(params.get('debug')) >= 0)
      || hasDebugInParams;
  }

  /*@ngInject*/
  static factory($window) {
    return new Utils($window);
  }
}

export default {
  name   : 'mmUtils',
  factory: Utils.factory
}
