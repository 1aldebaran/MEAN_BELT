var app = angular.module('app', ['ngRoute', 'ngCookies', 'angular-momentjs'])

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : 'partials/reg_log.html',
    controller : 'UsersController as UC'
  })
  .when('/dashboard', {
    templateUrl : 'partials/dashboard.html',
    controller : 'UsersController as UC'
  })
  .when('/profile/:id', {
    templateUrl : 'partials/userProfile.html',
    controller : 'UsersController as UC'
  })
  .when('/create', {
    templateUrl : 'partials/newPoll.html',
    controller : 'UsersController as UC'
  })
  .when('/poll/:id', {
    templateUrl : 'partials/showPoll.html',
    controller : 'UsersController as UC'
  })
  .otherwise({
    redirectTo : '/'
  })
})
