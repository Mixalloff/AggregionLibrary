var libraryApp=angular.module('libraryApp');

libraryApp.controller("bookDetailCtrl", ["bookInfo", "bookBundles", "Loader",
     function (bookInfo, bookBundles, Loader) {
        var vm = this;
        vm.bookInfo = bookInfo;
        vm.bundles = bookBundles;
        
        vm.constructResourceString = function (resourceId) {
            return Loader.loadResourceString(resourceId);
        }
     }
]); 