"use strict";
var templates = "/../../../templates";

angular.module('libraryApp', ['ngMaterial', 'ui.router', 'ngResource', 'ngCookies'])
.config(['$resourceProvider', function($resourceProvider){
    $resourceProvider.defaults.stripTrailingSlashes = false;
}])
.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
}])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	'use strict';
	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
	});
    
    $stateProvider
        .state('main', {
            resolve: {
                allBooks: function($q, Loader) {
                    return Loader.all();
                }
            },
            url: '/',
            templateUrl: templates + '/library.html',
            controller: 'libraryCtrl'
        })
        .state('bookDetail', {
            url: '/book_detail/{:book_id}',
            templateUrl: templates + '/book_detail.html',
            controller: 'bookDetailCtrl'
        })
        .state('page404', {
            url: '/404_page_not_found',
            templateUrl: templates + '/page404.html'
        });
        $urlRouterProvider.otherwise('/404_page_not_found');
});