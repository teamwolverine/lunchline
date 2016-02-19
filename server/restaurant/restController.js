var cors = require('cors');
var Q = require('q');
var Restaurant = require('/restModel.js'); 

//helper functions for http requests
module.exports = {

//headers for when places
// var headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, // Seconds.
//   'Content-Type': "text/html"
// };

//on page load ping google places (POST MVP)
  //query the database for googles place id
    //if found
      // retrieve that entry from the db and add to resp
    //if not found
      // add it to the database
      // add a wait property
  //return the response obj     

//get request on page load to grab local 
//restaurants from database
fetchRestaurants: function(req, resp, next){
  //query db to get all our restaurants
  var allItems = Q.nbind(Restaurant.findOne, Restaurant)
  //get all the restaurant listings
  allItems({}).then(function(restaurants){
    //respond with a json
    resp.json(restaurants);
  }).fail(function(error){
    next(error);
  });
},

//post request to update a wait time
updateWait: function(req, resp, next){
  //query for the obj id
  var query = {_.id: req.body._id};
  //update the wait time property
  var update = {wait: req.body.data};
  var options = {upsert: true, new: true}
  Restaurant.findOneAndUpdate(query, update,options, function(err, restaurant) {
      if (err) {
        throw err;
      }    
    resp.json(restaurant);  
    })
}
  

}

