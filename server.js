const express = require('express');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash');

// import the site router
const base = require('./routes/base')

// create app
var app = express();

// express settings
app.use(session({
	secret: 'SuperSecretKeyIdk',
	resave: true,
	saveUninitialized: true
}));

// Use flasher
app.use(flash());

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use the base router
app.use(base);

// start listening
app.listen(8080);
console.log('Server is listening on port 8080');