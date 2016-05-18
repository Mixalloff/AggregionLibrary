var libraryApp=angular.module('libraryApp');

libraryApp.controller("bookDetailCtrl", [ "$scope", "bookInfo",
     function ($scope, bookInfo) {
        $scope.bookInfo = bookInfo;
     }
]); 