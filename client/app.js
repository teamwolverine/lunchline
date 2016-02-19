angular.module('Lunchline', ['ui.router'])
//UI router setup
.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('home', {
      url: '/index' //Might be wrong, not sure.
   })
   .state('example', {
      url: '/example',
      templateUrl: '/example/example.html'
   })
})
//Main index behavior
.controller('pingServer', function($scope, $http) {
   $http.get()
   .then(function(resp){
      //Do something with data from pingedServer
   });
});
