//Library Controller to get books from Open Library API
myApp.controller('LibraryController', function(LibraryService){
  console.log('Inside Library Controller');
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
