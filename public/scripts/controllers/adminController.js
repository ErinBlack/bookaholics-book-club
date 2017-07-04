//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService){
  console.log('in AdminController');
var vm = this;
  //Get searched title
  vm.searchForBook = function(search){
    console.log('in searchForBook');
    LibraryService.searchBook(search).then(function(bookSearched){
      console.log('bookSearched', bookSearched);
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook

}); //end AdminController
