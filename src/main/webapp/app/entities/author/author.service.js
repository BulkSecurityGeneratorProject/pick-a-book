(function() {
    'use strict';
    angular
        .module('pickabookApp')
        .factory('Author', Author);

    Author.$inject = ['$resource'];

    function Author ($resource) {
        var resourceUrl =  'api/authors/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);

                        // Inject methods to DTOs
                        angular.extend(data, {
                            getFullName : function() { return this.firstName + " " + this.lastName; }
                        });
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
