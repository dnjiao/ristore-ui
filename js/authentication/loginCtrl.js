
ristoreApp.controller("loginCtrl",
	['$rootScope', '$scope', '$location', '$window', 'loginFactory',
	function($rootScope, $scope, $location, $window, loginFactory){
		(function initController() {
			// reset login status
			loginFactory.clearCredentials();
		})();
		$rootScope.authenticated = false;
		$scope.login_error = false;
		$scope.authenticate = function() {
			loginFactory.login($scope.username, $scope.password, function(response) {
				if (response.status == 200) {
					var data = response.data;
					if (data.access_token != null && data.access_token) {
						$window.localStorage.setItem('access_token', data.access_token);
					}
					$rootScope.authenticated = true;
					$location.path('/home');
				} else {
					$window.localStorage.removeItem("access_token");
					$rootScope.authenticated = false;
					$scope.login_error = 'Invalid credentials!';
					$location.path('/login');
				}
			});
		}
	}]);