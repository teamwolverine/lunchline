var express = require('express');
var app = require('../server.js');
var port = process.env.PORT || 8080;
var restController = require('./restController.js');
var jsonParser = require('body-parser').json();


//app.get('/api', restController.getRestaurants);
//on page load
app.post('/api', jsonParser, restController.test);
app.get('/api', jsonParser, restController.test);
//app.get('/url', utils.function)

//app.put('/user/:id', utils.function)
app.put('/api/update', jsonParser, restController.updateWait);

// app.listen(port);

// module.exports = app
