/* Handles controller code for main restaurant info */

myApp.controller('restCtrl', function($scope, Data, PostData) {

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

    Data.clickedItem = {
         "wait" : "red",
         "geometry" : {
            "location" : {
               "lat" : 34.017917,
               "lng" : -118.4892147
            }
         },
         "id" : "73a9771ad9e10b6b50763f9332d81e5a90734f52",
         "name" : "Bay Cities Italian Deli & Bakery",
         "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 3264,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/115315553077382023272/photos\"\u003eMelanie Galuten\u003c/a\u003e"
               ],
               "photo_reference" : "CmRdAAAATx7w5dBqSdLWt5QTpyXGE3TlAghips8m-gstnvLipIxe82Jd0bgWRMyquVaOVM06aHpB7xd9Nq18iSL3WqeOYAJXn3EpruO9OyVGZ2QalaSnXy_b1GJbinjxJEMFBRlxEhDp6O8RvJCqZH5rfE5mtZxAGhSX4oSSSBMSYBNxotjF3O0t8uklsw",
               "width" : 2448
            }
         ],
         "place_id" : "ChIJ9_90dc2kwoARcBMb3bHJqpc",
         "price_level" : 1,
         "rating" : 4.3,
         "reference" : "CoQBdAAAAMjol9rrPD_xwI3FNoCBGLFU2xe_Ns0x0ZwTwTqfFXj6cg-lNG_epsHpuatKxZtyESUE05sINlDkyNR0cyz_vBVC9Ay0lqKlDrrcvvD15gDAE4pHYUr50RbSsB4njjMKKvaIv7kSWoYkl6qnXc09wygOsaRFsrL_66mBY2gc3U_zEhDYGqNUccEGUrcezQtEPkiDGhRjYzNDIc8ddWKnuN7mubOEgnH-Zg",
         "scope" : "GOOGLE",
         "types" : [
            "bakery",
            "restaurant",
            "liquor_store",
            "store",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "vicinity" : "1517 Lincoln Boulevard, Santa Monica"
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
