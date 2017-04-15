var User = require('../models/user');

module.exports = function(router) {
	router.post('/register', function(req, res){
		var user = new User();
		user.email = req.body.email;
		user.password = req.body.password;
		user.state = req.body.state;
		user.save(function(err) {
			if (err) {
				res.json({success: false, message: 'Account with this email already exists!'});
			} else {
				res.json({success: true, message: 'Data received'});
			}
		});
	});

	return router;
}