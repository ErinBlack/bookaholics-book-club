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

var pool = require('../pool.js');

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );

// ***** Post Main Comment   *****//
router.post('/comment', function(req, res){
  console.log('in book Comment to Post');
  console.log('req.body', req.body.data);
  let sentComment = req.body.data;
  console.log('sent data', sentComment.userId, sentComment.date, sentComment.comment, sentComment.bookId );
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      console.log('in else');
      var commentToSend = connection.query("INSERT INTO book_comments (user_id, book_id, date, comment) VALUES ('"+ sentComment.userId +"','"+ sentComment.bookId  +"', '"+ sentComment.date +"', '"+ sentComment.comment +"' );", function(err, result){
        if(err){
          done();
          res.send('error');
        }
        else{
          done();
          res.send('success');
        }
      }); //end connection Query
      } // end else
    }); // end pool connection
});


// ***** Get All Book Comments   *****//
router.get('/comment', function(req, res){
  console.log('in get / comment');
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      console.log('in else');
      var allMainComments = connection.query("SELECT *  FROM book_comments;",
      function(err, result){
        if(err){
          done();
          res.send('error');
        }
        else{
          done();
          res.send(result.rows);
        }
      }); //end SELECT statement
      } // end else
    }); // end pool connection
});






module.exports = router;
