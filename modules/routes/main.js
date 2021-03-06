var express  = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');


var pool = require('../pool.js');

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



// ***** Post Main Comment   *****//
router.post('/comment', function(req, res){
  console.log('req.body', req.body.data);
  let sentComment = req.body.data;
  console.log('sent data', sentComment.userId, sentComment.date, sentComment.comment );
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      console.log('in else');
      var commentToSend = connection.query("INSERT INTO main_feed (user_id, date, comment) VALUES ('"+ sentComment.userId +"', '"+ sentComment.date +"', '"+ sentComment.comment +"' );", function(err, result){
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


// ***** Get Main Comments   *****//
router.get('/comment', function(req, res){
  console.log('in get / comment');
  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      console.log('in else');
      var allMainComments = connection.query("SELECT *  FROM main_feed;",
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
