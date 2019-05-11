const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'root',
    database : 'smart_brain_app'
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('signin');
});

// signin endpoint
app.post('/signin', (req, res) => {
	// search for user password combination
	knex('users').where({
	  email: req.body.email,
	}).select()
	.then(matchingUser => {
		if (matchingUser.length === 0) {
			res.send('fail');
		} else {
			bcrypt.compare(req.body.password, matchingUser[0].password, function(error, result) {
			    if (result) {
			    	res.send(JSON.stringify({id: matchingUser[0].id}));
			    } else {
			    	res.send('fail');
			    }
			});
		}
	})
})

// register endpoint
app.post('/register', (req, res) => {
	// we're searching for the enetered email in our database
	knex('users').where({
	  email: req.body.email,
	}).select()
	.then(nameExists => {
		if (nameExists.length !== 0) {
			res.send('fail');
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
})

// get user profile
app.get('/profile/:id', (req, res) => {
	knex('users').where({
	  id: Number(req.params.id),
	}).select()
	.then(user => {
		if (user.length === 0) {
			res.send('fail');
		} else {
			res.send(JSON.stringify({
				id: user[0].id,
				name: user[0].name,
				entries: user[0].entries
			}));
		}
	})
})

// update entries
app.put('/image', (req, res) => {
	knex('users')
  	.where({ 
  		id: Number(req.body.id) 
  	})
  	.increment('entries', 1)
  	.then(result => {
  		if (result === 0) {
  			res.send('fail');
  		} else {
  			res.send('success');
  		}
  	});
})

app.listen(3000);