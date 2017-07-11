myApp.controller('BookController', function(LibraryService, LoginService){
var vm = this;
vm.savedBooks = [];
vm.futureReads = [];
vm.iso = '';
vm.bookId = 0;
vm.user = LoginService.getUser();

// *****   Get All Books in DB   *****//
vm.prevBooks = () => {
  console.log('in prevBooks');
  vm.savedBooks = [];
  LibraryService.prevBooks().then(function(savedBooks){
    vm.savedBooks = savedBooks.data;
    vm.futureReads(vm.savedBooks);
  }); //end then
}; //end searchForBook


// *****   Determining if book is a FutureRead   *****//
vm.futureReads = (savedBooks) => {
    console.log('in futureReads');
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



}); // end BookController
