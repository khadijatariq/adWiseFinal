angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {
	
	var app = this;

	app.regStu = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			app.loading = true;
			app.regData.state = "student";
			User.create(app.regData).then(function(data) {
				app.loading = false;
				if (data.data.success) {
					app.successMsg = data.data.message + " Redirecting...";
					$timeout(function() {
						$location.path("/");
					}, 1000);
				} else {
					app.errorMsg = data.data.message;
				}
			});
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};

	app.regIns = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			app.loading = true;
			app.regData.state = "instructor";
			User.create(app.regData).then(function(data) {
				app.loading = false;
				if (data.data.success) {
					app.successMsg = data.data.message + " Redirecting...";
					$timeout(function() {
						$location.path("/");
					}, 1000);
				} else {
					app.errorMsg = data.data.message;
				}
			});
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};
})

.controller('headCtrl', function($scope, $location) {

	$scope.$on('$locationChangeSuccess', function() {

        var path = $location.path();
        
        if (path === '/' || path === '/about' || path === '/contact' || path === '/faq'){
        	$scope.templateUrl = 'app/views/pages/header.html';
        } else {
        	$scope.templateUrl = 'app/views/pages/users/header.html';	
        }
    });
});