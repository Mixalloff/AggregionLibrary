// Сервис загрузки данных
angular.module('libraryApp').factory('Loader', ['commonConstants', 'BooksAPI', '$q', function(commonConstants, BooksAPI, $q) {
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