/**
 * Created by djiao on 5/6/16.
 */

'use strict'
ristoreApp.factory("fmFactory", ['$http', '$window',
    function ($http, $window) {
        var service = {};
        
        service.getAll = function (page, count, orderBy, direction) {
            var url = SERVER + "/ristore/foundation?page=" + page + "&size=" + count +"&sort=" + orderBy + "," + direction;
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true
            })
        }

        return service;
    }]);
