//requirements
var express = require('express');
var app = express();
var cors = require('cors');
var Q = require('q');
var bodyParser = require('body-parser');
var config = require('./config.js')
//middleware = bodyParser.json
//require routes

//insert mongolabs url here
var mongoose = require('mongoose');

if(!process.env.USERNAME){
  var config = require('./config.js')
}

var mongooseUsername = process.env.USERNAME || config.username;
var mongoosePassword = process.env.PASSWORD || config.password;

mongoose.connect('mongodb://'+mongooseUsername+':'+mongoosePassword+'@ds011158.mongolab.com:11158/lunchline-js')

//where to serve static files
app.use(express.static(__dirname + '/../client/'));//serving all static files to our client folder
app.use('/node', express.static(__dirname + '/../node_modules/'));
app.use('/bower', express.static(__dirname + '/../bower_components/'));
// app.use('/node_modules', express.static(__dirname + '/node_modules/'));
module.exports = app;
