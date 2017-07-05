

var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

//router to navigate throughout the app
myApp.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html',
    controller:'LoginController as lc'
  }).when('/register', {
    templateUrl: 'views/partials/register.html',
    controller:'RegisterController as rc'
  }).when('/admin', {
    templateUrl: 'views/partials/admin.html',
    controller:'AdminController as ac'
  }).when('/book', {
    templateUrl: 'views/partials/book.html',
    controller:'BookController as bc'
  }).when('/edit-profile', {
    templateUrl: 'views/partials/editProfile.html',
  }).when('/main', {
    templateUrl: 'views/partials/main.html',
    controller:'LoginController as lc'
  }).otherwise({ redirectTo: '/'});
}); //end config
