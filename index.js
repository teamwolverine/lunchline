var app = require('./server/server.js');
var port = process.env.PORT || 8080;
var route = require('./server/restaurant/restRoutes.js')
var restController = require('./server/restaurant/restController.js')


console.log("app = ", app);
console.log("route = ", route);
app.listen(port);



console.log('Listening on port : ', port);
//route.get('/api', restController.fetchRestaurants);