'use strict';
angular.module('MenuCtrl', [
  'StorageService',
  'FileHistory'
  ])
.controller('MenuCtrl', MenuCtrl);

MenuCtrl.$inject = ['$scope', '$translate', '$rootScope', 'StorageService', 'FileHistory'];

function MenuCtrl($scope, $translate, $rootScope, StorageService, FileHistory) {
  console.log('MenuCtrl');

  $scope.fileHistory = FileHistory.list;

  $scope.switchLanguage = function (value) {
    console.log('MenuCtrl.switchLanguage: ' +value);
    StorageService.setLanguage(value);
    $translate.use(value);
  };

// TODO: combine openDoc functions
  $scope.openDoc = function(docUri) {
    console.log("IssueCtrl.openDoc: " +docUri);
    if (!docUri) {
      console.error("IssueCtrl.openDoc: Bad uri: " +docUri);
      return;
    };
    //FileHistory.add(docUri, docUri); //TODO: resolve some desc
    window.open(docUri, /*'_system'*/'_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
  }
}
