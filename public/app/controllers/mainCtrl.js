angular.module('mainControllers', ['authServices'])

.controller('mainCtrl', function ($rootScope, $location, $timeout, Auth) {
	var app = this;
	app.loadMe = false;
	
	$rootScope.$on('$routeChangeStart', function() {
		if (Auth.isLoggedIn()){
			Auth.getUser().then( function (data) {
				app.loggedIn = true;
				app.email = data.data.email;
				app.fname = data.data.fname;
				app.lname = data.data.lname;
				app.state = data.data.state;
			})
		} else {
			app.loggedIn = false;
		}
		app.loadMe = true;
	});

	app.doLogin = function(loginData) {
		app.errorMsg = false;
		Auth.login(app.loginData).then(function(data) {
			if (data.data.success) {
				app.successMsg = data.data.message + " Redirecting...";
				$timeout(function() {
					Auth.getUser().then( function (data) {
						if (data.data.state == 'student'){
							$location.path("/sdashboard");
						} else if (data.data.state == 'instructor'){
							$location.path("/idashboard");
						}
					});
					app.loginData = '';
					app.successMsg = false;
				}, 1000);
			} else {
				app.errorMsg = data.data.message;
			}
		});
	};

	app.logout = function() {
		Auth.logout();
		$location.path("/");
	};
});