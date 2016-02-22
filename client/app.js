var myApp = angular.module('lunchline', ['ui.router', 'ui.bootstrap'])
//UI router setup
.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('home', {
      url: '/home',
      templateUrl: './app/listView/list.html',
      controller: 'listCtrl'
   })
   .state('restView', {
      url: '/restView',
      templateUrl: './app/restView/rest.html'
   })
   .state('listView', {
      url: '/listView',
      templateUrl: './app/listView/list.html',
      controller: 'listCtrl'
   })
});
