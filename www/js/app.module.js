'use strict';
angular.module('app.module', [
  'ionic',
  'pascalprecht.translate',
  'MenuCtrl',
  'MeetingsListCtrl',
  'MeetingCtrl',
  'IssueCtrl',
  'ProcessCtrl',
  'PdfViewCtrl',
  'PdfView2Ctrl',
  'StorageService',
  'app.config',
  'ngIOS9UIWebViewPatch',
  'FileHistory'
  /* 'ngSanitize'*/
  ])
.config(configMe)
.run(runMe);

configMe.$inject = ['$urlRouterProvider', '$stateProvider', '$injector', 
  '$ionicConfigProvider', '$translateProvider', 'StorageServiceProvider', 'CONF'];

function configMe($urlRouterProvider, $stateProvider, $injector, 
  $ionicConfigProvider, $translateProvider, StorageServiceProvider, CONF) {

  console.log('app.config: version ' +CONF.app_version);  

  $ionicConfigProvider.views.transition('none');

  /* Language */
  var lang = StorageServiceProvider.$get().getLanguage();
  console.log('app.config: lang from storage: ' +lang);
  if (null === lang) {
      lang = 'fi';
      StorageServiceProvider.$get().setLanguage(lang);
  }

  $translateProvider
  .useStaticFilesLoader({
    prefix: 'js/locales/lang-',
    suffix: '.json'
  })
  .registerAvailableLanguageKeys(['fi', 'se'], {
    'fi' : 'fi', 'se' : 'se'
  })
  .preferredLanguage(lang)
  .fallbackLanguage('fi')
 //.determinePreferredLanguage() Commented because only a few languages supported
  .useSanitizeValueStrategy('escapeParameters')
  .use(lang);
};

runMe.$inject = ['$ionicPlatform', '$rootScope'];

function runMe($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Following for debugging
  $rootScope.$on('$stateChangeStart', function (event, next, toParams) {
    console.log('app.stateChangeStart: ' +next.name +' toParams: ' +JSON.stringify(toParams));
    if (false) {
      //event.preventDefault()
    }
  });
  $rootScope.$on('$stateChangeError', console.error.bind(console));
};
