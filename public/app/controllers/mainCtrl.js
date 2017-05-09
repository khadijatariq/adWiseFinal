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
							app.pcourses = c1[1];
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
					} else if ($location.path() == '/enrollment'){
						app.cfield = app.field;
						User.getCareerCourses(app.cfield).then(function(data){
							crs = data.data.info;
							Student.getCourses({email: app.email}).then(function(c) {
								crs1 = c.data.allCourses;
								app.crs = crs1[0].concat(crs1[1]);
								s = User.getSuggestions(crs,app.crs);
								app.vcore = false;
								app.velective = false;
								app.core = s[0];
								app.elective = s[1];
								if (s[0].length == 0){
									app.vcore = true;
								}
								if (s[1].length == 0){
									app.velective = true;
								}
							});
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
							User.getMyInstReviews(app.fname + ' ' + app.lname).then(function(c) {
								app.insrev = c.data.reviews;
							});
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
					} else if ($location.path() == '/ievals'){
						User.getMyInstReviews(app.fname + ' ' + app.lname).then(function(c) {
							app.insrev = c.data.reviews;
							User.getMyCourses(app.fname + ' ' + app.lname).then(function(c) {
								app.courserev = []
								c.data.courses.forEach(function(x) {
									User.getMyCourseReviews(x.catalog).then(function(d) {
										app.courserev = app.courserev.concat(d.data.reviews);
									});
								});
							});
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

	app.chooseCareer = function(name) {
		if (name == "Computer Networks"){
			app.desc = "Computer networks support an enormous number of applications and services such as access to the World Wide Web, digital video, digital audio, shared use of application and storage servers, printers, and fax machines, and use of email and instant messaging applications as well as many others.";
		} else if (name == "Human Computer Interaction"){
			app.desc = "Human–computer interaction (commonly referred to as HCI) researches the design and use of computer technology, focused on the interfaces between people (users) and computers. Researchers in the field of HCI both observe the ways in which humans interact with computers and design technologies that let humans interact with computers in novel ways.";
		} else if (name == "Computer Graphics"){
			app.desc = "Computer graphics is responsible for displaying art and image data effectively and meaningfully to the user. It is also used for processing image data received from the physical world. Computer graphic development has had a significant impact on many types of media and has revolutionized animation, movies, advertising, video games, and graphic design generally.";
		} else if (name == "Artificial Intelligence"){
			app.desc = "In computer science, the field of AI research defines itself as the study of intelligent agents: any device that perceives its environment and takes actions that maximize its chance of success at some goal. Colloquially, the term, artificial intelligence, is applied when a machine mimics cognitive functions that humans associate with other human minds, such as learning and problem solving";
		} else if (name == "Software Engineering"){
			app.desc = "Computer software engineers apply the principles and techniques of computer science, engineering, and mathematical analysis to the design, development, testing, and evaluation of the software and the systems that enable computers to perform their many applications.";
		} else if (name == "Algorithms"){
			app.desc = "An algorithm is an effective method that can be expressed within a finite amount of space and time and in a well-defined formal language for calculating a function. Starting from an initial state and initial input (perhaps empty), the instructions describe a computation that, when executed, proceeds through a finite number of well-defined successive states, eventually producing output and terminating at a final ending state.";
		} else if (name == "Operating System"){
			app.desc = "An operating system (OS) is system software that manages computer hardware and software resources and provides common services for computer programs. All computer programs, excluding firmware, require an operating system to function.";
		} else if (name == "Comm Bio"){
			app.desc = "Computational biology involves the development and application of data-analytical and theoretical methods, mathematical modeling and computational simulation techniques to the study of biological, behavioral, and social systems.";
		}
		app.careername = name;
		User.getCareerCourses(name).then( function (data) {
			app.careercourses = data.data.info;
			User.getCareerInst(name).then(function (data) {
				ins = data.data.info;
				start = 0;
				app.courseinst = [];
				while (start+4 < ins.length){
					app.courseinst.push(ins.slice(start,start+4));
					start = start + 4;
				}
				if (start != ins.length){
					app.courseinst.push(ins.slice(start,ins.length));
				}
				$location.path("/scareerinfo");
			});
		});
	};

	app.updateSugg = function() {
		User.getCareerCourses(app.cfield).then(function(data){
			crs = data.data.info;
			s = User.getSuggestions(crs,app.crs);
			app.vcore = false;
			app.velective = false;
			app.core = s[0];
			app.elective = s[1];
			if (s[0].length == 0){
				app.vcore = true;
			}
			if (s[1].length == 0){
				app.velective = true;
			}
		});
	};


	app.logout = function() {
		Auth.logout();
		$location.path("/");
	};
});