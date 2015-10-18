'use strict';
angular.module('MeetingCtrl', [
  'MtgAgendasCache'
  ])
.controller('MeetingCtrl', MeetingCtrl);

MeetingCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$translate', 'MtgAgendasCache', '$ionicLoading'];

function MeetingCtrl($rootScope, $scope, $stateParams, $state, $translate, MtgAgendasCache, $ionicLoading) {

  //console.log('MeetingCtrl: id: ' +$stateParams.meetingId);
  $scope.cardTitle = $stateParams.pageTitle;
  $scope.meetingId = $stateParams.meetingId;

  if (!$stateParams.meetingId) {
    console.error('MeetingCtrl: bad meeting id (' +$scope.meetingId +') , go to meetings lists');
    $state.go('app.meetings');
    return;
  }

  $ionicLoading.show( 
    {
      templateUrl: 'templates/loading.html',
      delay: 100
    }
    );

  MtgAgendasCache.fetchMeeting($scope.meetingId).then(
    function(data) {
      $scope.items = data;
    }, 
    function(data) {
      console.error( 'MeetingCtrl: fetchMeeting failure: ' +JSON.stringify(data));
    }
  ).finally(function() {
    $ionicLoading.hide();
  });   

  $scope.openIssue = function(issue){
    //console.log('MeetingCtrl: openIssue: ' +issue.id);
    $state.go('app.issue', {issueId:issue.id, meetingId:issue.meeting.id});
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    console.log('MeetingCtrl: $translateChangeSuccess');
    $scope.doTranslate();
  });

  $scope.doTranslate = function() {
    $translate('ISSUES').then(function (data) {
      $scope.navTitle = data;
    });
  };
  
  $scope.doTranslate();
}