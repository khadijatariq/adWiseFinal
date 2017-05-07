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

	userFactory.getTypeInfo = function (course) {
		dict = {};
		course.forEach(function(c) {
			if (!(c[6] in dict)) {
				dict[c[6]] = c[5];
			} else {
				dict[c[6]] = dict[c[6]] + c[5];
			}
		});
		types = ["University Core","Out Group","SSE Core","SSE Elective","Major Core","Major Elective","Free Elective"];
		used = [];
		types.forEach(function(x) {
			if (!(x in dict)) {
				dict[x] = 0;
			}
			used.push(dict[x]);
		});
		required = [8,9,34,3,49,9];
		needed = [];
		for (var i = 0; i < required.length; i++) {
			x = required[i]-used[i];
			if (x < 0){
				needed.push(0);
			} else {
				needed.push(x);
			}
		}
		result = [];
		for (var i = 0; i < required.length; i++) {
			var y = {};
			y.cType = types[i];
			y.required = required[i];
			y.needed = needed[i];
			y.used = used[i];
			result.push(y);
		}
		var z = {};
		z.cType = types[types.length-1];
		z.used = used[used.length-1];
		result.push(z);
		return result;
	};

	userFactory.getAllCourses = function() {
		catalogs = ["CS100","CS202","CS300","CS315","CS331","CS360","CS382","CS432","CS436","CS473","CS5014","CS510","CS524","CS5312","CS536","CS5614","CS567","CS570","CS585","CS6310","CS636","CS664","CS666","CS220"];
		titles = [];
		iname = [];
		hrefs = [];
		return -1;
	};

	return userFactory;
});