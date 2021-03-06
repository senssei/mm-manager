import lString from 'lodash/string';
import moment from 'moment';

const HTTP = new WeakMap();
const Q = new WeakMap();
const LOG = new WeakMap();
const RESULT_TRANSFORMER = new WeakMap();

const OMDB_URL = 'http://www.omdbapi.com/';

const VALUES_TO_SKIP = ['N/A'];

class OMDBResultTransformer {

  static get skipValues() {
    return VALUES_TO_SKIP; // better static variables handling done here
  }

  transformPair(key, value) {
    const mapper = {
      'released': () => {
        let releasedAt;
        if (!value) {
          releasedAt = moment();
        } else {
          releasedAt = moment(value, 'DD MMM YYYY');
        }
        return {
          key  : 'releasedAt',
          value: releasedAt.toDate()
        }
      },
      'runtime' : () => {
        if (!value) {
          return 0;
        }
        let runtime = value.split(' ')[0];
        return {
          key  : 'duration',
          value: parseInt(runtime)
        };
      },
      'plot'    : () => {
        return {
          key  : 'description',
          value: value
        }
      }
    };
    return key in mapper ? mapper[key](value) : {key, value};
  }

  transformData(data) {
    const newData = {};
    let value;
    let pair;

    for (let key of Object.keys(data)) {
      value = data[key];
      if (shouldSkipValue()) {
        continue;
      }
      pair = this.transformPair(lString.camelCase(key), value);
      newData[pair.key] = pair.value;
    }

    return newData;

    function shouldSkipValue() {
      if (!value) {
        return true;
      } else if (OMDBResultTransformer.skipValues.indexOf(value) >= 0) {
        return true;
      }
      return false;
    }
  }
}

class OMBDBSearch {
  constructor($http, $q, $log) {
    HTTP.set(this, $http);
    Q.set(this, $q);
    LOG.set(this, $log);
    RESULT_TRANSFORMER.set(this, new OMDBResultTransformer());
  }

  byTitle(title = undefined) {
    const $q = Q.get(this);
    const $http = HTTP.get(this);
    const $log = LOG.get(this);
    const resultTransfomer = RESULT_TRANSFORMER.get(this);

    if (!title) {
      return $q.reject('Cannot search by title, if one is missing');
    } else if (title.length === 1) {
      return $q.reject('Cannot search by title, phrase must contain more then one character');
    }

    const config = {
      cache : true,
      params: {
        t: title
      }
    };

    return $http.get(OMDB_URL, config).then(
      (data)=> {
        $log.debug(`OMDBSearch :: Retrieved ${data}`);
        return resultTransfomer.transformData(data.data);
      },
      (error)=> {
        $log.debug(`OMDBSearch :: Error ${error}`);
        return error;
      }
    )

  }

  static factory($http, $q, $log) {
    return new OMBDBSearch($http, $q, $log);
  }
}

export default ['$http', '$q', '$log', OMBDBSearch.factory];
