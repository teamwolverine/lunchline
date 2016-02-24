var myApp = angular.module('lunchline', ['ui.router', 'ui.bootstrap', 'mobile-angular-ui', 'ngMap', 'angular-loading-bar'])
//UI router setup
.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('listView', {
      url: '/',
      templateUrl: './app/listView/list.html',
      controller: 'listCtrl'
   })
   .state('restView', {
      url: '/restView',
      templateUrl: './app/restView/rest.html',
      controller: 'restCtrl'
   })
})
.config(function($urlRouterProvider) {
   $urlRouterProvider.otherwise('/');
});
