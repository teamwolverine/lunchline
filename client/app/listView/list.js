//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function($scope, Http, Data) {
   console.log('listCtrl called');
   $scope.getData = function (url) {

   }



   $scope.data = {};
   $scope.restInfo = function () {
      Data.getData()
      .then(function(fetchedData) {
         console.log('This is the organized data: ', fetchedData);
         $scope.data.list = fetchedData;
      })
   }
   $scope.restInfo();
});


/*.controller('miniSprintCtrl', function($scope, State){
  State.getData()
    .then(function(redditData){
      var mappedData = State.mapData(redditData);
      $scope.redditPosts = State.sortRedditPosts(mappedData);;
    })
});*/
