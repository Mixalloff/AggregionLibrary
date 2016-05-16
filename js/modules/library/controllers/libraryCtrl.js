var libraryApp=angular.module('libraryApp');

// Ресурсы для API
libraryApp.factory('Books', ['$resource', 'commonConstants', function($resource, commonConstants) {
    return {
		all: function() {
			return $resource(commonConstants.serverAPI + '/public/catalog', {});
		},
        detail: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:book_id', { book_id: id });
        }
	}
}]);

// Контроллер библиотеки
libraryApp.controller('libraryCtrl', ['$scope', '$resource', 'Books',
    function($scope, $resource, Books) {
        Books.all().query({method:'GET', isArray:true})
            .$promise.then(function(books) {
                $scope.books = books;
            });
}]);

libraryApp.directive('coverImg', ['commonConstants', function(commonConstants) {
    return {
        restrict: 'E',
        template: '<img/>',
        replace: true,

        link: function($scope, element, attrs) {
            attrs.$observe('coverId', function(value) {
                attrs.$set('src', "https://storage.aggregion.com/api/files/" + value + "/shared/data");
            });
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