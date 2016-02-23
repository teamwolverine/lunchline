var cors = require('cors');
var Q = require('q');
var Restaurant = require('./restModel.js');
var PlaceSearch = require('google-locations'); 
var config = require('../config.js');
var lat = 34.0192676;
var lng = -118.4965371;

//helper functions for http requests
exports.getRestaurants = function(req, res, next){
  var closestRestaurants = [];
  var locations = new PlaceSearch(config.placesKey);
    locations.search({keyword: 'restaurant', location: [34.0192676, -118.4965371], radius: 1609.34}, function(err, response){
      if(err){
        throw err;
      }
      console.log("results: ", response.results);
      for(var i = 0; i < response.results.length; i++){  
      Restaurant.findOne({ place_id: response.results[i].place_id }, function(err, newModel){
        if(err){
          console.log(err);
          var restaurant = new Restaurant({
            wait: "blue",
            geometry: {location: {lat: response.results[i].geometry.location.lat, lng: response.results[i].geometry.location.lng}},
            id: response.results[i].id,
            name: response.results[i].name,
            place_id: response.results[i].place_id,
            price_level: response.results[i].price_level,
            rating: response.results[i].rating,
            types : response.results[i].types[0],
            vicinity: response.results[i].vicinity
          })
          restaurant.save(function(err){
            if(err){
              console.log("not saved");
              throw err;
            }
            else {
              console.log("+++ line 38 restaurant: ", restaurant)
              closestRestaurants.push(restaurant)
            }
          }) 
        }
        else {
          console.log("+++ line 44 model: ", newModel)
          closestRestaurants.push(newModel)  
        }
      }) 
    }
    res.json(closestRestaurants);
    console.log("+++ line 49 closestRestaurants: ", closestRestaurants) 
  })     
},    

// exports.fetchRestaurants = function(req, resp, next){
//   console.log("fetch is running")
//   var allItems = Q.nbind(Restaurant.find, Restaurant)
//   //get all the restaurant listings

//   allItems({}).then(function(restaurants){
//     //respond with a json
//     resp.json(restaurants);
//   }).fail(function(error){
//     next(error);
//   });
// },


//post request to update a wait time
exports.updateWait = function(req, resp, next){
  // console.log("request obj: ", req);
    console.log("request obj: ", req.body);
  //query for the obj id
  var query = {place_id: req.body.place_id}
  //update the wait time property
  console.log("+++ query", query)
  var update = {wait: req.body.wait};
  console.log("+++ update", update);
  var options = {upsert: true}; 
  Restaurant.findOneAndUpdate(query, update, options, function(err, restaurant) {
      if (err) {
        throw err;
      }    
    resp.json(restaurant.wait);
    })
  }
