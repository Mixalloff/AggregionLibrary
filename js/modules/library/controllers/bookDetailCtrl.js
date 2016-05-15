var libraryApp=angular.module('libraryApp');
libraryApp.controller("bookDetailCtrl",
     function ($scope, $stateParams) {
         // needed localhost:8080#/book_detail/111
        alert($stateParams.book_id);
     }
); 