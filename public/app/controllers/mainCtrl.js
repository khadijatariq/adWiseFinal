angular.module('mainControllers', ['authServices','stuServices'])

.controller('mainCtrl', function ($rootScope, $scope, $location, $timeout, Auth, Student) {
	var app = this;
	app.loadMe = false;

	$scope.isActive = function(route) {
        return route === $location.path();
    }
	
	$rootScope.$on('$routeChangeStart', function() {
		if ($location.path() == '/login') {
			app.login = false;
			app.signup = true;
		} else if ($location.path() == '/signup-as-instructor') {
			app.signup = false;
			app.login = true;
		} else if ($location.path() == '/signup-as-student') {
			app.signup = false;
			app.login = true;
		} else {
			app.login = true;
			app.signup = true;
		}
		if (Auth.isLoggedIn()){
			Auth.getUser().then( function (data) {
				app.loggedIn = true;
				app.email = data.data.email;
				app.fname = data.data.fname;
				app.lname = data.data.lname;
				app.state = data.data.state;
				if (app.state == "student") {
					app.student = true;
					app.instructor = false;
					if ($location.path() == '/sdashboard') {
						Student.getCourses({email: app.email}).then(function(c) {
							c1 = c.data.allCourses;
							for (var i = 0; i < c1[1].length; i++){
								c1[1][i].grade = '-';
							}
							console.log(c1);
							if (c1[1].length >= 5){
								app.courses = c1[1].slice(0,6);
							} else {
								app.courses = c1[1].concat(c1[0].slice(c1[0].length-6+c1[1].length,c1[0].length));
							}
						});
					} else if ($location.path() == '/sahistory') {
						Student.getCourses({email: app.email}).then(function(c) {
							c1 = c.data.allCourses;
							c1 = Student.sortCourses(c1[0]);
							app.courses = c1;
						});
					}
				} else {
					app.student = false;
					app.instructor = true;
				}
			})
		} else {
			app.loggedIn = false;
			app.student = false;
			app.instructor = false;
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