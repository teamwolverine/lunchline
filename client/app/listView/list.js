//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function(distance, Data, $scope, $http, $stateParams, $state) {
   $scope.data = [];
   $scope.userLocation = {};
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
   }

   $scope.restInfo = function () {
      //Fetch data for that location
      navigator.geolocation.getCurrentPosition(function(position){
         $scope.userLocation = {
               lat: position.coords.latitude,
               long: position.coords.longitude
            }
         Data.getData($scope.userLocation)
            .then(function(fetchedData) {
            $scope.data = fetchedData;
         })
      })
   }
   $scope.restInfo();
});
