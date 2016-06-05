// Сервис загрузки данных
angular.module('libraryApp').factory('Loader', ['commonConstants', 'BooksAPI', '$q', function(commonConstants, BooksAPI, $q) {
    return {
		all: function() {
            return BooksAPI.all().get()
                .$promise.then(function(books) {
                    return books;
                });
		},
        bookDetail: function(book_id) {
            return BooksAPI.detail(book_id).get()
                .$promise.then(function(bookInfo) {
                    return bookInfo;
                });
		},
        bookBundles: function(book_id) {
            return BooksAPI.bundles(book_id).get()
                .$promise.then(function(bundles) {
                    return bundles;
                });
		},
        // Составление строки для загрузки ресурса по resourceId
        loadResourceString: function(resourceId) {
            return "https://storage.aggregion.com/api/files/" + resourceId + "/shared/data";
        },
        // Составление строки для загрузки cover изображения через сервер с обработкой 404 ошибки
        constructCoverRequest: function(resourceId) {
            return 'http://localhost:8080/image/' + resourceId;
        }
	}
}]);