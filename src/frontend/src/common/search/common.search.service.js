import {Comparable} from '../../core/traits';

const SERVICE_MAP = new WeakMap();
const Q = new WeakMap();

class MovieSearch {
  constructor($q, mmOmdbSearchMovie) {

    const map = [
      new SearchEngineEntry('omdb', 'OMDB', mmOmdbSearchMovie)
    ];

    SERVICE_MAP.set(this, map);
    Q.set(this, $q);
  }

  byTitle(withService, title) {
    const $q = Q.get(this);
    const services = SERVICE_MAP.get(this);

    let index;
    let service;

    if (!withService) {
      return $q.reject(`service to search with must be defined`);
    }

    if ((index = services.findIndex((element)=>element.key === withService)) === -1) {
      return $q.reject(`${withService} does not seem to be supported`);
    }

    service = services[index].service;

    return service.byTitle(title).then((data)=> {
      if (data instanceof Array) {
        return data;
      }
      return [data];
    });
  }

  get searchEngines() {
    const services = SERVICE_MAP.get(this);
    return services
      .sort((see1, see2)=> {
        return see1.compareTo(see2);
      })
      .map((see)=> {
        return {
          key  : see.key,
          label: see.label
        }
      })
  }

  static factory($q, mmOmdbSearchMovie) {
    return new MovieSearch($q, mmOmdbSearchMovie);
  }
}

class SearchEngineEntry extends Comparable {

  constructor(key, label, service) {
    super();
    this._key = key;
    this._label = label;
    this._service = service;
  }

  get key() {
    return this._key;
  }

  set key(value) {
    this._key = value;
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = value;
  }

  get service() {
    return this._service;
  }

  set service(value) {
    this._service = value;
  }

  compareTo(other) {
    const same = super.compareTo(other);
    if (same === 0) {
      return this._key.localeCompare(other._key);
    }
    return same;
  }
}

export default ['$q', 'mmOmdbSearchMovie', MovieSearch.factory];