import Firebase from 'firebase';
import url from 'url';

const FIRE_URL = FIREBASE_URL;
const FB_OBJECT = new WeakMap();
const FB_ARRAY = new WeakMap();

class FireUtils {

  constructor($firebaseObject, $firebaseArray) {
    FB_OBJECT.set(this, $firebaseObject);
    FB_ARRAY.set(this, $firebaseArray);
  }

  firebaseObject(uri = '/') {
    let actual_url = url.resolve(FIRE_URL, uri);
    let ref = new Firebase(actual_url);
    return FB_OBJECT.get(this)(ref);
  }

  firebaseArray(uri = '/') {
    let actual_url = url.resolve(FIRE_URL, uri);
    let ref = new Firebase(actual_url);
    return FB_ARRAY.get(this)(ref);
  }

  /*@ngInject*/
  static factory($firebaseObject, $firebaseArray) {
    return new FireUtils($firebaseObject, $firebaseArray);
  }
}

export default FireUtils.factory;