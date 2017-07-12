myApp.controller('BookController', function($routeParams, LibraryService, LoginService, UserService, BookCommentService){
  console.log('OMERGD!', $routeParams.id);
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.comment = '';
  const today = new Date();
  vm.iso = today.toISOString();
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
    vm.futureReads = [];
    for (const value of savedBooks) {
      if (vm.iso < value.due_date){
        vm.futureReads.push(value);
      } //end if
    } //end for loop
  }; //end futureReads

  // *****   Getting Info for Book page Book  *****//
  vm.getBookInfo = () => {
    vm.bookPageBook = [];
    vm.savedBooks = LibraryService.allBooks();
    vm.bookPageId = LibraryService.getBookId();
    for (const value of vm.savedBooks.data) {
      if ($routeParams.id == value.book_id){
        console.log(value);
        vm.bookPageBook.push(value);
      } //end if
    } //end for loop
  }; // end getBookInfo


  // *****   Submitting to Book Comment to Thread   *****//
  vm.addBookComment = (comment) => {
    console.log('in add book comment');
    //comment object to send
    vm.commentToSend = {
      userId: vm.user.userId,
      bookId: $routeParams.id,
      date: vm.iso,
      comment: comment
    };
    //send comment to CommentService to Post to DB
    BookCommentService.addBookComment(vm.commentToSend).then(function(response){
      vm.getBookComments();
    }); //end then
    vm.comment = '';
  }; //end addComments


}); // end BookController
