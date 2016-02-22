//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function($scope, Data) {
   $scope.data = [];
   $scope.restInfo = function () {
      Data.getData()
      .then(function(fetchedData) {
         $scope.data = fetchedData;
         console.log('Ctrl Data Length: ' + $scope.data.length);
      })
   }
   $scope.restInfo();
});
