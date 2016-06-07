/**
 * Created by djiao on 5/10/16.
 */

ristoreApp.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.localStorage.getItem("access_token")) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem("access_token");
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});
