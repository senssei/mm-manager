import {DEBUG} from 'common/flags';

export {appThemeConfig, templateConfig};

/**
 * @param $mdThemingProvider
 * @ngInject
 */
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
    .dark()
    .primaryPalette(palette);
}

/**
 *
 * @param $compileProvider
 * @ngInject
 */
function templateConfig($compileProvider) {
  $compileProvider.debugInfoEnabled(DEBUG);
}
