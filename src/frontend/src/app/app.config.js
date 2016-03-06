import {DEBUG} from 'common/flags';

export {appThemeConfig, templateConfig, httpConfig, urlRouterConfig};

/**
 * @param $mdThemingProvider
 * @ngInject
 */
appThemeConfig.$inject = ['$mdThemingProvider'];
function appThemeConfig($mdThemingProvider) {
  let palette = 'mmPalette';
  let paletteDefinition = $mdThemingProvider.extendPalette('blue', {
    '500': '326de6'
  });

  // Use the palette as default one.
  $mdThemingProvider
    .definePalette(palette, paletteDefinition);
  $mdThemingProvider
    .theme('default')
    .primaryPalette(palette);
}

/**
 *
 * @param $compileProvider
 * @ngInject
 */
templateConfig.$inject = ['$compileProvider'];
function templateConfig($compileProvider) {
  $compileProvider.debugInfoEnabled(DEBUG);
}

httpConfig.$inject = ['$httpProvider'];
export function httpConfig($httpProvider) {
  $httpProvider.useApplyAsync(true);
}

urlRouterConfig.$inject = ['$urlRouterProvider'];
function urlRouterConfig($urlRouterProvider) {
  // case insensitive urls
  $urlRouterProvider.rule(($injector, $location) => {
    let path = $location.path();
    return path.toLowerCase();
  });
}


