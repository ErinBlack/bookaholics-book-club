 

var myApp = angular.module('myApp', ['ngRoute']);

//router to navigate throughout the app
myApp.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html',
    controller:'LoginController as lc'
  }).when('/register', {
    templateUrl: 'views/partials/register.html',
  }).when('/admin', {
    templateUrl: 'views/partials/admin.html',
  }).when('/book', {
    templateUrl: 'views/partials/book.html',
  }).when('/edit-profile', {
    templateUrl: 'views/partials/editProfile.html',
  }).when('/main', {
    templateUrl: 'views/partials/main.html',
  }); //end submit
}); //end config
