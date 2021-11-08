// server.js

// set up ======================================================================
// get all the tools we need
require('dotenv').config()
var express  = require('express');
var app      = express();
// var port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var ObjectID = require('mongodb').ObjectID
var multer = require('multer')

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// var configDB = require('./config/database.js');

// const db = require('./config/database').MongoURI;
const PORT = process.env.PORT || 3000;
// var ObjectId = new ObjectId();
// configuration ===============================================================
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});
db.once('open', () => {
    require('./app/routes.js')(app, passport, db, multer, ObjectID);
    console.log('Connected to database')
}) // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(PORT);
console.log('The magic happens on port ' + PORT);
