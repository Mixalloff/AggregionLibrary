var libraryApp=angular.module('libraryApp');

libraryApp.controller("bookDetailCtrl", [ "$scope", "bookInfo", "bookBundles", "commonConstants",
     function ($scope, bookInfo, bookBundles, commonConstants) {
        $scope.bookInfo = bookInfo;
        $scope.bundles = bookBundles;
        
        $scope.constructResourceString = function (resourceId) {
            return commonConstants.loadResourceString(resourceId);
        }
     }
]); 