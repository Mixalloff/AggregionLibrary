var libraryApp=angular.module('libraryApp');

libraryApp.controller("bookDetailCtrl", [ "$scope", "$stateParams", "Books",
     function ($scope, $stateParams, Books) {
         // needed localhost:8080#/book_detail/111
        // $stateParams.book_id;
       // console.log($stateParams);
        Books.detail($stateParams.book_id).get({method:'GET'})
            .$promise.then(function(info) {
                $scope.bookInfo = info;
                console.log(info);
            });
        
     }
]); 