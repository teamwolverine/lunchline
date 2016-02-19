var express = require('express');
var app = express();
var restController = require('./restController.js');

//on page load
app.get('/', restController.fetchRestaurants);
//app.get('/url', utils.function)

//app.put('/user/:id', utils.function)
app.put('/:id', restController.updateWait);

module.exports = app