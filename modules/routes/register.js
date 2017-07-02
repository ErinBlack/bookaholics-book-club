var express  = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require( 'bcrypt' );
var bodyParser = require('body-parser');
var pg = require('pg');


//config to database
var config = {
database: 'bookaholics',
host: 'localhost',
port: 5432,
max: 50
};

var pool = new pg.Pool(config);

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );

// Post route to log in user
router.post ('/', function(req,res) {
  console.log('base url post hit:', req.body);
  //connect to the database pool
  pool.connect( function(err, connection, done){
    if( err ){
      console.log(err);
      done();
      res.send(400);
    }// end if
    else {
      console.log('connected to db');
      //connecting to database to see if the email exists
      // var checkUsername = connection.query("SELECT user_id FROM users WHERE email='erinblackdesign@gmail.com'");
      // console.log('checkusername', checkUsername);
      done();
      res.send(200);
    }// end else

  }); //end pool connect

});// end login post

module.exports = router;
