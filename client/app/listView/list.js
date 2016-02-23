//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function(distance, Data, $scope, $http, $stateParams, $state) {
   $scope.data = [];
   $scope.userLocation = {};
   $scope.geolocation = function() {
      if (!navigator.geolocation) {
         console.log("Your browser does not support this website.");
         $state.go('errorView');
      } else {
         navigator.geolocation.getCurrentPosition(showPosition, locErr);
         function showPosition(position) {
            $scope.userLocation = {
               lat: position.coords.latitude,
               long: position.coords.longitude
            }
         }

         function locErr (err) {
            $state.go('errorView');
            switch(err.code) {
               case err.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
               case err.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
               case err.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.");
                  break;
            }
         }
      }
   }

   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
   }

   $scope.restInfo = function () {
      //Fetch data for that location
      Data.getData($scope.userLocation)
      .then(function(fetchedData) {
         $scope.data = fetchedData;

         for(var restaurant in $scope.data) {
            destination = restaurant.restaurant.location;
            restaurant.restaurant.dist = distance.calc($scope.userLocation, destination)
         }
      })
   }

   $scope.geolocation();
   $scope.restInfo();
});
