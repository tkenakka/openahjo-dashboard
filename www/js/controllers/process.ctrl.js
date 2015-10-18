'use strict';
angular.module('ProcessCtrl', [])
.controller('ProcessCtrl', ProcessCtrl);

ProcessCtrl.$inject = ['$rootScope', '$scope', '$translate'];

function ProcessCtrl($rootScope, $scope, $translate) {
  //console.log('decisionCtrl ');

  $rootScope.$on('$translateChangeSuccess', function () {
    console.log('ProcessCtrl.$translateChangeSuccess');
    $scope.doTranslate();
  });

  $scope.doTranslate = function() {
    $translate('SIDEMENU_ITEM_DECISIONPROCESS').then(function (data) {
      $scope.navTitle = data;
    });
  };

  $scope.openDoc = function(docUri) {
      console.log("ProcessCtrl.openDoc: " +docUri);
      if (!docUri) {
        console.error("ProcessCtrl.openDoc: Bad uri: " +docUri);
        return;
      };
      window.open(docUri, /*'_system'*/'_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
    }

  $scope.doTranslate();
}
