const handleRegister = (req, res, knex, bcrypt, validationResult) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json('fail');
	}

	// we're searching for the enetered email in our database
	knex('users').where({
	  email: req.body.email,
	}).select()
	.then(nameExists => {
		if (nameExists.length !== 0) {
			res.json('fail');
		} else {
			// hash the entered password
			bcrypt.hash(req.body.password, 12, function(err, hash) {
			 // first we insert, then we send response
				knex('users')
				.returning('id')
				.insert([{name: req.body.name,
					email: req.body.email,
					password: hash}])
				.then(returnedArray => {
					if (returnedArray.length === 0) {
						res.json('fail');
					} else {
						res.json('success');
					}
				});
			});
		}
	})	
}

module.exports = {
	handleRegister: handleRegister
}