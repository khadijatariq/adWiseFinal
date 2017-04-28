angular.module('userServices',[])

.factory('User', function($http) {
	userFactory = {};

	userFactory.create = function (regData) {
		return $http.post('/api/register', regData);
	}

	userFactory.passCheck = function (pass) {
		nums = ['0','1','2','3','4','5','6','7','8','9'];
		for (var i = 0; i < 10; i++) {
			if (pass.search(nums[i]) >= 0){
				return true;
			}
		}
		return false;
	}

	return userFactory;
});