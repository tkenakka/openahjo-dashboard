'use strict';
angular.module('FileHistory', [
	'app.config'
	])
.factory('FileHistory', function($q, CONF) {
	var replaceInd = 0;
	var files = [];// { url : '', desc : '', type : ''}

	var FileHistory = {
		list : files,
		addFile : add
	};
	return FileHistory;

	function add(aUrl, aDesc, aType) {
		console.log('FileHistory.add: aUrl: ' +aUrl +' aDesc: ' +aDesc +' aType:' +aType); //TODO: remove
		if (!aUrl || !aUrl) {
			console.error('FileHistory.add: bad args aUrl:' +aUrl +' aDesc: ' +aDesc); //TODO: handle via e or promise?
			return;
		}

		var newItem = { url : aUrl, desc : aDesc, type : aType };
		if ( files.length < CONF.fileHistory_MaxCount ) {
			files.push( newItem );
		} else {
			console.log('FileHistory.add: count: ' +files.length +', setting item [' +replaceInd +']=' +newItem.url);//TODO: remove
			files[replaceInd] = newItem;
			replaceInd += 1;
			if (!replaceInd || replaceInd >= CONF.fileHistory_MaxCount) {
				console.log('FileHistory.add:: reset index: ' +replaceInd);//TODO: remove
				replaceInd = 0;
			}
		}
	}
});