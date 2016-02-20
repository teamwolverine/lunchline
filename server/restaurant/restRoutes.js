var express = require('express');
var app = require('../server.js');
var port = process.env.PORT || 8080;
var restController = require('./restController.js');

//on page load
app.get('/api', restController.fetchRestaurants);
//app.get('/url', utils.function)

//app.put('/user/:id', utils.function)
app.put('/api/:id', restController.updateWait);

// app.listen(port);

// module.exports = app