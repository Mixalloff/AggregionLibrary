var libraryApp=angular.module('libraryApp');

// Ресурсы для API
libraryApp.factory('Books', ['$resource', 'commonConstants', function($resource, commonConstants) {
    return {
		all: function() {
			return $resource(commonConstants.serverAPI + '/public/catalog', {});
		},
        detail: function (id) {
            return $resource(commonConstants.serverAPI + '/public/catalog/:bookId', { bookId: id });
        }
	}
}]);

// Контроллер библиотеки
libraryApp.controller('libraryCtrl', ['$scope', '$resource', 'Books',
    function($scope, $resource, Books) {
        //var Books = $resource(serverAPI + '/public/catalog', {});
        Books.all().query({method:'GET', isArray:true})
            .$promise.then(function(books) {
                $scope.books = books;
            });
        
        $scope.bookCover = function(coverId) {
            return "https://storage.aggregion.com/api/files/" + coverId + "/shared/data";
        };
}]);

// Директива для установки изображения по умолчанию
libraryApp.directive('defaultSrc', ['commonConstants', function(commonConstants) {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        attrs.$set('src', commonConstants.defaultImage);
      });
    }
  }
}]);

// Отношение высоты и ширины
// libraryApp.directive('ratioCell', ['commonConstants', function(commonConstants) {
//   return {
//     link: function(scope, element, attrs) {
//       element.bind('load', function() {
//         console.log(element);
//         element.parent(".cell").css( "background", "yellow" );
//       });
//     }
//   }
// }]);

// Константы
libraryApp.constant('commonConstants', 
{
    defaultImage: "https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data",
    serverAPI: "https://ds.aggregion.com/api"
});