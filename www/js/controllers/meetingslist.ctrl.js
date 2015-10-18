'use strict';
angular.module('MeetingsListCtrl', [
    'pascalprecht.translate',
    'MeetingsApi'
    ])
.controller('MeetingsListCtrl', MeetingsListCtrl);

MeetingsListCtrl.$inject = ['$rootScope', '$scope', '$state', '$translate', 'MeetingsApi', '$ionicHistory', '$ionicLoading'];

function MeetingsListCtrl($rootScope, $scope, $state, $translate, MeetingsApi, $ionicHistory, $ionicLoading){
  //console.log('MeetingsListCtrl');

  var vm = this;

  $scope.filterData = 
  {
    filterSelect: 'x',
    filterOpts: [
      {id: '1', name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ]
  };

  $scope.$on('$ionicView.enter', function() {
    console.log("MeetingsListCtrl clearHistory")
    $ionicHistory.clearHistory();
  });



  $ionicLoading.show( 
    {
      templateUrl: 'templates/loading.html',
      delay: 100
    }
    );

  MeetingsApi.get({'limit': 15, 'order_by' : '-date'}).$promise.then(
    function(data) { 
      $scope.meetings = data.objects;
    }, 
    function(data) {
      console.error( 'MeetingsListCtrl: getMeetings failure: ' +JSON.stringify(data));
    }).finally(function() {
      $ionicLoading.hide();
    });

  $scope.openMeeting = function(meeting, name){
    //console.log('MeetingsListCtrl: go to meeting: ' +meeting);
    $state.go('app.meeting', {meetingId:meeting, pageTitle:name});
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    console.log('MeetingsListCtrl: $translateChangeSuccess');
    $scope.doTranslate();
  });

  $scope.doTranslate = function() {
    $translate('SIDEMENU_ITEM_MEETINGS').then(function (data) {
      $scope.navTitle = data;
    });

    $translate('LATEST').then(function (data) {
      $scope.txtLatest = data;
    });
  };

  $scope.doTranslate();
}