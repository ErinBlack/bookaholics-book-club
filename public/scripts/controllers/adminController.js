//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, $http){
  console.log('in AdminController');
var vm = this;
vm.user = LoginService.getUser();
console.log('vm.user info',vm.user);
  //Get searched title
  vm.searchForBook = function(search){
    console.log('in searchForBook');
    LibraryService.searchBook(search).then(function(bookSearched){
      console.log('bookSearched', bookSearched);
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook

  //get member request
  vm.getRequests = function(){
    console.log('in getRequests');
    $http.get('/admin/requests').then(function(data){
      console.log('back from the /requests with', data);
    });
  }; //end getRequests
}); //end AdminController
