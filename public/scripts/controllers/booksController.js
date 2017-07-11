myApp.controller('BookController', function(LibraryService, LoginService){
var vm = this;
vm.savedBooks = [];
vm.futureReads = [];
vm.iso = '';
vm.user = LoginService.getUser();

// *****   Get All Books in DB   *****//
vm.getBooks = () => {
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
  vm.bookPageId = LibraryService.getBookId();
  console.log('vm.bookPageId', vm.bookPageId);
}


}); // end BookController
