var schemas = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'softwareengineering';

module.exports = function(router) {

	//User registration route
	router.post('/register', function(req, res){
		var user = new schemas.User();
		user.email = req.body.email;
		user.password = req.body.password;
		user.state = req.body.state;
		user.save(function(err) {
			if (err) {
				res.json({success: false, message: 'Account with this email already exists!'});
			} else {
				res.json({success: true, message: 'Data received.'});
				if (req.body.state == 'student'){
					var student = new schemas.Student();
					student.email = req.body.email;
					student.fname = req.body.fname;
					student.lname = req.body.lname;
					student.gender = req.body.gender;
					student.field = req.body.field;
					student.cgpa = req.body.cgpa;
					student.scgpa = req.body.scgpa;
					student.save();
					req.body.presentCourses.forEach(function(c) {
						var course = new schemas.PresentCourses();
						course.email = req.body.email;
						course.term = c[0];
					    course.subject = c[1];
					    course.catalog = c[2];
					    course.courseTitle = c[3];
					    course.units = c[4];
					    course.courseType = c[5];
						course.save();
					})
					req.body.pastCourses.forEach(function(c) {
						var course = new schemas.PastCourses();
						course.email = req.body.email;
						course.term = c[0];
					    course.subject = c[1];
					    course.catalog = c[2];
					    course.courseTitle = c[3];
					    course.grade = c[4]
					    course.units = c[5];
					    course.courseType = c[6];
						course.save();
					})
				} else if (req.body.state == 'instructor'){
					var instructor = new schemas.Instructor();
					instructor.email = req.body.email;
					instructor.fname = req.body.fname;
					instructor.lname = req.body.lname;
					instructor.gender = req.body.gender;
					instructor.field = req.body.field;
					instructor.room = req.body.room;
					instructor.ext = req.body.extension;
					instructor.save();
				}
			}
		});
	});

	//User login route
	router.post('/authenticate', function(req, res){
		schemas.User.findOne({ email : req.body.email}).select('email password state').exec(function (err, user) {
			if (!user){
				res.json({success : false, message : 'Account with this email does not exist.'});
			} else if (user){
				var valid = user.comparePassword(req.body.password);
				if (!valid) {
					res.json({success : false, message : 'The password you entered is incorrect.'});
				} else {
					var token  = null;
					if (user.state == 'student') {
						schemas.Student.findOne({ email : user.email}).select('email fname lname').exec(function (err, student) {
							token = jwt.sign({email : student.email, state : user.state, 
								fname : student.fname, lname : student.lname}, secret, {expiresIn : '1h'});
							res.json({success : true, message : 'User authenticated.', token : token});
						});
					} else if (user.state == 'instructor') {
						schemas.Instructor.findOne({ email : user.email}).select('email fname lname').exec(function (err, instructor) {
							token = jwt.sign({email : instructor.email, state : user.state, 
								fname : instructor.fname, lname : instructor.lname}, secret, {expiresIn : '1h'});
							res.json({success : true, message : 'User authenticated.', token : token});
						});
					}
				}
			}
		});
	});

	//get academic history info
	router.post('/courses', function(req, res){
		courses = [];
		schemas.PastCourses.find({email: req.body.email}).select('term subject catalog courseTitle grade units courseType').exec(function(err, course1) {
			if (!err) {
				courses.push(course1);
				schemas.PresentCourses.find({email: req.body.email}).select('term subject catalog courseTitle units courseType').exec(function(err, course2) {
					if (!err) {
						courses.push(course2);
						res.json({success : true, allCourses: courses});
					} else {
						res.json({success : true, allCourses: []});	
					}
				});
			} else {
				res.json({success : true, allCourses: []});
			}
		});
	});

	router.use( function(req, res, next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, secret, function(err, decoded) {
				if (err) {
					res.json({success : false, message : 'Token invalid.'});
				} else {
					req.decoded = decoded;
					next();
				}

			});
		} else {
			res.json({success : false, message : 'No token provided!'});
		}
	});

	router.post('/me', function(req, res){
		res.send(req.decoded);
	});

	return router;
}