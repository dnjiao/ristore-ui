var app = angular.module('loginApp', [])

app.controller('LoginCtrl', ['$scope', 'loginFactory', function($scope, loginFactory){
	$scope.authenticate = function() {
		loginFactory.login($scope.username, $scope.password)
		.then(function(response) {
			$location.path('/home');
		}, function errorCallBack(response) {
			console.log(response.$statusText);
		});
	}
	
}]);