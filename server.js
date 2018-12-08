const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const singin = require('./controllers/singin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const pg = knex(
	{
		client: 'pg',
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true
		}
	}
);

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// root path
app.get('/', (req, res) => {
    res.json("It is working...");
});

// singin
app.post('/singin', singin.handleSingin(pg, bcrypt));

// register
app.post('/register', register.handleRegister(pg, bcrypt));

// get user
app.get('/profile/:id', profile.handleGetProfile(pg));

// update entry
app.put('/image', image.handleImage(pg));
app.put('/imageapi', image.handleImageAPIKey());

app.listen(port, () => {console.log(`It is working on port ${port}`)});