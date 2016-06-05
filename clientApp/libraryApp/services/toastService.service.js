// Сервис вывода сообщений через Toast
angular.module('libraryApp').factory('toastService', ['$mdToast',
function($mdToast) {
    return {
        show: show
    }
    function show(type, message) {
        $mdToast.show({
            template: '<md-toast class="md-toast ' + type +'">' +
                        '<div class="md-toast-content">' + message + '</div>' + 
                      '</md-toast>',
            hideDelay: 3000,
            position: 'bottom right',
        });
    }
}]);