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

	.when('/idashboard', {
		title : 'DASHBOARD',
		templateUrl: 'app/views/pages/users/instructor/dashboard.html'
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