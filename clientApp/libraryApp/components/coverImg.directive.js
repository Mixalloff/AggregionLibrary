// Директива для фото обложки книги
angular.module('libraryApp').directive('coverImg', ['commonConstants', 'Loader',
    function(commonConstants, Loader) {
        return {
            restrict: 'E',
            template: '<img/>',
            replace: true,
            link: function($scope, element, attrs) {
                attrs.$observe('coverId', function(value) {
                    attrs.$set('src', Loader.loadResourceString(value));
                });
                attrs.$set('class', attrs.class);
                attrs.$observe('coverTitle', function(value) {
                    attrs.$set('title', value);   
                });
                element.bind('error', function() {
                    attrs.$set('src', commonConstants.defaultImage);
                });
            }
        }
    }
]);