"use strict";
angular.module('libraryApp', ['ngMaterial', 'ui.router', 'ngResource', 'ngCookies'])
    .run(['$http', '$cookies', '$rootScope', 'toastService', function($http, $cookies, $rootScope, toastService) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
        $rootScope.$on( 'httpError', function( event, eventData ) {
            toastService.show('error', eventData.message );
        });
    }
]);