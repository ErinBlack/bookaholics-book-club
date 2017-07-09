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
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      //connecting to database to retrieve all users pending approval
      var allPending = connection.query("SELECT user_id, first_name, last_name, profile_img, email  FROM users WHERE status='pending';",
      function(err, result){
        console.log('result', result.rows);
        if(err) throw err;
        done();
        res.send(result.rows);
      }); //end SELECT statement
    } //end else
  });// end pool connect
  }); // end router.get

  // *****  Get all Users for Role Change   *****//
  router.get('/getMembers', function(req, res){
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
        //connecting to database to retrieve all users pending approval
        var allUsers = connection.query("SELECT user_id, first_name, last_name, profile_img, email, role  FROM users WHERE status='active';",
        function(err, result){
          if(err) throw err;
          console.log('result.rows', result.rows);
          done();
          res.send(result.rows);
        }); //end SELECT statement
      } //end else
    });// end pool connect
    }); // end router.get


  // *****  Change Member's Roll   *****//
  router.put('/changeRoll', function(req,res){
    userId = req.body.data.id;
    role = req.body.data.role
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
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

  // ***** Change Member's Status   *****//
  router.put('/changeStatus', function(req,res){
    console.log('base url get hit on /disableAccount');
    userId = req.body.data.id;
    status = req.body.data.status
    pool.connect( function(err, connection, done){
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
        console.log('in get else');
          // connecting to database to approve user
          var makeAdmin = connection.query("UPDATE users SET status = '"+ status +"' WHERE user_id = '"+ userId +"';");
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

  // ***** Submit a new book   *****//
  router.post('/postBook', function(req,res){
    console.log('base url get hit on /postBook');
    console.log('id', req.body);
    //variables to send to db
    var userId = req.body.userId;
    var title= req.body.title;
    var author = req.body.author;
    var publishedDate = req.body.publishedDate;
    var isbn = req.body.isbn;
    var coverImage = req.body.coverImage;
    var dueDate = req.body.dueDate;

    pool.connect( function(err, connection, done){
      console.log('in pool.connect');
      if( err ){
        done();
        res.send('error');
      }// end if
      else {
        console.log('in get else');
          // connecting to database to approve user
          var sendBook = connection.query("INSERT INTO books (user_id, title, author, published_date, isbn, cover_img, due_date, status) VALUES ('" + userId + "', '" + title + "', '"+ author +"', '" + publishedDate + "', '"+ isbn + "', '"+ coverImage +"', '"+ dueDate +"', 'true');");
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
