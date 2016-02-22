myApp
// .factory('HttpRequest', function($http){
//   function get(url) {
//     return $http.get(url);
//   }
//   return {
//     get : get
//   }
// })
// .factory('State', function(HttpRequest){
//   var getPromise;
//   function init(url){
//     getPromise = HttpRequest.get(url)
//   }
//   function getData(){
//     return getPromise;
//   }
.factory('Http', function($http) {
   function get(url) {
      console.log('Get request');
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
      console.log('Assigning promise');
      getPromise = Http.get('/api');
   }
   function fetchData(){
      console.log('Returning promise');
      return getPromise;
   }

   var getData = function () {
      delay();
      console.log("Get Data yo!");
      return fetchData()
      .then(function(data) {
         console.log('This is raw data: ', data);
         var filePath = data;

         return data;

         // return filePath.map(function(restaurant) {
         //    return {
         //       name: restaurant.name, //This filepath could change!!!
         //       color: restaurant.color //This filepath could change!!!
         //    }
         // })
      })
   };
      return {
         getData : getData
      }
}).factory('CalcDistance', function(Data) {
   //calculate teh difference between current location
   //and fetched location data
   //ROC location:
   $scope.lat = 34.019431;
   $scope.long = -118.494357;
})




//Rick factories below here ^O^/
.factory('FocusedRestaurant', function() {
  function getFocusedRestaurant(data) {
    data = 'test data';
    console.log('Get Focused Restaurant called');
    return data;
  }

  return {
    getFocusedRestaurant: getFocusedRestaurant
  };
});