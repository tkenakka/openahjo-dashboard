'use strict';
angular.module('MtgAgendasCache', [
	'AhjoApi',
	'app.config'
	])
.factory('MtgAgendasCache', function($q, CONF, AhjoApi) {
	var replaceInd = 0;
	var agendas = [];

	var MtgAgendasCache = {
		list : agendas,
		fetchIssue : fetchIssue,
		fetchMeeting : fetchMeeting
	};
	return MtgAgendasCache;

	/* Get a meeting, fetch from network if not in cache. */
	function fetchIssue(meetingId, issueId) {
		console.log('MtgAgendasCache.fetchIssue: meetingId: ' +meetingId +' issueId: ' +issueId); //TODO: remove
		var dfd = $q.defer();
		fetchMeeting(meetingId)
		.then( function(data) {
			var found = null;

			data.some(function(i) {
				//console.log('MtgAgendasCache.fetchIssue:  ' +i.id)
				if (i.id == issueId) {
		        	found = i;
		        	return true;
		      	}
		      	return false;
		      });

			if (found) {
				dfd.resolve(found);
			} else {
				dfd.reject('Meeting ' +meetingId +' issue ' +issueId +' not available!');
			}
		},function(data) {
			dfd.reject(data); // fetchMeeting failed, no matching meetingId
		});

		return dfd.promise;
	}

	/* Get a meeting, fetch from network if not in cache. */
	function fetchMeeting(meetingId) {
		var dfd = $q.defer();
		var cachedMeeting = findCachedMeetings(meetingId);
		if (!cachedMeeting) {
		    AhjoApi.getAgendaItems(meetingId)
		    .then(function(data) {
				cachedMeeting = data.data.objects;
				addMeeting( meetingId, cachedMeeting);
				dfd.resolve(cachedMeeting);
		    }, 
		    function(data) {
		    	dfd.reject(data);
		    }
		    );
		} else {
			dfd.resolve(cachedMeeting); // Meeting foudn from cache
		}
	  return dfd.promise;
	}

	/* Add a meeting into the in-memory cache */
	function addMeeting(meetingId, agendaItems){
		if (!meetingId || !agendaItems) {
			console.error('MtgAgendasCache: bad args: ' +meetingId +', ' +agendaItems); //TODO: handle via e or promise?
			return;
		}

		var newMtg = { mtgId:meetingId, items:agendaItems };
	    if (agendas.length < CONF.meetingCache_MaxCount) {
	     	console.log('MtgAgendasCache.addMeeting: count: ' +agendas.length +', pushing meeting ' +newMtg.mtgId); //TODO: remove
	     	agendas.push( newMtg );
	    } else {
			console.log('MtgAgendasCache.addMeeting: count: ' +agendas.length +', setting meeting [' +replaceInd +']=' +newMtg.mtgId);//TODO: remove
			agendas[replaceInd] = newMtg;
			replaceInd += 1;
			if (!replaceInd || replaceInd >= CONF.meetingCache_MaxCount) {
				console.log('MtgAgendasCache.addMeeting: reset index: ' +replaceInd);//TODO: remove
				replaceInd = 0;
			}
		}
	}

	/* Find a meeting from cache. Returns null ln cache miss */
	function findCachedMeetings(meetingId) {
		var res = null;
    	agendas.some(function(i) {
  			//console.log('MtgAgendasCache.findCachedMeetings: checking ' +i.mtgId)
    		if (i.mtgId == meetingId) {
    			console.log('MtgAgendasCache.findCachedMeetings: cache hit ' +meetingId); //TODO: remove
	 		    res = i.items;
	 		    return true;
    		}
    		return false;
    	});
    	return res;
	}
});