var ristoreApp = angular.module('ristoreApp', ['ngRoute', 'ngCookies', 'ngTable']);

//var SERVER = 'http://localhost:8080/ristoreService';
var SERVER = 'http://rcdrljboss01a:9880/ristoreService'
var LOGIN_URL = SERVER+"/oauth/token";

ristoreApp
.config(
	function ($httpProvider, $routeProvider) {

		$httpProvider.interceptors.push('authInterceptor');

		$routeProvider
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'loginCtrl'
			})
			.when('/home', {
				templateUrl: 'views/home.html',
			})
			.when('/foundation', {
				templateUrl: 'views/domains/foundation.html',
				controller: 'fmCtrl',

			})
			.when('/', {
				redirectTo: '/login'
			});

	//	$locationProvider.html5Mode(true);
	},
	function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
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
	        if ($location.path() !== '/login' && $location.path() !== '/home' && !$rootScope.globals.currentUser && $rootScope.authenticated === false) {
	            $location.path('/login');
	        }

	    });
	}
]);
