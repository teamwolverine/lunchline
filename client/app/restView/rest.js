/* Handles controller code for main restaurant info */

myApp.controller('restCtrl', function($scope, Data, PostData) {

  $scope.restaurant = {
    id: '',
    name: '',
    category: '',
    lat: '',
    lng: '',
    rating: 0,
    price: 0,
    address: '',
    hours: '',
    waitTime: ''
  };

  if (!Data.clickedItem.id) {
    Data.clickedItem = JSON.parse(sessionStorage.tempStorage);
  }

  if (Data.clickedItem.id) {
    // Get data from clicked item
    var item = Data.clickedItem;

    $scope.restaurant.place_id = item.place_id;
    $scope.restaurant.name = item.name;

    var type = item.types;
    var capitalizedType = type.charAt(0).toUpperCase() + type.substring(1);

    $scope.restaurant.category = capitalizedType;
    $scope.restaurant.address = item.vicinity;
    $scope.restaurant.waitTime = item.wait;
    $scope.restaurant.lat = item.geometry.location.lat;
    $scope.restaurant.lng = item.geometry.location.lng;

    // Get restaurant rating and build string for star display
    $scope.restaurant.rating = item.rating;
    var whiteStar = String.fromCharCode(9734);
    var blackStar = String.fromCharCode(9733);
    var starArray = [];

    for (var i = 0; i < 5; i++) {
      starArray.push(whiteStar);
    }

    for (var i = 0; i < Math.round($scope.restaurant.rating); i++) {
      starArray.splice(i, 1, blackStar);
    }

    $scope.starString = starArray.join('');

    // Calculate Price And Convert to Dollar Signs
    var price = item.price_level;
    var dollarSigns = '';

    for (var i = 0; i < price; i++) {
      dollarSigns += '$';
    }

    $scope.restaurant.price = dollarSigns;

    // Change color of main indicator div based on wait time from database
    switch ($scope.restaurant.waitTime) {
      case '2_red':
        angular.element(document.querySelector('#currWait')).addClass('red');
        $scope.waitString = '> 30 Mins';
        break;
      case '1_yellow':
        angular.element(document.querySelector('#currWait')).addClass('yellow');
        $scope.waitString = '~ 20 Mins';
        break;
      case '0_green':
        angular.element(document.querySelector('#currWait')).addClass('green');
        $scope.waitString = '< 10 Mins';
        break;
      case '3_grey':
        angular.element(document.querySelector('#currWait')).addClass('googleBlue');
        $scope.waitString = 'not available';
        break;
    }
  } else { // No data loaded.  Load default values.
    angular.element(document.querySelector('#currWait')).addClass('googleBlue');
    $scope.waitString = 'not available';
  }

  // When a Check in Button is clicked, update the wait time on page and DB
  $scope.updateWait = function(wait) {
    console.log('Update Wait called : ', wait);

    var sendObj = {
      place_id: $scope.restaurant.place_id,
      wait: wait
    };

    updateWaitColorDiv(wait);
    PostData.updateWait(sendObj);
  };

  function updateWaitColorDiv(wait) {
    swal({
      html: '<p id="sweetAlert">Thanks for checking in!</p>',
      type: 'success',
      timer: 1500,
      width: 600,
      showConfirmButton: false
    });

    switch (wait) {
      case '2_red':
        angular.element(document.querySelector('#currWait')).removeClass('yellow');
        angular.element(document.querySelector('#currWait')).removeClass('green');
        angular.element(document.querySelector('#currWait')).removeClass('googleBlue');
        angular.element(document.querySelector('#currWait')).addClass('red');
        $scope.waitString = '> 30 Mins';
        break;
      case '1_yellow':
        angular.element(document.querySelector('#currWait')).removeClass('red');
        angular.element(document.querySelector('#currWait')).removeClass('green');
        angular.element(document.querySelector('#currWait')).removeClass('googleBlue');
        angular.element(document.querySelector('#currWait')).addClass('yellow');
        $scope.waitString = '~ 20 Mins';
        break;
      case '0_green':
        angular.element(document.querySelector('#currWait')).removeClass('yellow');
        angular.element(document.querySelector('#currWait')).removeClass('red');
        angular.element(document.querySelector('#currWait')).removeClass('googleBlue');
        angular.element(document.querySelector('#currWait')).addClass('green');
        $scope.waitString = '< 10 Mins';
        break;
    }
  }
});

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