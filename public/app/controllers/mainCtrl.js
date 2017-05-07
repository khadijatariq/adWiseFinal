angular.module('mainControllers', ['authServices','stuServices','userServices'])

.controller('mainCtrl', function ($rootScope, $scope, $location, $timeout, User, Auth, Student) {
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
				app.field = data.data.field;
				if (app.state == "student") {
					app.student = true;
					app.instructor = false;
					if ($location.path() == '/sdashboard') {
						Student.getCourses({email: app.email}).then(function(c) {
							c1 = c.data.allCourses;
							for (var i = 0; i < c1[1].length; i++){
								c1[1][i].grade = '-';
							}
							c2 = c1[0].concat(c1[1]);
							c1 = Student.sortCourses(c2);
							list = [];
							c1.forEach(function(x) {
								list = list.concat(x);
							})
							app.courses = list.slice(0,5);
							c = User.getAllCourses();
							app.allCourses = c.slice(0,6);
						});
					} else if ($location.path() == '/sahistory') {
						Student.getCourses({email: app.email}).then(function(c) {
							c1 = c.data.allCourses;
							c2 = Student.sortCourses(c1[0]);
							app.courses = c2;
							courses = [];
							c1[0].forEach(function(c) {
								courses.push([c.term,c.subject,c.catalog,c.courseTitle,c.grade,c.units,c.courseType]);
							})
							app.scgpa = User.getScgpa(courses);
							app.cgpa = User.getGpa(courses);
							c1[1].forEach(function(c) {
								courses.push([c.term,c.subject,c.catalog,c.courseTitle,c.grade,c.units,c.courseType]);
							})
							app.creds = User.getCreds(courses);
							app.mcreds = User.getMcreds(courses);
							app.typeinfo = User.getTypeInfo(courses);
							app.allCourses = User.getAllCourses();
						});
					}
				} else {
					app.student = false;
					app.instructor = true;
					app.room = data.data.room;
					app.ext = data.data.ext;
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