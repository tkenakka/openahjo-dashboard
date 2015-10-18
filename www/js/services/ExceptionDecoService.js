'use strict';
angular
    .module('app.module')
    .factory('exception', exception);

exception.$inject = ['logger'];

function exception(logger) {
    var service = {
        catcher: catcher
    };
    return service;

    function catcher(message) {
        return function(reason) {
            logger.error(message, reason);
        };
    }
}

/*
angular //TODO: get back to this
    .module('blocks.exception')
    .config(exceptionConfig);

exceptionConfig.$inject = ['$provide'];

function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

extendExceptionHandler.$inject = ['$delegate'];

function extendExceptionHandler($delegate) {
    return function(exception, cause) {
        $delegate(exception, cause);
        var errorData = {
            exception: exception,
            cause: cause
        };
        //toastr.error(exception.msg, errorData);
        console.error("ExceptionDecoService: " +exception.msg +" " +errorData)
    };
}
*/