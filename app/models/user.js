var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: { type: String, required: true, lowercase: true, unique: true },
	password: { type: String, required: true },
	state: { type: String, required: true, lowercase: true }
});

var StudentSchema = new Schema({
  	email: { type: String, required: true, lowercase: true, unique: true },
  	fname: {type: String, required: true},
  	lname: {type: String, required: true},
  	gender: {type: String, required: true, lowercase: true},
  	field: {type: String, required: true, lowercase: true},
  	gpa: {type: Number, reuqired: true},
  	cgpa: {type: Number, reuqired: true}
});

var InstructorSchema = new Schema({
  	email: { type: String, required: true, lowercase: true, unique: true },
  	fname: {type: String, required: true},
  	lname: {type: String, required: true},
  	gender: {type: String, required: true, lowercase: true},
  	field: {type: String, required: true, lowercase: true},
  	room: {type: String, reuqired: true},
  	ext: {type: String, reuqired: true}
});

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash) {
		user.password = hash;
	    next();
	});
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports.User = mongoose.model('Users', UserSchema);
module.exports.Student = mongoose.model('Students', StudentSchema);
module.exports.Instructor = mongoose.model('Instructors', InstructorSchema);