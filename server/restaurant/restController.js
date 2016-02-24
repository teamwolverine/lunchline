var cors = require('cors');
var Q = require('q');
var Restaurant = require('./restModel.js');
var PlaceSearch = require('google-locations');
var _ = require('underscore');
if(!process.env.GOOGLEPLACESKEY){
  var config = require('../config.js');
}
console.log("GOOGLE KEY :", process.env.GOOGLEPLACESKEY);
console.log("CONFIG USERNAME :", process.env.USERNAME);

exports.getRestaurants = function(req, res, next){
  console.log("INSIDE GETRESTAURANTS");
  var results = [];
  //console.log("+++line 10 - getRestaurants called")
  var locations = new PlaceSearch(process.env.GOOGLEPLACESKEY || config.placesKey);
  locations.search({keyword: 'restaurant', location: [34.0192676, -118.4965371], radius: 1609.34}, function(err, response){
      if(err){
        throw err;
      }
      _.each(response.results, function(item){
        Restaurant.findOne({id: item.id}, function(err, obj){
          if(obj === null){
            //console.log("+++line 18 - obj not found")
            var restaurant = new Restaurant({
              wait: "blue",
              geometry: {location: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}},
              id: item.id,
              name: item.name,
              place_id: item.place_id,
              price_level: item.price_level,
              rating: item.rating,
              types : item.types[0],
              vicinity: item.vicinity
            })
            restaurant.save(function(err){
              if(err){
                console.log("not saved");
                throw err;
              }
              results.push(restaurant)
              if(results.length === 20){
                //console.log(results)
                res.json(results);
              }
            })
          }
          else {
            results.push(obj);
            //console.log(results.length)
          if(results.length === 20){
              //console.log(results)
              res.json(results);
            }
          }
        })
      })
    })
},


//helper functions for http requests
// exports.getRestaurants = function(req, res, next){
//   var closestRestaurants = [];
//   var locations = new PlaceSearch(config.placesKey);
//     locations.search({keyword: 'restaurant', location: [34.0192676, -118.4965371], radius: 1609.34}, function(err, response){
//       if(err){
//         throw err;
//       }
//       for(var i = 0; i < response.results.length-1; i++){
//       Restaurant.findOne({ place_id: response.results[i].place_id }, function(err, newModel){
//         if(err){
//           console.log("+++line 21 error")
//           var restaurant = new Restaurant({
//             wait: "blue",
//             geometry: {location: {lat: response.results[i].geometry.location.lat, lng: response.results[i].geometry.location.lng}},
//             id: response.results[i].id,
//             name: response.results[i].name,
//             place_id: response.results[i].place_id,
//             price_level: response.results[i].price_level,
//             rating: response.results[i].rating,
//             types : response.results[i].types[0],
//             vicinity: response.results[i].vicinity
//           })
//           restaurant.save(function(err){
//             if(err){
//               console.log("not saved");
//               throw err;
//             }
//             else {
//               console.log("+++ line 38 restaurant: ", restaurant)
//               closestRestaurants.push(restaurant)
//             }

//           })
//         }
//         else {
//           console.log("+++ line 44 model: ", newModel)
//           closestRestaurants.push(newModel)
//         }
//       })
//     }
//     res.json(closestRestaurants);
//     console.log("+++ line 49 closestRestaurants: ", closestRestaurants)
//   })
// },

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

exports.fetchRestaurants = function(req, resp, next){
  //query db to get all our restaurants
  // console.log("fetch is running")
  var allItems = Q.nbind(Restaurant.find, Restaurant)
  //get all the restaurant listings
  allItems({}).then(function(restaurants){
    //respond with a json
    resp.json(restaurants);
  }).fail(function(error){
    next(error);
  });
},

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
    resp.json(restaurant);
    })
  }
