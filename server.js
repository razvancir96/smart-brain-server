const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const database = [{
	id: 1,
	name: 'razvan',
	email: 'razvan@gmail.com',
	password: 'razvan',
	entries: 0,
	creation_date: '2019-01-01'
}, {
	id: 2,
	name: 'diana',
	email: 'diana@gmail.com',
	password: 'diana',
	entries: 0,
	creation_date: '2019-02-02'
}]

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('signin');
});

// signin endpoint
app.post('/signin', (req, res) => {
	// we try to find the person from the request in our db
	const matchingElement = database.find((elem) => {
		return elem.email === req.body.email && elem.password === req.body.password;
	});
	if (matchingElement === undefined) {
		res.send('fail');
	} else {
		res.send(JSON.stringify({id: matchingElement.id}));
	}
})

app.post('/register', (req, res) => {
	// we're searching for the enetered email in our database
	const nameExists = database.some((elem) => {
		return elem.email === req.body.email;
	})
	if (nameExists) {
		res.send('fail');
	} else {
		// first we insert, then we send response
		database.push({
			id: database.length,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			entries: 0,
			creation_date: new Date()
		})
		res.send('succes');
	}
})

app.get('/profile/:id', (req, res) => {
	const matchingElement = database.find((elem) => {
		return elem.id === Number(req.params.id);
	});
	if (matchingElement === undefined) {
		res.send('fail');
	} else {
		res.send(JSON.stringify({
			name: matchingElement.name,
			entries: matchingElement.entries
		}));
	}
})

app.put('/image', (req, res) => {
	const matchingElement = database.find((elem) => {
		return elem.id === Number(req.body.id);
	});
	if (matchingElement === undefined) {
		res.send('fail');
	} else {
		database[req.body.id-1].entries += 1;
		res.send(JSON.stringify({entries: matchingElement.entries + 1}));
	}
})

app.listen(3000);