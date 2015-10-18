'use strict';
angular.module('PdfViewCtrl', [
  'pdf'
  ])
.controller('PdfViewCtrl', PdfViewCtrl);

PdfViewCtrl.$inject = ['$rootScope', '$scope'];

function PdfViewCtrl($rootScope, $scope) {
  console.log('PdfViewCtrl ');

  $scope.pdfUrl = 'http://dev.hel.fi/paatokset/media/att/12/12afbf6863d60abf5367ad7194fcd3684873e802.pdf';

}
