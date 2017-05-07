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
  	field: {type: String, required: true},
  	cgpa: {type: Number, required: true},
  	scgpa: {type: Number, required: true}
});

var InstructorSchema = new Schema({
  	email: { type: String, required: true, lowercase: true, unique: true },
  	fname: {type: String, required: true},
  	lname: {type: String, required: true},
  	gender: {type: String, required: true, lowercase: true},
  	field: {type: String, required: true},
  	room: {type: String, required: true},
  	ext: {type: String, required: true}
});

var PresentCoursesSchema = new Schema({
    email: { type: String, required: true, lowercase: true},
    term: {type: String, required: true},
    subject: {type: String, required: true, uppercase: true},
    catalog: {type: String, required: true},
    courseTitle: {type: String, required: true},
    units: {type: Number, required: true},
    courseType: {type: String, required: true}
});

PresentCoursesSchema.index({email : 1, term : 1, subject : 1, catalog : 1},{unique : true});

var PastCoursesSchema = new Schema({
    email: { type: String, required: true, lowercase: true},
    term: {type: String, required: true},
    subject: {type: String, required: true, uppercase: true},
    catalog: {type: String, required: true},
    courseTitle: {type: String, required: true},
    grade: {type: String, required: true},
    units: {type: Number, required: true},
    courseType: {type: String, required: true}
});

PastCoursesSchema.index({email : 1, term : 1, subject : 1, catalog : 1},{unique : true});

var AllCoursesSchema = new Schema({
    catalog: { type: String, required: true, unique: true},
    courseTitle: {type: String, required: true},
    instructor: {type: String, required: true},
    outline: {type: String, required: true},
    field: {type: String, required: true},
    prereq: {type: String, required: true}
});

var PostSchema = new Schema({
    field: { type: String, required: true},
    text: {type: String, required: true},
    instructor: {type: String, required: true},
});

var CourseReviewSchema = new Schema({
    course: { type: String, required: true},
    text: {type: String, required: true},
    name: {type: String, required: true},
});

var InstructorReviewSchema = new Schema({
    instructor: { type: String, required: true},
    text: {type: String, required: true},
    name: {type: String, required: true},
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
module.exports.PresentCourses = mongoose.model('PresentCourses', PresentCoursesSchema);
module.exports.PastCourses = mongoose.model('PastCourses', PastCoursesSchema);
module.exports.AllCourses = mongoose.model('AllCourses', AllCoursesSchema);
module.exports.Post = mongoose.model('Posts', PostSchema);
module.exports.CourseReview = mongoose.model('CourseReviews', CourseReviewSchema);
module.exports.InstructorReview = mongoose.model('InstructorReviews', InstructorReviewSchema);