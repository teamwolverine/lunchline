//Retrieve information from the server and serve it in HTML.
angular.module('lunchline', [])
.controller('listCtrl', function($scope, Data) {
Data.getData()
.then(function(fetchedData) {
   $scope.list = Data.filterData(fetchedData);
});



/*.controller('miniSprintCtrl', function($scope, State){
  State.getData()
    .then(function(redditData){
      var mappedData = State.mapData(redditData);
      $scope.redditPosts = State.sortRedditPosts(mappedData);;
    })
});*/
