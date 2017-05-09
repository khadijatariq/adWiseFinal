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
							c = User.storeAllCourses();
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
					} else if ($location.path() == '/scourses'){
						User.getAllCourses().then(function(c) {
							app.allCourses = c.data.courses;
						});
					} else if ($location.path() == '/sinstructors'){
						User.getAllInstructor().then(function(c) {
							ins = c.data.instructors;
							app.allInstructors1 = ins;
							start = 0;
							app.allInstructors = [];
							while (start+4 < ins.length){
								app.allInstructors.push(ins.slice(start,start+4));
								start = start + 4;
							}
							if (start != ins.length){
								app.allInstructors.push(ins.slice(start,ins.length));
							}
						});
					}
				} else {
					app.student = false;
					app.instructor = true;
					app.room = data.data.room;
					app.ext = data.data.ext;
					if ($location.path() == '/idashboard'){
						c = User.storeAllCourses();
						app.allCourses = c.slice(0,6);
						User.getMyCourses().then(function(c) {
							app.myCourses = c.data.courses.slice(0,3);
						});
					} else if ($location.path() == '/icourses'){
						User.getAllCourses().then(function(c) {
							app.allCourses = c.data.courses;
						});
					} else if ($location.path() == '/iinstructors'){
						User.getAllInstructor().then(function(c) {
							ins = c.data.instructors;
							start = 0;
							app.allInstructors = [];
							while (start+4 < ins.length){
								app.allInstructors.push(ins.slice(start,start+4));
								start = start + 4;
							}
							if (start != ins.length){
								app.allInstructors.push(ins.slice(start,ins.length));
							}
						});
					} else if ($location.path() == '/imycourses'){
						User.getMyCourses(app.fname + ' ' + app.lname).then(function(c) {
							app.myCourses = c.data.courses;
						});
					} else if ($location.path() == '/ioldposts'){
						User.getMyPosts(app.fname + ' ' + app.lname).then(function(c) {
							app.myPosts = c.data.posts;
							app.myPosts.reverse();
						});
					}
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

	app.chooseInst = function(name) {
		app.instname = name;
		console.log(name);
		User.getInstInfo(name).then( function (data) {
			if (data.data.info == null) {
				app.instfield = "-";
				app.instemail = "-";
				app.instroom = "-";
				app.instext = "-";
			} else {
				app.instfield = data.data.info.field;
				app.instemail = data.data.info.email;
				app.instroom = data.data.info.room;
				app.instext = data.data.info.ext;
			}
			User.getMyCourses(name).then( function (data) {
				app.instcourses = data.data.courses;
				User.getMyPosts(name).then(function(c) {
					app.instposts = c.data.posts;
					app.instposts.reverse();
					User.getMyInstReviews(name).then( function (data) {
						app.instreviews = data.data.reviews;
						app.instreviews.reverse();
						if (app.state == "student")
							$location.path("/sinsinfo");
						else 
							$location.path("/iinsinfo");

					});
				});
			});
		});
	};

	app.chooseCourse = function(code) {
		app.coursecode = code;
		User.getCourseInfo(code).then( function (data) {
			if (data.data.info == null) {
				app.coursetitle = "-";
				app.courseoutline = "-";
				app.courseinst = "-";
			} else {
				app.coursetitle = data.data.info.courseTitle;
				app.courseoutline = data.data.info.outline;
				app.courseinst = data.data.info.instructor;
			}
			User.getMyCourseReviews(code).then( function (data) {
				app.coursereviews = data.data.reviews;
				app.coursereviews.reverse();
				$location.path("/scourseinfo");
			});
		});
	};

	app.logout = function() {
		Auth.logout();
		$location.path("/");
	};
});