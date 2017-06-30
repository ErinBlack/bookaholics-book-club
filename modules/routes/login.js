var express  = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require( 'bcrypt' );
var bodyParser = require('body-parser');

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );


// Post route to log in user
router.post ('/', function(req,res) {
console.log('base url post hit:', req.body);

// user.findOne ({username: req.body.username}, function (err, user) {
// if (err) {
//   console.log('find user error:', err);
//   res.sendStatus(400);
// } //end if err
// else {
//   if (user != undefined) {
//     console.log('comparing:', req.body.password, user.password);
//     bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
//       if (err) {
//         console.log('compare error:', err);
//         res.sendStatus(400);
//       } //end if
//       else {
//         console.log('found u!');
//         if (isMatch) {
//         res.send ('hooray');
//         }
//         else {
//           res.send ('bummer');
//         }
//       }
//     }); //end bcrypt
//   } //end if user defined
//
//   else {
//     console.log('no user found');
//     res.sendStatus(400);
//   }
// } // end of else
// }); //end findOne

}); //end post



module.exports = router;
