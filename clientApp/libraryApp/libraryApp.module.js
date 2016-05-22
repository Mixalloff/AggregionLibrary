"use strict";
angular.module('libraryApp', ['ngMaterial', 'ui.router', 'ngResource', 'ngCookies'])
    .run(['$http', '$cookies', function($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
    }
]);
