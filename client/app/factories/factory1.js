myApp
  // Data factory: contains main get request for list of objects and storage of clicked on item
  .factory('Data', function($http) {
    var getData = function(userLoc, callback) {
      $http({
        method: 'POST',
        url: '/api',
        data: userLoc
      }).then(function success(data) {
          var collection = data.data.map(function(restaurant) {
            return {
              restaurant: restaurant
            };
          });
          callback(collection);
        },
        function error(response) {
          console.log("ERROR: ", response);
        });
    };
    var clickedItem = {};
    return {
      getData: getData,
      clickedItem: clickedItem
    }
  // Distance factory: calculates the distance of a lat/long from the user's lat/long
  }).factory('distance', function() {
    var calc = function(userLoc, destinLoc) {
      //Expects objects with properties 'lat & long'
      var lat1 = userLoc.lat,
        long1 = userLoc.long,
        lat2 = destinLoc.lat,
        long2 = destinLoc.long;
      var deg2rad = function(deg) {
        return deg * (Math.PI / 180)
      }
      var R = 6371; // Radius of Earth
      var dLat = deg2rad(lat2 - lat1);
      var dLon = deg2rad(long2 - long1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = (R * c) * 0.621371;
      return Math.round(d * 10) / 10
    }

    return {
      calc: calc
    }
  // PostData factory : updates the database on a reported restaurant wait time
  }).factory('PostData', function($http) {

    function updateWait(objToSend) {
      $http({
        method: 'PUT',
        url: '/api/update',
        data: objToSend
      }).then(function successCallback(response) {
        console.log('PUT: Sent ' + JSON.stringify(objToSend) + ' successfully');
        console.log('Response from server is : ', response);
      }, function errorCallback(response) {
        console.log('ERROR on Put Request!');
      });
    }

    return {
      updateWait: updateWait
    };
  });