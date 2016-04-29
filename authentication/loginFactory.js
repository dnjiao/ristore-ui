app.factory("loginFactory", function ($http) {
	return{
		login: function(username, password) {
			var data = "username="+username+"&password="+password+"&submit=Login";
			return $http({
	            method: 'POST',
	            url: 'http://localhost:8080/login',
	            data: data,
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded',
              	}
        	});  
		}
	}	
});