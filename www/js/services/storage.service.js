'use strict';
angular.module('StorageService', [])
.service('StorageService', function () {

    var KEY_LANGUAGE = 'language';
    var KEYARR = [KEY_LANGUAGE]; /* Add all new keys to this convenience array */
    var StorageService = {
        clearAll : clearAll,
        setLanguage : setLanguage,
        getLanguage : getLanguage
    };
    return StorageService;
    
    function setLanguage(value) {
        console.log('StorageService.setLanguage: ' +value);
        window.localStorage.setItem(KEY_LANGUAGE, value);
    }

    function getLanguage() {
        return window.localStorage.getItem(KEY_LANGUAGE);
    }

    function clearAll() {
        KEYARR.forEach( function(i) {
            console.log('StorageService.clearAll: clear key: ' +i);
            window.localStorage.removeItem(i);
        });
    }

});