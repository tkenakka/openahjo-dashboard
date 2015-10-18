//'use strict';
var app = angular.module('PdfView2Ctrl', [ 'ngPDFViewer' ]);

app.controller('PdfView2Ctrl', [ '$scope', 'PDFViewerService', function($scope, pdf) {
  console.log('PdfView2Ctrl ');

  $scope.pdfUrl = 'http://dev.hel.fi/paatokset/media/att/12/12afbf6863d60abf5367ad7194fcd3684873e802.pdf';

  $scope.viewer = pdf.Instance("viewer");

    $scope.nextPage = function() {
        $scope.viewer.nextPage();
    };

    $scope.prevPage = function() {
        $scope.viewer.prevPage();
    };

    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };
	}
]);
