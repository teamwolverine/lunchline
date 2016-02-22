//Retrieve information from the server and serve it in HTML.
myApp
.controller('listCtrl', function($scope, Data) {
   $scope.data = [];
   $scope.restInfo = function () {
      Data.getData()
      .then(function(fetchedData) {
         $scope.data = fetchedData;
      })
   }
   $scope.restInfo();
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
      console.log('Factory data: ', Data.clickedItem);
   }
});
