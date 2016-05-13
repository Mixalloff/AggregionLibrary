"use strict";
var templates = "/../../../templates";

angular.module('libraryApp', ['ngMaterial', 'ngRoute', 'ngResource', 'ngCookies'])
.config(['$resourceProvider', function($resourceProvider){
    $resourceProvider.defaults.stripTrailingSlashes = false;
}])
.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
}])
.config(function ($routeProvider, $locationProvider) {
	'use strict';
	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
	});

	$routeProvider.when('/', {
        redirectTo: '/main'
    })
    .when('/main', { 
        templateUrl: templates + '/library.html',
        controller: 'libraryCtrl'
    })
    .when('/book_detail/:book_id', { 
        templateUrl: templates + '/book_detail.html',
        controller: 'bookDetailCtrl'
    })
    .when('/404_page_not_found', { 
        templateUrl: templates + '/page404.html',
        controller: 'pageNotFoundCtrl'
    })
    // .when('/albums', { 
    //     templateUrl: templates + '/albums.html',
    //     controller: 'albumsController'
    // })
    // .when('/album/:album_id', { 
    //     templateUrl: '/templates/photos.html',
    //     controller: 'photosController'
    // })
    .otherwise({
        redirectTo: '/404_page_not_found'
    });
});