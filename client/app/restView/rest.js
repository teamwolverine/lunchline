/* Handles controller code for main restaurant info */

myApp.controller('restCtrl', function($scope, Data, FocusedRestaurant) {

    $scope.restaurant = {
      name: '',
      category : '',
      rating :  0,
      price : 0,
      address : '',
      hours : '',
      waitTime : ''
    };


    // Test function to get grab first restaurant from database
    Data.getData()
      .then(function(fetchedData) {
        console.log('++GOT DATA,', fetchedData);
        $scope.list = fetchedData;

        $scope.restaurant.name = $scope.list[0].restaurant.name;
        $scope.restaurant.category = $scope.list[0].restaurant.types[0];
        $scope.restaurant.rating = $scope.list[0].restaurant.rating;
        $scope.restaurant.address = $scope.list[0].restaurant.vicinity;
        $scope.restaurant.waitTime = $scope.list[0].restaurant.wait;

        var price = $scope.list[0].restaurant.price_level;
        var dollarSigns = '';

        for (var i = 0; i <  price; i++) {
          dollarSigns+='$';
        }

        $scope.restaurant.price = dollarSigns;
        console.log($scope.restaurant.waitTime);

        switch($scope.restaurant.waitTime) {
          case 'red':;
            angular.element(document.querySelector('#currWait')).addClass('red');
            $scope.waitString = '> 1 Hour';
            break;
          case 'yellow':
            angular.element(document.querySelector('#currWait')).addClass('yellow');
            break;
          case 'green':
            angular.element(document.querySelector('#currWait')).addClass('green');
            break;
        }

      });

    // $scope.getFocused = function() {
    //   FocusedRestaurant.getFocusedRestaurant().then(function(data) {
    //     console.log(data);
    //   });
    // }

    $scope.getFocused = FocusedRestaurant.getFocusedRestaurant();

    console.log($scope.getFocused);
  });


