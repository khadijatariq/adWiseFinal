angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($location, $timeout, User) {
	
	var app = this;

	app.regStu = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			if (app.regData.password.length > 5) {
				if (User.passCheck(app.regData.password)){
					app.regData.state = "student";
					User.create(app.regData).then(function(data) {
						if (data.data.success) {
							app.successMsg = data.data.message + " Redirecting...";
							$timeout(function() {
								$location.path("/sdashboard");
							}, 1000);
						} else {
							app.errorMsg = data.data.message;
						}
					});
				} else {
					app.errorMsg = "Password must contain at least 1 numeric character."
				}
			} else {
				app.errorMsg = "Password must contain at least 6 characters."
			}
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};

	app.regIns = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			if (app.regData.password.length > 5) {
				if (User.passCheck(app.regData.password)){
					app.regData.state = "instructor";
					User.create(app.regData).then(function(data) {
						if (data.data.success) {
							app.successMsg = data.data.message + " Redirecting...";
							$timeout(function() {
								$location.path("/idashboard");
							}, 1000);
						} else {
							app.errorMsg = data.data.message;
						}
					});
				} else {
						app.errorMsg = "Password must contain at least 1 numeric character."
					}
			} else {
				app.errorMsg = "Password must contain at least 6 characters."
			}
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};
})