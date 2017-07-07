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

// *****  Get all user information from pending requests   *****//
router.get('/requests', function(req, res){
  //creating variables from req.body
  var email = req.body.email;
  var password = req.body.password;
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      //connecting to database to retrieve all users pending approval
      var allPending = connection.query("SELECT user_id, first_name, last_name, profile_img, email  FROM users WHERE status='false';",
      function(err, result){
        if(err) throw err;
        done();
        res.send(result.rows);
      }); //end SELECT statement
    } //end else
  });// end pool connect
  }); // end router.get


// *****  Approve pending user requests   *****//

  router.put('/approve', function(req,res){
    userID = req.body.data;
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
          //connecting to database to approve user
          var approveUser = connection.query("UPDATE users SET status = 'true' WHERE user_id = '"+ userID +"';");
            if(err){
              res.sendStatus(400);
            } //end if err
            else{
              done();
              res.sendStatus(200);
            } // end else
        } // end else
      }); // end pool connection
  }); //end put request


  // *****  Decline pending user requests   *****//
  router.put('/decline', function(req,res){
    userID = req.body.data;
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
          //connecting to database to approve user
          var declineUser = connection.query("UPDATE users SET status = 'declined' WHERE user_id = '"+ userID +"';");
            if(err){
              res.sendStatus(400);
            } //end if err
            else{
              done();
              res.sendStatus(200);
            } // end else
        } // end else
      }); // end pool connection
  }); //end put request

  // *****  Get all Users for Role Change   *****//
  router.get('/getMembers', function(req, res){
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
        //connecting to database to retrieve all users pending approval
        var allUsers = connection.query("SELECT user_id, first_name, last_name, profile_img, email, role  FROM users WHERE status='true';",
        function(err, result){
          if(err) throw err;
          console.log('result.rows', result.rows);
          done();
          res.send(result.rows);
        }); //end SELECT statement
      } //end else
    });// end pool connect
    }); // end router.get


  // *****  Change Roll   *****//
  router.put('/changeRoll', function(req,res){
    console.log('base url get hit on /changeRoll');
    userId = req.body.data.id;
    role = req.body.data.role
    console.log('id', userId);
    console.log('role', role);
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
        console.log('in get else');
          // connecting to database to approve user
          var makeAdmin = connection.query("UPDATE users SET role = '"+role+"' WHERE user_id = '"+ userId +"';");
            if(err){
              res.sendStatus(400);
            } //end if err
            else{
              done();
              res.sendStatus(200);
            } // end else
        } // end else
      }); // end pool connection
  }); //end put request
module.exports = router;
