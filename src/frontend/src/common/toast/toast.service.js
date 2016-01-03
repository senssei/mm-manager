const MD_TOAST = new WeakMap();

class ToastService {

  constructor($mdToast) {
    MD_TOAST.set(this, $mdToast);
  }

  info(msg) {
    return show(MD_TOAST.get(this), msg);
  }

  /*@ngInject*/
  static factory($mdToast) {
    return new ToastService($mdToast);
  }
}

function show($mdToast, message = undefined) {
  if (!message) {
    return;
  }
  const preset = $mdToast
    .simple()
    .content(message)
    .position('bottom right')
    .capsule(true);
  return $mdToast.show(preset);
}

export default ToastService.factory;
