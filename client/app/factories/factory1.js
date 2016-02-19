angular.module('lunchline', [])
.factory('Http', function($http) {
   function get() {
    //Determine URL Address and insert here.
    return $http.get();
  }
  return {
    get : get
   }
}).factory('Data', function(Http) {
   //fetching data takes time, so make promise
   var promise;

   //Using the Http factory, fetch the data.
   var getData = function () {
      promise = Http.get();
   }

   var filterData = function (data) {
      var filePath = data.results;
      //Divide data recieved into portions of data (objs)
      var organize = filePath.map(function(restaurant) {
         return {
            name: restaurant.name; //This filepath could change!!!
            color: restaurant.color; //This filepath could change!!!
            //Maybe pull in more information for Rick!
         }
      });
      //Return organized data
      return organize;
   }
}).factory('CalcDistance', function(Data) {
   //calculate teh difference between current location
   //and fetched location data
   //ROC location:
   $scope.lat = 34.019431;
   $scope.long = -118.494357;
})

//Rick factories below here ^O^/
