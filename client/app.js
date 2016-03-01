var myApp = angular.module('lunchline', ['ui.router', 'mobile-angular-ui', 'ngMap', 'angular-loading-bar'])
//UI router setup
.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('restView', {
      url: '/restaurant',
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
// Remove spinner in top left corner from angular loading bar
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);