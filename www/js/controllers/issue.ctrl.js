'use strict';
angular.module('IssueCtrl', [
  'MtgAgendasCache',
  'ngSanitize',
  'FileHistory'
  ])
.controller('IssueCtrl', IssueCtrl);

IssueCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', 'MtgAgendasCache', '$translate', 'FileHistory'];

function IssueCtrl($rootScope, $scope, $state, $stateParams, $ionicHistory, MtgAgendasCache, $translate, FileHistory) {

  $scope.collapse = false;
  $scope.loading = true;
  $scope.issueId = $stateParams.issueId;
  $scope.meetingId = $stateParams.meetingId;

  //console.log('IssueCtrl: issue ' +$scope.issueId +' meeting ' +$scope.meetingId)

  MtgAgendasCache.fetchIssue($scope.meetingId, $scope.issueId).then(
    function(data) {
      $scope.issue = data.content;
      $scope.txtCardTitle = data.subject;
      $scope.attachments = data.attachments;
    }, 
    function(data) {
      console.error('IssueCtrl: ' +JSON.stringify(data));
    }
  ).finally(function() {
    $scope.loading = false;
  });

/////TODO :   JSON OBJEKTOIEN PARSIMINEN YHTEEN PAIKKAAN? NYT HAJALLAAN MITÄ PROPSEJA MISSÄKIN OBJEKTISSA
  //$scope.issue = $scope.issueObj.content;//TODO: pitääkö trustAsHtml läpi ajaa? Tarkasta
  //$scope.issueTitle = ahjoapi.getIssue().subject;
/*
  $scope.goBack = function(meetingId) {//TODO: tarviiko?
    console.log('IssueCtrl::goBack currentTitle:' +$ionicHistory.currentTitle());
    $ionicHistory.goBack()
  }
  */
  $scope.openMeeting = function(meeting, name){
    //console.log('IssueCtrl: go to meeting: ' +meeting)
    $state.go('app.meeting', {meetingId:meeting, pageTitle:name});
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    console.log('IssueCtrl: $translateChangeSuccess');
    $scope.doTranslate();
  });

  $scope.doTranslate = function() {
    $translate('ISSUE').then(function (data) {
      $scope.navTitle = data;
    });
    $translate('ATTACHMENTS').then(function (data) {
      $scope.txtAttachments = data;
    });
    $translate('DECISION').then(function (data) {
      $scope.txtDecision = data;
    });
    $translate('DOCNOTPUBLIC').then(function (data) {
      $scope.txtDocNotPublic = data;
    });
  };

  $scope.toggleDecision = function() {
      console.log("toggleDecision: " +$scope.showDecision);
      $scope.showDecision = !$scope.showDecision;
  };

  $scope.toggleAttachments = function() {
    console.log("toggleAttachments: " +$scope.showAttachments);
    $scope.showAttachments = !$scope.showAttachments;
  };

  $scope.openDoc = function(docUri, docDesc, docType) {
    console.log("IssueCtrl.openDoc: " +docUri);
    if (!docUri) {
      console.error("IssueCtrl.openDoc: Bad uri: " +docUri);
      return;
    };
    FileHistory.addFile(docUri, docDesc, docType);
    window.open(docUri, /*'_system'*/'_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
  }

  $scope.doTranslate();
}
