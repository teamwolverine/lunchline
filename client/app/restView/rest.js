/* Handles controller code for main restaurant info */

myApp.controller('restCtrl', function($scope, Data, PostData) {
  console.log('L4 Rest.js Restview Called');

    $scope.restaurant = {
      id: '',
      name: '',
      category : '',
      lat: '',
      lng: '',
      rating :  0,
      price : 0,
      address : '',
      hours : '',
      waitTime : ''
    };

    if (Data.clickedItem.id) {
      // Get data from clicked item
      $scope.restaurant.place_id = Data.clickedItem.place_id;
      $scope.restaurant.name = Data.clickedItem.name;
      $scope.restaurant.category = Data.clickedItem.types[0];
      $scope.restaurant.address = Data.clickedItem.vicinity;
      $scope.restaurant.waitTime = Data.clickedItem.wait;
      $scope.restaurant.lat = Data.clickedItem.geometry.location.lat;
      $scope.restaurant.lng = Data.clickedItem.geometry.location.lng;

      // Get restaurant rating and build string for star display
      $scope.restaurant.rating = Data.clickedItem.rating;
      var whiteStar = String.fromCharCode(9734);
      var blackStar = String.fromCharCode(9733);
      var starArray = [];

      for (var i = 0; i < 5; i++) {
        starArray.push(whiteStar)
      }

      for (var i = 0; i < Math.round($scope.restaurant.rating); i++) {
        starArray.splice(i, 1, blackStar);
      }

      $scope.starString = starArray.join('');

      // Calculate Price And Convert to Dollar Signs
      var price = Data.clickedItem.price_level;
      var dollarSigns = '';

      for (var i = 0; i <  price; i++) {
        dollarSigns+='$';
      }

      $scope.restaurant.price = dollarSigns;

      // Change color of main indicator div based on wait time from database
      switch($scope.restaurant.waitTime) {
        case 'red':;
          angular.element(document.querySelector('#currWait')).addClass('red');
          $scope.waitString = '> 45 Mins';
          break;
        case 'yellow':
          angular.element(document.querySelector('#currWait')).addClass('yellow');
          $scope.waitString = '10 - 45 Mins';
          break;
        case 'green':
          angular.element(document.querySelector('#currWait')).addClass('green');
          $scope.waitString = '< 10 Mins';
          break;
      }
    }

    $scope.updateWait = function(wait) {
      console.log('Update Wait called : ', wait);

      var sendObj = {
        place_id: $scope.restaurant.place_id,
        wait: wait
      }

      PostData.updateWait(sendObj);
    }

    // Test function to get grab first restaurant from database
    // Data.getData()
    //   .then(function(fetchedData) {
    //     console.log('++GOT DATA,', fetchedData);
    //     $scope.list = fetchedData;

    //     $scope.restaurant.name = $scope.list[0].restaurant.name;
    //     $scope.restaurant.category = $scope.list[0].restaurant.types[0];
    //     $scope.restaurant.rating = $scope.list[0].restaurant.rating;
    //     $scope.restaurant.address = $scope.list[0].restaurant.vicinity;
    //     $scope.restaurant.waitTime = $scope.list[0].restaurant.wait;

    //     console.log($scope.restaurant.waitTime);

    //     switch($scope.restaurant.waitTime) {
    //       case 'red':;
    //         angular.element(document.querySelector('#currWait')).addClass('red');
    //         $scope.waitString = '> 1 Hour';
    //         break;
    //       case 'yellow':
    //         angular.element(document.querySelector('#currWait')).addClass('yellow');
    //         break;
    //       case 'green':
    //         angular.element(document.querySelector('#currWait')).addClass('green');
    //         break;
    //     }
    // });

    // $scope.getFocused = function() {
    //   FocusedRestaurant.getFocusedRestaurant().then(function(data) {
    //     console.log(data);
    //   });
    // }

  });
