var Restaurant = require('./restModel.js');
var PlaceSearch = require('google-locations');
var _ = require('underscore');
if(!process.env.GOOGLEPLACESKEY){
  var config = require('../config.js');
};

exports.getRestaurants = function(req, res){
  console.log('Receiving a request!', req.body);
  var lat = req.body.lat;
  var lng = req.body.long;
  var results = [];
  //console.log("+++line 10 - getRestaurants called")
  var locations = new PlaceSearch(process.env.GOOGLEPLACESKEY || config.placesKey );
  locations.search({keyword:'restaurant', location: [lat, lng], radius: 5000}, function(err, response){
      if(err){
        throw err;
      }

      _.each(response.results, function(item){
        Restaurant.findOne({id: item.id}, function(err, obj){
          if(obj === null){
            var restaurant = new Restaurant({
              wait: "3_grey",
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
              console.log('RESULTS LENGTH : ', results.length );
              if(results.length === 15){
                res.json(results);
              }
            })
          }
          else {
            results.push(obj);
              console.log('RESULTS LENGTH : ', results.length );

          if(results.length === 18){
              res.json(results);
            }
          }
        })
      })
    })
},

exports.updateWait = function(req, res){
    console.log("request obj: ", req.body);
    var query = {place_id: req.body.place_id}
    console.log("+++ query", query)
    var update = {wait: req.body.wait};
    console.log("+++ update", update);
    var options = {upsert: true};
    Restaurant.findOneAndUpdate(query, update, options, function(err, restaurant) {
      if (err) {
        throw err;
      }
    res.json(restaurant);
    })
  }
