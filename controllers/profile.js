const handleProfile = (req, res, knex) => {
	knex('users').where({
	  id: Number(req.params.id),
	}).select()
	.then(user => {
		if (user.length === 0) {
			res.json('fail');
		} else {
			res.send(JSON.stringify({
				id: user[0].id,
				name: user[0].name,
				entries: user[0].entries
			}));
		}
	})
}

module.exports = {
	handleProfile: handleProfile
}