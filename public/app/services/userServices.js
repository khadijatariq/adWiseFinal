angular.module('userServices',[])

.factory('User', function($http) {
	userFactory = {};

	userFactory.create = function (regData) {
		return $http.post('/api/register', regData);
	};

	userFactory.passCheck = function (pass) {
		nums = ['0','1','2','3','4','5','6','7','8','9'];
		for (var i = 0; i < 10; i++) {
			if (pass.search(nums[i]) >= 0){
				return true;
			}
		}
		return false;
	};

	userFactory.getGpa = function (course) {
		total = 0;
		sum = 0.00;
		gradeVal = {"A+" : 4.0, "A" : 4.0, "A-" : 3.7, "B+" : 3.3, "B" : 3.0, "B-" : 2.7, "C+" : 2.3, "C" : 2.0, "C-" : 1.7, "D" : 1.0, "F" : 0.0};
		course.forEach(function(x) {
			if (x[4] in gradeVal) {
				total = total + x[5];
				sum = sum + x[5]*gradeVal[x[4]];
			}
		})
		var gpa = sum/total;
		return gpa.toFixed(3);
	};

	userFactory.getScgpa = function (course) {
		total = 0;
		sum = 0.00;
		gradeVal = {"A+" : 4.0, "A" : 4.0, "A-" : 3.7, "B+" : 3.3, "B" : 3.0, "B-" : 2.7, "C+" : 2.3, "C" : 2.0, "C-" : 1.7, "D" : 1.0, "F" : 0.0};
		course.forEach(function(x) {
			if (x[1] == "CS" && x[4] in gradeVal) {
				total = total + x[5];
				sum = sum + x[5]*gradeVal[x[4]];
			}
		})
		var gpa = sum/total;
		return gpa.toFixed(3);
	};

	userFactory.getCreds = function (course) {
		total = 0;
		course.forEach(function(x) {
				total = total + x[5];
		})
		return total;
	};

	userFactory.getMcreds = function (course) {
		total = 0;
		course.forEach(function(x) {
			if (x[1] == "CS" && x[2] != 497)
				total = total + x[5];
		})
		return total;
	};

	return userFactory;
});