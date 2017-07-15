let express  = require('express');
let router = express.Router();
let path = require('path');
let bodyParser = require('body-parser');
let pg = require('pg');


//config to database
let config = {
database: 'bookaholics',
host: 'localhost',
port: 5432,
max: 50
};

let pool = new pg.Pool(config);

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );


// *****  Update User Info   *****//
router.put('/user', function(req,res){
  console.log('in user router with:', req.body);

  pool.connect( function(err, connection, done){
    if( err ){
      done();
      res.send('error');
    }// end if
    else {
      let firstName = req.body.data.firstName;
      let lastName = req.body.data.lastName;
      let email = req.body.data.email;
      let userId = req.body.data.userId;
      let image = req.body.data.img;
      console.log('let image' ,image );
      if(image == ''){
        let updateUser = connection.query("UPDATE users SET first_name = '"+firstName+"', last_name = '"+ lastName+"', email = '"+ email +"' WHERE user_id = '"+ userId +"';", function(){
          if(err){
            done();
            res.sendStatus(400);
          } //end if err
          else{
            done();
            res.sendStatus(200);
          } // end else
        });
      }
      else {
        console.log('req.body shortcuts', firstName, lastName, email, userId);
          // connecting to database to approve user
          let updateUser = connection.query("UPDATE users SET first_name = '"+firstName+"', last_name = '"+ lastName+"', email = '"+ email +"', profile_img = '"+ image +"' WHERE user_id = '"+ userId +"';", function(){
            if(err){
              done();
              res.sendStatus(400);
            } //end if err
            else{
              done();
              res.sendStatus(200);
            } // end else
          });
      }

      } // end else
    }); // end pool connection
}); //end put request


module.exports = router;
