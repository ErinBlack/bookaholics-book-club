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
      res.send('error');
    }// end if
    else {
      console.log('connected to db');
      //connecting to database to see if the email exists
      var checkUsername = connection.query("SELECT user_id, status, role, first_name, last_name, email, password  FROM users WHERE email='"+ email +"';",
      function(err, result){
        if(err) throw err;
        console.log('result.rows', result.rows[0]);
        //check if user email exists
        if(result.rows[0] === undefined){
          res.send( 'not in system' );
        }
        else {
          //password returned from db
          var dbPassword = result.rows[0].password;
          //using bcrypt to see if password given matches pasword in db
            bcrypt.compare( req.body.password, dbPassword, function(err, isMatch){
            if(err){
              res.send( 'error' );
            } //end if
            else {
              if( isMatch ){
                done();
                res.send(result.rows);
              } //end if
              else {
                done();
                res.send('password not a match');
              }
            } //end else
          }); //end bcrypt.compare
        }
      }); //end SELETE statement
    } //end else
  });// end pool connect
}); //end router.post
module.exports = router;
