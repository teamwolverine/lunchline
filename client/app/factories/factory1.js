myApp
.factory('Http', function($http) {
   function get(url) {
      // console.log('Get request');
    //Determine URL Address and insert here.
    return $http.get(url)
   }
   return {
    get : get
   }
}).factory('Data', function(Http) {
   //Using the Http factory, fetch the data.
   var getPromise;
   function delay(){
      // console.log('Assigning promise');
      getPromise = Http.get('/api');
   }
   function fetchData(){
      // console.log('Returning promise');
      return getPromise;
   }

   var getData = function () {
      delay();
      return fetchData()
      .then(function(data) {
         var filePath = data.data;
         return filePath.map(function(restaurant) {
            return {
               restaurant: restaurant
               }
            })
         })
      };

   // var clickedItem = function (obj) {
   //    return obj;
   // }
   var clickedItem = {};
   return {
      getData : getData,
      clickedItem : clickedItem
   }
}).factory('CalcDistance', function(Data) {
   //calculate teh difference between current location
   //and fetched location data
   //ROC location:
   $scope.lat = 34.019431;
   $scope.long = -118.494357;
})




//Rick factories below here ^O^/
.factory('PostData', function() {

  function updateWait() {

    // PUT
    // /api/update (wait, place_id)

  }

  return {
    updateWait: updateWait
  };
});
