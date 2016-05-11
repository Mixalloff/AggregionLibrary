var libraryApp=angular.module('libraryApp');
libraryApp.controller("appCtrl",
     function ($scope, $mdSidenav) {
         $scope.toogleNav= function(navID) {
             $mdSidenav(navID).toggle();
         }
         $scope.isOpen = function(navID){
            return $mdSidenav(navID).isOpen();
         };
     }
); 