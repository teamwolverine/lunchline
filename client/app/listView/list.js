
myApp.controller('listCtrl', function(distance, Data, $scope, $http, $stateParams, $state) {
   $scope.data = [];
   $scope.userLocation = {};
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
      sessionStorage["tempStorage"] = JSON.stringify(obj);
      Data.showButton = true;
   }

   navigator.geolocation.getCurrentPosition(function(position){
      $scope.userLocation = {
         lat: position.coords.latitude,
         long: position.coords.longitude
      };
   });

   $scope.restInfo = function () {
      navigator.geolocation.getCurrentPosition(function(position){
         $scope.userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
         };
         Data.getData($scope.userLocation, function (fetchedData) {
            //Make a distance property for each restaurant
            for(var i = 0; i < fetchedData.length; i++) {
               var destination = {
                  lat: fetchedData[i].restaurant.geometry.location.lat,
                  long: fetchedData[i].restaurant.geometry.location.lng
               };
               fetchedData[i].restaurant.dist = distance.calc($scope.userLocation, destination);
               $scope.data = fetchedData;
            }
         });
      });
      //Fetch data for that location
   }

   $scope.restInfo();
});
