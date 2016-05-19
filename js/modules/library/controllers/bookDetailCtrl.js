var libraryApp=angular.module('libraryApp');

libraryApp.controller("bookDetailCtrl", [ "$scope", "bookInfo", "bookBundles",
     function ($scope, bookInfo, bookBundles) {
        $scope.bookInfo = bookInfo;
        $scope.bundles = bookBundles;
     }
]); 