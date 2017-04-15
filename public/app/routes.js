angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
	
	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/signup-as-student', {
		templateUrl: 'app/views/pages/users/signup-stu.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.when('/signup-as-instructor', {
		templateUrl: 'app/views/pages/users/signup-ins.html'
		//controller: 'regCtrl',
		//controllerAs: 'register'
	})

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})