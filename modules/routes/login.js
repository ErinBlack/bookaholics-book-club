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
  //creating object out of email from req.body
  var email = req.body.email;
  var password = req.body.password;
  pool.connect( function(err, connection, done){
    if( err ){
      console.log(err);
      done();
      res.send(400);
    }// end if
    else {
    console.log('connected to db');
    //connecting to database to see if the email exists
    var checkUsername = connection.query("SELECT user_id, status, role, first_name, last_name, email  FROM users WHERE email='"+ email +"' AND password ='"+password+"';",
    function(err, result, fields){
      if(err) throw err;
      console.log(result.rows);
      done();
      res.send(result.rows);
    });

  }// end else
  }); //end pool connect
});// end login get

module.exports = router;
