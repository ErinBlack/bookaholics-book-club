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

router.get('/getBooks', function(req, res){
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      //connecting to database to retrieve all users pending approval
      var allPending = connection.query("SELECT *  FROM books;",
      function(err, result){
        if(err) throw err;
        done();
        res.send(result.rows);
      }); //end SELECT statement
    } //end else
  });// end pool connect
  }); // end router.get

module.exports = router;
