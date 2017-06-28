console.log('js');

var myApp = angular.module('myApp', ['ngRoute']);

//router to navigate throughout the app
myApp.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html',
    controller:'MyProfile as mp'
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

myApp.controller('LibraryController', function(LibraryService){
  console.log('LC');
  var vm = this;


  //Get searched title
  vm.searchForBook = function(search){
    console.log('in searchForBook');
    LibraryService.searchBook(search).then(function(bookSearched){
      console.log('bookSearched', bookSearched);
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then


  }; //end searchGif
}); //end LibraryController
