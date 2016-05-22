// Контроллер библиотеки
angular.module('libraryApp').controller('libraryCtrl', ['$resource', 'allBooks',
    function($resource, allBooks) {   
        var vm = this;     
        vm.books = allBooks;        
}]);



