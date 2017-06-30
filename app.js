//require

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./modules/routes/index');
var login = require('./modules/routes/login');
var bcrypt = require( 'bcrypt' );

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);
app.use('/login', login);
//globals

//spin up server
var port = process.env.PORT || 3000;


//spin up server

app.listen(port, function(){
  console.log('server up on:', port);
});
