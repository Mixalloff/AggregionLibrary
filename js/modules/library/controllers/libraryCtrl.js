var libraryApp=angular.module('libraryApp');

// Ресурсы для API
libraryApp.factory('BooksAPI', ['$resource', 'commonConstants', function($resource, commonConstants) {
    return {
		all: function() {
			return $resource(commonConstants.serverAPI + '/public/catalog',
                {},
                {
                    get: { method:'GET', isArray:true }
                }
            );
		},
        detail: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:book_id',
                { book_id: id },
                {
                    get: { method:'GET', isArray:false }
                }
            );
        },
        bundles: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:book_id/bundles',
                { book_id: id },
                {
                    get: { method:'GET', isArray:true }
                }
            );
        }
	}
}]);

// Сервис загрузки данных
libraryApp.factory('Loader', ['commonConstants', 'BooksAPI', '$q', function(commonConstants, BooksAPI, $q) {
    return {
		all: function() {
            return BooksAPI.all().get()
                .$promise.then(function(books) {
                    return books;
                },
                function(response) {
                    throw new Error(response); 
                });
		},
        bookDetail: function(book_id) {
            return BooksAPI.detail(book_id).get()
                .$promise.then(function(bookInfo) {
                    return bookInfo;
                },
                function(response) {
                    throw new Error(response);
                });
		},
        bookBundles: function(book_id) {
            return BooksAPI.bundles(book_id).get()
                .$promise.then(function(bundles) {
                    return bundles;
                },
                function(response) {
                    throw new Error(response);
                });
		},
        loadResourceString: function(resourceId) {
            return "https://storage.aggregion.com/api/files/" + resourceId + "/shared/data";
        }
	}
}]);

// Контроллер библиотеки
libraryApp.controller('libraryCtrl', ['$resource', 'allBooks',
    function($resource, allBooks) {   
        var vm = this;     
        vm.books = allBooks;
}]);

// Директива для фото книги
libraryApp.directive('coverImg', ['commonConstants', 'Loader', function(commonConstants, Loader) {
    return {
        restrict: 'E',
        template: '<img/>',
        replace: true,
        link: function($scope, element, attrs) {
            attrs.$observe('coverId', function(value) {
                attrs.$set('src', Loader.loadResourceString(value));
            });
            attrs.$set('class', attrs.class);
            attrs.$observe('coverTitle', function(value) {
                attrs.$set('title', value);   
            });
            element.bind('error', function() {
                attrs.$set('src', commonConstants.defaultImage);
            });
        }
    }
}]);

// Константы
libraryApp.constant('commonConstants', 
{
    defaultImage: "https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data",
    serverAPI: "https://ds.aggregion.com/api"
});