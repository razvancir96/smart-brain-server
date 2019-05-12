const handleImage = (req, res, knex) => {
	knex('users')
  	.where({ 
  		id: Number(req.body.id) 
  	})
  	.increment('entries', 1)
  	.then(result => {
  		if (result === 0) {
  			res.json('fail');
  		} else {
  			res.json('success');
  		}
  	});
}

module.exports = {
	handleImage: handleImage
}