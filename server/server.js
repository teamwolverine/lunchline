var express = require('express');
var app = express();
var cors = require('cors');
var Q = require('q');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restController = require('./restaurant/restController.js');
var jsonParser = require('body-parser').json();

if(!process.env.USERNAME){
  var config = require('./config.js');
};

// Use heroku config vars or use own local copy of API keys
var mongooseUsername = process.env.USERNAME || config.username;
var mongoosePassword = process.env.PASSWORD || config.password;

mongoose.connect('mongodb://'+mongooseUsername+':'+mongoosePassword+'@ds011158.mongolab.com:11158/lunchline-js')
console.log('L19 Connected to Mongoose');

// Serve static files
app.use(express.static(__dirname + '/../client/'));//serving all static files to our client folder
app.use('/node', express.static(__dirname + '/../node_modules/'));
app.use('/bower', express.static(__dirname + '/../bower_components/'));

// Route handling
app.post('/api', jsonParser, restController.getRestaurants);
app.put('/api/update', jsonParser, restController.updateWait);

module.exports = app;
