'use strict';
angular.module('AhjoApi', [])
.factory('AhjoApi', function($q,$http) {
  
  var AhjoApi = {
    getAgendaItems : getAgendaItems
  };
  return AhjoApi;

  /* Fetch issues for one meeting */
  function getAgendaItems(meetingId) {
    if (!meetingId) {
      var deferred = $q.defer();
      //var obj = { data : { status: errMsgBadArg }}; TODO: remove/fix
      deferred.reject('AhjoApi.getAgendaItems bad argument: ' +meetingId);
      return deferred.promise;
    }
    var req = 'http://dev.hel.fi/paatokset/v1/agenda_item/?meeting='+meetingId+'&order_by=index';
    console.log('GET: ' +req);
    return $http.get(req);
  }
});
