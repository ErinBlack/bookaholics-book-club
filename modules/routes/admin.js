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


router.get('/requests', function(req, res){
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
      //connecting to database to retrieve all users pending approval
      var allPending = connection.query("SELECT user_id, first_name, last_name, profile_img  FROM users WHERE status='false';",
      function(err, result){
        if(err) throw err;
        console.log('result.rows', result.rows);
        done();
        res.send(result.rows);
      }); //end SELECT statement
    } //end else
  });// end pool connect
  }); // end router.get
module.exports = router;
