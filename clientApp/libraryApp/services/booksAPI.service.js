// Ресурсы для API
angular.module('libraryApp').factory('BooksAPI', ['$resource', 'commonConstants', 
    function($resource, commonConstants) {
        return {
            all: function() {
                return $resource(commonConstants.serverAPI + '/public/catalog',
                    {},
                    {
                        get: { method:'GET', isArray:true },
                        interceptors: ['errorHandlerInterceptor']
                    }
                );
            },
            detail: function (id) {
                return $resource(commonConstants.serverAPI + '/public/catalog/:book_id',
                    { book_id: id },
                    {
                        get: { method:'GET', isArray:false },
                        interceptors: ['errorHandlerInterceptor']
                    }
                );
            },
            bundles: function (id) {
                return $resource(commonConstants.serverAPI + '/public/catalog/:book_id/bundles',
                    { book_id: id },
                    {
                        get: { method:'GET', isArray:true },
                        interceptors: ['errorHandlerInterceptor']
                    }
                );
            }
        }
    }
]);