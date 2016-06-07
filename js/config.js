var ristoreApp = angular.module('ristoreApp', ['ngRoute', 'ngCookies']);

var SERVER = 'http://localhost:8080';
var LOGIN_URL = SERVER+"/login";

ristoreApp
.config(function ($httpProvider, $routeProvider) {

	$httpProvider.interceptors.push('authInterceptor');

  	$routeProvider
	    .when('/login', { 
	    	templateUrl: 'views/login.html', 
	    	controller: 'loginCtrl' 
	    })
	    .when('/home', { 
	    	templateUrl: 'views/home.html',
			requireLogin: false
	    })
		.when('/foundation', {
			templateUrl: 'views/domains/foundation.html',
			controller: 'fmCtrl',
			requireLogin: true

		})
	    .when('/', {
	    	redirectTo: '/login'
	    });

//	$locationProvider.html5Mode(true);
})

.run(['$rootScope', '$location', '$cookieStore', '$http',
	function ($rootScope, $location, $cookieStore, $http) {
	    // keep user logged in after page refresh
	    $rootScope.globals = $cookieStore.get('globals') || {};
	    // if ($rootScope.globals.currentUser) {
	    //     $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
	    // }

	    $rootScope.$on('$locationChangeStart', function (event, next, current) {
	        // redirect to login page if not logged in
	        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
	            $location.path('/login');
	        }

	    });
	}
]);
