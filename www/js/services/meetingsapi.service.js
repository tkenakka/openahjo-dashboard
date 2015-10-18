 // TODO: parsi vastauksesta pelkkä objekti?
'use strict';
angular.module('MeetingsApi', [
	'ngResource'
	])
.factory('MeetingsApi', function($resource) {
  return $resource('http://dev.hel.fi/paatokset/v1/meeting/:mtg');
});

