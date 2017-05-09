angular.module('appRoutes', ['ngRoute', 'ngResource'])

.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
	
	.when('/', {
		title : 'HOME',
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		title : 'ABOUT',
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/signup-as-student', {
		title : 'SIGN UP STUDENT',
		templateUrl: 'app/views/pages/users/signup-stu.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.when('/signup-as-instructor', {
		title : 'SIGN UP INSTRUCTOR',
		templateUrl: 'app/views/pages/users/signup-ins.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.when('/faq', {
		title : 'FAQ',
		templateUrl: 'app/views/pages/faq.html'
	})

	.when('/contact', {
		title : 'CONTACT',
		templateUrl: 'app/views/pages/contact.html'
	})

	.when('/login', {
		title : 'SIGN IN',
		templateUrl: 'app/views/pages/users/login.html'
	})

	.when('/reset-password', {
		title : 'RESET PASSWORD',
		templateUrl: 'app/views/pages/users/reset-password.html',
		controller: 'passCtrl',
		controllerAs: 'password'
	})

	.when('/sdashboard', {
		title : 'DASHBOARD',
		templateUrl: 'app/views/pages/users/student/dashboard.html'
	})

	.when('/scareers', {
		title : 'CAREERS',
		templateUrl: 'app/views/pages/users/student/careers.html'
	})

	.when('/sahistory', {
		title : 'ACADEMIC_HISTORY',
		templateUrl: 'app/views/pages/users/student/ahistory.html'
	})

	.when('/scourses', {
		title : 'COURSES',
		templateUrl: 'app/views/pages/users/student/courses.html',
		controller: 'regCtrl',
		controllerAs: 'review'
	})

	.when('/sabout', {
		title : 'ABOUT',
		templateUrl: 'app/views/pages/users/student/about.html'
	})

	.when('/sfaq', {
		title : 'FAQ',
		templateUrl: 'app/views/pages/users/student/faq.html'
	})

	.when('/sprofile', {
		title : 'PROFILE',
		templateUrl: 'app/views/pages/users/student/profile.html'
	})

	.when('/sonecourse', {
		title : 'ONE COURSE',
		templateUrl: 'app/views/pages/users/student/onecourse.html'
	})

	.when('/scareerinfo', {
		title : 'CAREERINFO',
		templateUrl: 'app/views/pages/users/student/careerinfo.html'
	})

	.when('/iprofile', {
		title : 'PROFILE',
		templateUrl: 'app/views/pages/users/instructor/profile.html'
	})

	.when('/ievals', {
		title : 'EVALUATIONS',
		templateUrl: 'app/views/pages/users/instructor/evaluations.html'
	})

	.when('/isettings', {
		title : 'SETTINGS',
		templateUrl: 'app/views/pages/users/instructor/settings.html'
	})

	.when('/ssettings', {
		title : 'SETTINGS',
		templateUrl: 'app/views/pages/users/student/settings.html'
	})

	.when('/enrollment', {
		title : 'ENROLLMENT',
		templateUrl: 'app/views/pages/users/student/enrollment.html'
	})

	.when('/scontact', {
		title : 'CONTACT',
		templateUrl: 'app/views/pages/users/student/contact.html'
	})

	.when('/courseinfo', {
		title : 'COURSEINFO',
		templateUrl: 'app/views/pages/users/student/courseinfo.html'
	})

	.when('/sinstructors', {
		title : 'INSTRUCTORS',
		templateUrl: 'app/views/pages/users/student/instructors.html',
		controller: 'regCtrl',
		controllerAs: 'review'
	})

	.when('/idashboard', {
		title : 'DASHBOARD',
		templateUrl: 'app/views/pages/users/instructor/dashboard.html',
		controller: 'regCtrl',
		controllerAs: 'inst'
	})

	.when('/icourses', {
		title : 'COURSES',
		templateUrl: 'app/views/pages/users/instructor/courses.html'
	})

	.when('/ioldposts', {
		title : 'OLD POSTS',
		templateUrl: 'app/views/pages/users/instructor/oldposts.html',
		controller: 'regCtrl',
		controllerAs: 'inst'
	})

	.when('/iinstructors', {
		title : 'INSTRUCTORS',
		templateUrl: 'app/views/pages/users/instructor/instructors.html'
	})

	.when('/imycourses', {
		title : 'MY COURSES',
		templateUrl: 'app/views/pages/users/instructor/mycourses.html',
		controller: 'regCtrl',
		controllerAs: 'course'
	})

	.when('/iinsinfo', {
		title : 'INSTRUCTOR INFO',
		templateUrl: 'app/views/pages/users/instructor/insinfo.html'
	})

	.when('/sinsinfo', {
		title : 'INSTRUCTOR INFO',
		templateUrl: 'app/views/pages/users/student/insinfo.html'
	})

	.when('/iabout', {
		title : 'ABOUT',
		templateUrl: 'app/views/pages/users/instructor/about.html'
	})

	.when('/ifaq', {
		title : 'FAQ',
		templateUrl: 'app/views/pages/users/instructor/faq.html'
	})

	.when('/icontact', {
		title : 'CONTACT',
		templateUrl: 'app/views/pages/users/instructor/contact.html'
	})

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})

.run(function($rootScope) {

	$rootScope

	.$on('$routeChangeSuccess',function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
});