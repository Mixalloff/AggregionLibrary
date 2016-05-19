var libraryApp=angular.module('libraryApp');

// Ресурсы для API
libraryApp.factory('Books', ['$resource', 'commonConstants', function($resource, commonConstants) {
    return {
		all: function() {
			return $resource(commonConstants.serverAPI + '/public/catalog', {});
		},
        detail: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:book_id', { book_id: id });
        },
        bundles: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:book_id/bundles', { book_id: id });
        }
	}
}]);

// Сервис загрузки данных
libraryApp.factory('Loader', ['commonConstants', 'Books', '$q', function(commonConstants, Books, $q) {
    return {
		all: function() {
            var deferred = $q.defer();
            Books.all().query({method:'GET', isArray:true})
                .$promise.then(function(books) {
                    deferred.resolve(books);
                });
            return deferred.promise;
		},
        bookDetail: function(book_id) {
            var deferred = $q.defer();
            Books.detail(book_id).get({method:'GET'})
                .$promise.then(function(bookInfo) {
                    deferred.resolve(bookInfo);
                });
            return deferred.promise;
		},
        bookBundles: function(book_id) {
            var deferred = $q.defer();
            Books.bundles(book_id).query({method:'GET', isArray:true})
                .$promise.then(function(bundles) {
                    deferred.resolve(bundles);
                });
            return deferred.promise;
		}
	}
}]);

// Контроллер библиотеки
libraryApp.controller('libraryCtrl', ['$scope', '$resource', 'Books', 'allBooks',
    function($scope, $resource, Books, allBooks) {        
        $scope.books = allBooks;
}]);

// Директива для фото альбома
libraryApp.directive('coverImg', ['commonConstants', function(commonConstants) {
    return {
        restrict: 'E',
        template: '<img/>',
        replace: true,
        link: function($scope, element, attrs) {
            attrs.$observe('coverId', function(value) {
               attrs.$set('src', commonConstants.loadResourceString(value));
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
    serverAPI: "https://ds.aggregion.com/api",
    loadResourceString: function(resourceId) {
        return "https://storage.aggregion.com/api/files/" + resourceId + "/shared/data";
    }
});