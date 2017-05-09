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

	userFactory.storeAllCourses = function() {
		catalogs = ["CS100","CS202","CS300","CS315","CS331","CS360","CS382","CS432","CS436","CS473","CS5014","CS510","CS524","CS5312","CS536","CS5614","CS567","CS570","CS585","CS6310","CS636","CS664","CS666","CS220","CS674","CS310"];
		titles = ["Computational Problem Solving","Data Structures","Advanced Programming","Theory of Automata","Artificial Intelligence","Software Engineering","Network Centric Computing","Introduction to Data Mining"," Computer Vision","Network Security","Applied Statistics","Design and Analysis of Algorithms","High Performance Computing","Big Data Analytics","Data Mining","Software Project Management","Software Reuse","Advanced Operating Systems","Service Oriented Computing","Information Retrieval","Topics in Data Mining Research","Software Engineering for Smart Grids","Topics in Interactive Computing","Digital Logic Circuits","Digital Image Processing","Algorithms"];
		iname = ["Shafay Shumail","Ihsan Ayub Qazi","Junaid Haroon Siddiqui","Hammad Alizai","Yasir Mehmood","Suleman Shahid","Fareed Zafar","Asim Karim","Murtaza Taj","Fareed Zafar","Arif Zaman","Imdadullah Khan","Humaira Kamal","Imdadullah Khan","Asim Karim","Abdul Basit","Abdul Basit","Hammad Alizai","Basit Shafiq", "Yasir Mehmood","Asim Karim","Naveed Arshad","Suleman Shahid","Jahangir Ikram ","Murtaza Taj","Humaira Kamal"];
		hrefs = ["http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+100-Computational+Problem+Solving-Shafay+Shamail.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+202-EE202-Data+Structures-Ihsan+Ayyub+Qazi.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+300-Advanced+Programming-Junaid+Haroon+Siddiqui.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+315-Theory+of+Automata-Muhammad+Hamad+Alizai.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+331-Introduction+Artificial+Intelligence-Yasir+Mehmood.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+360-Software+Engineering-Suleman+Shahid.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+382-Network-Centric+Computing-Muhammad+Fareed+Zaffar.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+432-Intro+to+Data+Mining-Asim+Karim.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+436-CS+5310-ComputerVision-Murtaza+Taj.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+473-CS+5714-EE+483-Network+Security-Muhammad+Fareed+Zaffar.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+5014-Applied+Statistics-Arif+Zaman.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+510-Design+and+Analysis+of+Algorithms-Imdad+Ullah+Khan.pdf ",".http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+524-High+Performance+Computing-Humaira+Kamal.pdf",".http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+5312-Big+Data+Analytics-Imdadullah+Khan.pdf",".http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+536-Data+Mining-Asim+Karim.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+5614-Software+Project+Management-Hamid+Abdul+Basit.pdf ","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+567-Software+Reuse-Hamid+Abdul+Basit.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+570-Advanced+Operating+Systems-Muhammad+Hammad+Alizai.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+585-Service+Oriented+Computing-Basit+Shafiq.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+6310-Information+Retrieval-Yasir+Mehmood.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+636-Topics+in+Data+Mining+Research-Asim+Karim.pdf",".http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+664-Software+Engineering+for+Smart+Grids-Naveed+Arshad.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+666-Topics+in+Interactive+Computing-Suleman+Shahid.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS+EE+220-Digital+Logic+Circuits-Jahangir+Ikram-Adeel+Pasha-Wala+Saadeh.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS674+EE512-Digital+Image+Processing-Murtaza+Taj.pdf","http://suraj.lums.edu.pk/~ro/?go=download&path=%2F2016-2017%2FSpring+2016-17&file=CS%A0310-Algorithms-Humaira%A0Kamal.pdf"];
		prereq = ["None","CS100","CS200","CS210","None","CS200","CS200","CS202","CS200","CS471","MATH230","CS 202","CS370","CS310","CS202","CS360","None","CS370","None","MATH230","CS536","None","CS446","None","CS5310","CS210"]; //not added yet
		field = []; //not added yet

		list = [];
		for (var i = 0; i < catalogs.length; i++) {
			var y = {};
			y.catalog = catalogs[i];
			y.cTitle = titles[i];
			y.iname = iname[i];
			y.outline = hrefs[i]; 
			y.prereq = prereq[i];
			// y.field = field[i];
			list.push(y);
		}
		$http.post('/api/allcourses', list).then(function(data) {
		});
		return list;
	};

	userFactory.getAllCourses = function() {
		data = {};
		return $http.post('/api/getallcourses', data);
	};

	userFactory.getAllInstructor = function() {
		data = {};
		return $http.post('/api/getallinstructors', data);
	}

	userFactory.getMyCourses = function(name) {
		data = {ins : name};
		return $http.post('/api/getmycourses', data);
	}

	userFactory.addCourse = function(cData) {
		return $http.post('/api/addcourse', cData);
	}

	userFactory.addPost = function(pData) {
		return $http.post('/api/addpost', pData);
	}

	userFactory.getMyPosts = function(name) {
		data = {ins : name};
		return $http.post('/api/getmyposts', data);
	}

	userFactory.addCourseRev = function(rData) {
		return $http.post('/api/addcourserev', rData);
	}

	userFactory.addInstRev = function(rData) {
		return $http.post('/api/addinstrev', rData);
	}

	userFactory.getInstInfo = function(name) {
		x = name.split(" ");
		return $http.post('/api/getinstinfo', {fname: x[0], lname: x[1]});
	}

	userFactory.getMyInstReviews = function(name) {
		return $http.post('/api/getinstreviews', {name: name});
	}

	userFactory.getCourseInfo = function(code) {
		return $http.post('/api/getcourseinfo', {code : code});
	}

	userFactory.getMyCourseReviews = function(code) {
		return $http.post('/api/getcoursereviews', {code : code});
	}

	return userFactory;
});