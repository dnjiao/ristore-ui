/**
 * Created by djiao on 5/6/16.
 */

'use strict'
ristoreApp.factory("fmFactory", ['$http', '$window',
    function ($http, $window) {
        var service = {};
        
        service.getAll = function () {
            console.log("Ajax call");
            var url = SERVER + "/ristore/foundation/";
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true
            })
        }

        return service;
    }]);
