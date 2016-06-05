angular.module('libraryApp').config(function($httpProvider){
  $httpProvider.interceptors.push('errorHandlerInterceptor');
});

// Обработчик ошибок ответа сервера
angular.module('libraryApp').factory('errorHandlerInterceptor', function($q, $rootScope) {
    return {
        responseError: function (data) {
            switch (data.status) {
                case 400: {
                    $rootScope.$broadcast('httpError', { message: "Bad request to " + data.config.url });
                    break;
                }
                case 404: {
                    $rootScope.$broadcast('httpError', { message: "Resource  doesn't exist" });
                    break;
                }
                case 500: {
                    $rootScope.$broadcast('httpError', { message: "Internal server error by " + data.config.url });
                    break;
                }
                default: {
                    $rootScope.$broadcast('httpError', { message: "Http error" });
                    break;
                }
            }
            return $q.reject(data);
        }
    }
});

