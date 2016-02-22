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
        $scope.list = fetchedData.data;

        $scope.restaurant.name = $scope.list[0].name;
        $scope.restaurant.category = $scope.list[0].types[0];
        $scope.restaurant.rating = $scope.list[0].rating;
        $scope.restaurant.address = $scope.list[0].vicinity;
        $scope.restaurant.waitTime = $scope.list[0].wait;

        var price = $scope.list[0].price_level;
        var dollarSigns = '';

        for (var i = 0; i <  price; i++) {
          dollarSigns+='$';
        }

        $scope.restaurant.price = dollarSigns;

        switch($scope.restaurant.waitTime) {
          case 'red':
            $scope.waitColor = 'background-color: red';
            break;
          case 'yellow':
            break;
          case 'green':
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


