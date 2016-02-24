//requirements
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

var mongooseUsername = process.env.USERNAME || config.username;
var mongoosePassword = process.env.PASSWORD || config.password;

mongoose.connect('mongodb://'+mongooseUsername+':'+mongoosePassword+'@ds011158.mongolab.com:11158/lunchline-js')

//where to serve static files
app.use(express.static(__dirname + '/../client/'));//serving all static files to our client folder
app.use('/node', express.static(__dirname + '/../node_modules/'));
app.use('/bower', express.static(__dirname + '/../bower_components/'));

app.post('/api', jsonParser, restController.getRestaurants);
app.put('/api/update', jsonParser, restController.updateWait);

module.exports = app;
