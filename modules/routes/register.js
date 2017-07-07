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
      // use bcrypt to generate a salt
      bcrypt.genSalt(12, function(err, salt){
        if(err){
          console.log('salt error', err);
          res.sendStatus(400);
        } //end if error
        //creating hash
        else{
          console.log('salt:', salt);
          bcrypt.hash(req.body.password, salt, function(err, hash){
            if(err){
              console.log('has err', err);
              res.sendStatus(400);
            } //end if err
            else{
              console.log('hash:', hash);
              //creating variables to be used in databse to insert information
              var firstName = req.body.firstName;
              var lastName = req.body.lastName;
              var email = req.body.email;
              var password = hash;
              console.log('connected to db');
              //sending information to the database
               var addUser = connection.query("INSERT INTO users (first_name, last_name, status, email, password, role) VALUES ('" + firstName + "', '" + lastName + "', 'pending', '" + email + "', '"+ password+ "', '3');");
              // console.log('checkusername', checkUsername);
              done();
              res.send(200);
            } //end hash else
          }); //end bcrypt.hash
        } //end else
      }); //end bcrypt salt
    } // end else
  }); //end pool connect

});// end login post

module.exports = router;
