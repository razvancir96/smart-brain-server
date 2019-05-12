const handleSignIn = (req, res, knex, bcrypt) => {
	// search for user password combination
	knex('users').where({
	  email: req.body.email,
	}).select()
	.then(matchingUser => {
		if (matchingUser.length === 0) {
			res.json('fail');
		} else {
			bcrypt.compare(req.body.password, matchingUser[0].password, function(error, result) {
			    if (result) {
			    	res.send(JSON.stringify({id: matchingUser[0].id}));
			    } else {
			    	res.json('fail');
			    }
			});
		}
	})
}

module.exports = {
	handleSignIn: handleSignIn
}