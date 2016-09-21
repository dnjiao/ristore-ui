/**
 * Created by djiao on 5/6/16.
 */

'use strict'
ristoreApp.factory("fmFactory", ['$http', '$window',
    function ($http, $window) {
        var service = {};
        
        service.getAll = function () {
            var url = SERVER + "/ristore/foundation/";
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true
            })
        }

        service.getByMrn = function (mrn) {
            var url = SERVER + "/ristore/foundation/mrn/" + mrn;
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true
            })
        }

        service.getByReportId = function (reportid) {
            var url = SERVER + "/ristore/foundation/reportid/" + reportid;
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true
            })
        }

        service.getXMLFile = function (filename) {
            var url = SERVER + "/ristore/foundation/xml/" + filename;
            return $http({
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem("access_token")},
                url: url,
                method: 'GET',
                crossOrigin: true,
                responseType: 'arraybuffer'
            })
        }

        return service;
    }]);
