'use strict';
angular.module('app.module')
.config(function($urlRouterProvider, $stateProvider, $injector) {

  //$urlRouterProvider.otherwise('app/meetings');
  $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get('$state');
        $state.go('app.meetings');
  });

  /* States and routings */
  $stateProvider
  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      cache: false,
      controller: 'MenuCtrl'
    })
   .state('app.meetings', {
      url: '/meetings',
      views: {
        'menuContent' :{
        templateUrl: 'templates/meetingslist.html',
        controller: 'MeetingsListCtrl'
        }
      }
    })
   .state('app.meeting', {
      url: '/meeting',
      views: {
        'menuContent' :{
        templateUrl: 'templates/meeting.html',
        cache: false,
        controller: 'MeetingCtrl'
        }
      },
      params: {
          meetingId: { value: null },
          pageTitle: { value: null }
      }
    })
    .state('app.issue', {
      url: '/issue',
      views: {
        'menuContent' :{
        templateUrl: 'templates/issue.html',
        cache: false,
        controller: 'IssueCtrl'
        }
      },
      params: {
          meetingId: { value: null },
          issueId: { value: null }
        }
    })
  .state('app.process', {
      url: '/process',
      views: {
        'menuContent' :{
          cache: true,
          templateUrl: 'templates/process.html',
          controller: 'ProcessCtrl'
        }
      }
    })
  .state('app.pdfview', {
      url: '/pdfview',
      views: {
        'menuContent' :{
          cache: false,
          templateUrl: 'templates/pdfview.html',
          controller: 'PdfViewCtrl'
        }
      }
    })
  .state('app.pdfview2', {
      url: '/pdfview2',
      views: {
        'menuContent' :{
          cache: false,
          templateUrl: 'templates/pdfview2.html',
          controller: 'PdfView2Ctrl'
        }
      }
    });
});
