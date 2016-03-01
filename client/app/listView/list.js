// Controller for the main home list view
myApp.controller('listCtrl', function(distance, Data, $scope) {
   $scope.data = [];
   $scope.userLocation = {};

   // Function called when a wait time is reported.  Saves to session storage for refresh/back cases
   // and updates database.
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
      sessionStorage["tempStorage"] = JSON.stringify(obj);
   }

   // Order variable used for the sorting order
   $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   };

   // Main function on page load
   // Gets user's geo location, sends it to server as a post request
   // Saves results returned to scope object
   $scope.restInfo = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
         $scope.userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
         };
         Data.getData($scope.userLocation, function(fetchedData) {
            // Make a distance property for each restaurant
            for (var i = 0; i < fetchedData.length; i++) {
               var destination = {
                  lat: fetchedData[i].restaurant.geometry.location.lat,
                  long: fetchedData[i].restaurant.geometry.location.lng
               };
               fetchedData[i].restaurant.dist = distance.calc($scope.userLocation, destination);
            }
            // Save fetched data to scope object
            $scope.data = fetchedData;
            // Remove loading gif animation
            $scope.contentLoading = false;
         });
      });
   }

   // Call main post request
   $scope.restInfo();
   // Sets default order to be ascending
   $scope.reverse = true;
   $scope.order('restaurant.dist');
   $scope.contentLoading = true;
});