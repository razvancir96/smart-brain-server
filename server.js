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
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// signin endpoint
app.post('/signin', (req, res) => {
	signin.handleSignIn(req, res, knex, bcrypt);
});
// register endpoint
app.post('/register', (req, res) => {
	register.handleRegister(req, res, knex, bcrypt);
});
// get user profile
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, knex);
});
// update entries
app.put('/image', (req, res) => {
	image.handleImage(req, res, knex);
});

app.listen(3000);