//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function($scope, Data, $http, $stateParams, $state) {
   $scope.data = [];
   $scope.userLocation = {};
   $scope.restInfo = function () {
      //Determine user location
      if (!navigator.geolocation) {
         //Not sure if this is necassary or not
         alert("Geolocation is not supported by this browser.");
      } else {
         // console.log(navigator);
         navigator.geolocation.getCurrentPosition(showPosition, locErr);
         function showPosition(position) {
            $scope.userLocation = {
               lat: position.coords.latitude,
               long: position.coords.longitude
            }
            // console.log($scope.userLocation);
         }
      }
      function locErr (err) {
         console.log(err);
         switch(err.code) {
            case err.PERMISSION_DENIED:
                 console.log("User denied the request for Geolocation.");
                 $state.go('errorView');
                 break;
            case err.POSITION_UNAVAILABLE:
                 console.log("Location information is unavailable.");
                 $state.go('errorView');
                 break;
            case err.TIMEOUT:
                 console.log("The request to get user location timed out.");
                 $state.go('errorView');
                 break;
            case err.UNKNOWN_ERROR:
                 console.log("An unknown error occurred.");
                 $state.go('errorView');
                 break;
        }
      }
      // console.log($scope.userLocation);
      //Fetch data for that location
      Data.getData()
      .then(function(fetchedData) {
         $scope.data = fetchedData;
      })
   }
   $scope.restInfo();
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
      // console.log('Factory data: ', Data.clickedItem);
   }
});
