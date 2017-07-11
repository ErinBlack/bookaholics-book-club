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


module.exports = router;
