angular.module('userControllers', [])

.controller('regCtrl', function($http, $location, $timeout) {
	
	var app = this;

	app.stUser = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			app.loading = true;
			$http.post('/api/regStu', app.regData).then(function(data) {
				app.loading = false;
				if (data.data.success) {
					app.successMsg = data.data.message;
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
});