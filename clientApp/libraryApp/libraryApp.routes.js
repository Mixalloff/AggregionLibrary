angular.module('libraryApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	'use strict';
	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
	});
    
    $stateProvider
        .state('main', {
            resolve: {
                allBooks: function(Loader) {
                    return Loader.all();
                }
            },
            url: '/',
            templateUrl: 'libraryApp/libraryPage/library.html',
            controller: 'libraryCtrl',
            controllerAs: 'library'
        })
        .state('bookDetail', {
            resolve: {
                bookInfo: function(Loader, $stateParams) {
                    return Loader.bookDetail($stateParams.book_id);
                },
                bookBundles: function(Loader, $stateParams) {
                    return Loader.bookBundles($stateParams.book_id);
                }
            },
            url: '/book_detail/{:book_id}',
            templateUrl: 'libraryApp/detailPage/detail.html',
            controller: 'bookDetailCtrl',
            controllerAs: 'detail'
        })
        .state('page404', {
            url: '/404_page_not_found',
            templateUrl: 'libraryApp/page404/page404.html'
        });
        $urlRouterProvider.otherwise('/404_page_not_found');
});