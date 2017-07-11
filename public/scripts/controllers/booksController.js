myApp.controller('BookController', function(LibraryService, LoginService){
var vm = this;
vm.savedBooks = [];
vm.futureReads = [];
vm.iso = '';
vm.bookPageBook = [];
vm.user = LoginService.getUser();

// *****   Get All Books in DB   *****//
vm.getBooks = () => {
  console.log('in getBooks');
  vm.savedBooks = [];
  LibraryService.prevBooks().then(function(savedBooks){
    vm.savedBooks = savedBooks.data;
    vm.futureReads(vm.savedBooks);
  }); //end then
}; //end searchForBook


// *****   Determining if book is a FutureRead   *****//
vm.futureReads = (savedBooks) => {
  vm.iso = '';
  vm.futureReads = [];
  let today = new Date();
  vm.iso = today.toISOString();
  for (const value of savedBooks) {
    if (vm.iso < value.due_date){
      vm.futureReads.push(value);
    } //end if
  } //end for loop
}; //end futureReads


vm.getBookInfo = () => {
  console.log('in getBookInfo');
  vm.books = LibraryService.allBooks();
  console.log('books',   vm.books);
  vm.bookPageId = LibraryService.getBookId();
  for (const value of vm.books.data) {
    if (vm.bookPageId == value.book_id){
      vm.bookPageBook.push(value);
    } //end if
  } //end for loop
  console.log('bookPageBook',vm.bookPageBook );
}


}); // end BookController
