var myApp = angular.module('lunchline', ['ui.router', 'ui.bootstrap', 'mobile-angular-ui', 'ngMap', 'angular-loading-bar'])
//UI router setup
.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('restView', {
      url: '/restView',
      templateUrl: './app/restView/rest.html',
      controller: 'restCtrl'
   })
   .state('listView', {
      url: '/',
      templateUrl: './app/listView/list.html',
      controller: 'listCtrl'
   });
   $urlRouterProvider.otherwise('/');
})
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);