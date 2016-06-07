/**
 * Created by djiao on 5/6/16.
 */

'use strict'
ristoreApp.factory("fmFactory", ['$http',
    function ($http) {
        var service = {};
        
        service.getAll = function () {
            var url = SERVER + "/ristore/foundtion/";
            return $http({
                url: url,
                method: 'GET'
            })
        }

        return service;
    }]);
