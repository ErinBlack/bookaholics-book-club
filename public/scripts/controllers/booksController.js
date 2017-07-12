myApp.controller('BookController', function($routeParams, LibraryService, LoginService, UserService){
  console.log('OMERGD!', $routeParams.id);
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.comment = '';
  vm.iso = '';
  vm.user = '';
  vm.bookPageBook = {};

  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    vm.user = LoginService.user;
    console.log('user', vm.user);
    vm.getBooks();
  }; //end getRequests


  // *****   Get All Books in DB   *****//
  vm.getBooks = () => {
    console.log('in getBooks');
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      console.log('savedBooks', savedBooks);
      vm.savedBooks = savedBooks.data;
      vm.futureReads(vm.savedBooks);
      vm.getBookInfo();
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
    vm.bookPageBook = [];
    console.log('in getBookInfo');
    vm.savedBooks = LibraryService.allBooks();
    vm.bookPageId = LibraryService.getBookId();
    console.log('saveBooks',   vm.bookPageId);
    console.log('saveBooks',   vm.savedBooks);
    for (const value of vm.savedBooks.data) {
      console.log('value.book_id', value.book_id);
      if ($routeParams.id == value.book_id){
        console.log(value);
        vm.bookPageBook.push(value);
      } //end if
    } //end for loop
    console.log('vm.bookpageBOok', vm.bookPageBook);
  }; // end getBookInfo



}); // end BookController
