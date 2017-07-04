//require

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./modules/routes/index');
var login = require('./modules/routes/login');
var register = require('./modules/routes/register');
var main = require('./modules/routes/main');
var bcrypt = require( 'bcrypt' );
var pg = require('pg');
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/main', main);


//port for server
var port = process.env.PORT || 3000;

//config to database
var config = {
database: 'bookaholics',
host: 'localhost',
port: 5432,
max: 50
};

var pool = new pg.Pool(config);

//spin up server

app.listen(port, function(){
  console.log('server up on:', port);
});
