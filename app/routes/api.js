var schemas = require('../models/user');

module.exports = function(router) {
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
					student.gpa = 3.854;
					student.cgpa = 3.909;
					student.save();
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

	return router;
}