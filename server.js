const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const { check, validationResult } = require('express-validator/check');
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
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// just a greet message
app.get('/', (req, res) => {
  res.json('It is working!');
});
// signin endpoint
app.post('/signin', [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({min:3}).escape()
],(req, res) => {
	signin.handleSignIn(req, res, knex, bcrypt, validationResult);
});
// register endpoint
app.post('/register', [
  check('name').isLength({min:2}).trim().escape(),
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({min:3}).escape()
], (req, res) => {
	register.handleRegister(req, res, knex, bcrypt, validationResult);
});
// get user profile
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, knex);
});
// api request
app.post('/apiRequest', (req, res) => {
  image.apiRequest(req, res);
})
// update entries
app.put('/image', (req, res) => {
	image.handleImage(req, res, knex);
});

app.listen(process.env.PORT || 3000);