angular.module('stuServices',[])

.factory('Student', function($http) {
	stuFactory = {};

	stuFactory.getCourses = function (data) {
		return $http.post('/api/courses', data);
	}

	stuFactory.sortCourses = function (courses) {
		dict = {};
		courses.forEach(function(c) {
			if (!(c.term in dict)){
				dict[c.term] = [c];
			} else {
				dict[c.term].push(c);
			}
		});
		fall = [];
		fyear = [];
		spring = [];
		syear = [];
		for (var key in dict) {
			if (key.slice(0,key.length-4) == 'Spring') {
				spring.push(key);
				syear.push(parseInt(key.slice(key.length-4,key.length)));
			} else {
				fall.push(key);
				fyear.push(parseInt(key.slice(key.length-4,key.length)));
			}
		}
		sortedKeys = [];
		for (var i = 0; i < fyear.length; i++) {
			maxI = 0;
			max = 0;
			for (var j = i; j < fyear.length; j++){
				if (fyear[j] > max) {
					max = fyear[j];
					maxI = j;
				}
			}
			temp = fyear[maxI];
			fyear[maxI] = fyear[i];
			fyear[i] = temp;
			temp = fall[maxI];
			fall[maxI] = fall[i];
			fall[i] = temp;
		}
		for (var i = 0; i < syear.length; i++) {
			maxI = 0;
			max = 0;
			for (var j = i; j < syear.length; j++){
				if (syear[j] > max) {
					max = syear[j];
					maxI = j;
				}
			}
			temp = syear[maxI];
			syear[maxI] = syear[i];
			syear[i] = temp;
			temp = spring[maxI];
			spring[maxI] = spring[i];
			spring[i] = temp;
		}
		if (fall.length != spring.length) {
			sortedKeys.push(dict[fall[0]]);
			for (var i = 0; i < spring.length; i++) {
				sortedKeys.push(dict[spring[i]]);
				sortedKeys.push(dict[fall[i+1]]);
			}
		} else {
			for (var i = 0; i < spring.length; i++) {
				sortedKeys.push(dict[spring[i]]);
				sortedKeys.push(dict[fall[i]]);
			}
		}
		return sortedKeys;
	}

	return stuFactory;
});
