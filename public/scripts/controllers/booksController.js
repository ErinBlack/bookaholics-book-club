myApp.controller('BookController', function($routeParams, LibraryService, LoginService, UserService, BookCommentService){
  console.log('OMERGD!', $routeParams.id);
  let vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.bookComments = [];
  vm.comment = '';
  const today = new Date();
  vm.iso = today.toISOString();
  vm.user = '';
  vm.bookPageBook = {};
  let bookId = $routeParams.id;
  vm.allMembers = [];

  // *****   Getting All User Info  *****//
  vm.getMembers = () => {
    UserService.getMembers().then(function(allmembers){
      vm.allMembers = allmembers;
      console.log('vm.allMembers', vm.allMembers);
      vm.getBookComments();
    });
  }; //end getMembers

  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    vm.user = LoginService.user;
    vm.getBooks();
    vm.getMembers();
  }; //end getRequests


  // *****   Get All Books in DB   *****//
  vm.getBooks = () => {
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
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
    for (const value of vm.savedBooks.data) {
      if (bookId == value.book_id){
        console.log(value);
        vm.bookPageBook.push(value);
      } //end if
    } //end for loop
    vm.getBookComments();
  }; // end getBookInfo


  // *****   Submitting to Book Comment to Thread   *****//
  vm.addBookComment = (comment) => {
    console.log('bookId', bookId);
    //comment object to send
    vm.commentToSend = {
      userId: vm.user.userId,
      bookId: bookId,
      date: vm.iso,
      comment: comment
    };
    //send comment to CommentService to Post to DB
    BookCommentService.addBookComment(vm.commentToSend).then(function(response){
      vm.getBookComments();
    }); //end then
    vm.comment = '';
  }; //end addComments

  // *****   Get Book Comment Thread   *****//
  vm.getBookComments = () => {
    console.log('in getBookComments with:', vm.allMembers );
    //get comments fromt main_feed DB
    BookCommentService.getBookComments(bookId).then(function(comments){
      vm.parseComments(comments);
    }); //end then
  }; //end getComments

  // *****   Parse Comments to get only for this page   *****//
  vm.parseComments = (comments) =>{
    console.log('in parseComments');
    vm.bookComments = [];
    vm.commentInfo = comments.data;
    //for loop to get the comments belonging to this book page
    for (const value of vm.commentInfo) {
      if(value.book_id == bookId){
        // vm.commentUser = vm.allUsers.find(user => vm.allUsers.user_id === value.user_id);
        // console.log('vm.commentUser', vm.commentUser);
        console.log('IN IF STATEMENT');
        //object with comment and user data to send
        vm.commentToDisplay = {
          // name: vm.commentUser.first_name + vm.commentUser.last_name,
          // profileImage: vm.commentUser.profile_img,
          date: value.date,
          comment: value.comment
        };
        vm.bookComments.push(vm.commentToDisplay);
      }
    } //end for loop
    console.log('bookComments', vm.bookComments);
  }; //end parseComments



}); // end BookController
