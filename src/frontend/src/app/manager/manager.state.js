export const name = 'mm.mgr';

/*@ngInject*/
export default function managerState($stateProvider) {
  const state = {
    name    : name,
    abstract: true,
    url     : 'mgr/'
  };
  $stateProvider.state(state);
}
