myApp.controller('BookPageController', function($routeParams, $location, LibraryService, LoginService, UserService, BookCommentService){
  let vm = this;

  vm.savedBooks = LibraryService.savedBooks.data;
  vm.futureReads = [];
  vm.savedBooks = [];
  vm.bookComments = [];
  vm.bookPageBook = [];
  vm.comment = '';
  const today = new Date();
  vm.iso = today.toISOString();
  vm.user = '';
  vm.bookPageId = $location.$$url.slice(6);
  let bookId = $routeParams.id;
  vm.allMembers = [];
  // *****   Getting All User Info  *****//
  vm.getMembers = () => {
    UserService.getMembers().then(function(allmembers){
      vm.allMembers = allmembers;
      // vm.getBookComments();
    });
  }; //end getMembers

  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    console.log('in getUser');
    vm.user = LoginService.user;
    vm.getBooks();
    vm.getMembers();
      console.log('leaving getUser');
  }; //end getRequests


  // *****   Get All Books in DB   *****//
  vm.getBooks = () => {
    console.log('in getBooks');
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      vm.savedBooks = savedBooks.data;
      console.log('vm.savedBooks',vm.savedBooks);
      vm.getBookInfo();
      // vm.getBookInfo();
    }); //end then
    console.log('leaving getBooks');

  }; //end searchForBook


  // *****   Getting Info for Book page Book  *****//
  vm.getBookInfo = () => {
    console.log('in getBookInfo');
    vm.bookPageBook = [];
    for (const value of vm.savedBooks) {
      if (vm.bookPageId == value.book_id){
        vm.bookPageBook.push(value);
      } //end if
    } //end for loop
    vm.getBookComments();
    console.log('leaving getBookInfo');
  }; // end getBookInfo


  // *****   Submitting to Book Comment to Thread   *****//
  vm.addBookComment = (comment) => {
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
    //get comments fromt main_feed DB
    BookCommentService.getBookComments(bookId).then(function(comments){
      console.log('commnets', comments);
      vm.parseComments(comments);
    }); //end then
  }; //end getComments

  // *****   Parse Comments to get only for this page   *****//
  vm.parseComments = (comments) =>{
    vm.bookComments = [];
    vm.commentInfo = comments.data;
    //for loop to parse out comment data and choose only for bookPage
    for (const value of vm.commentInfo) {

      //see if comment id matches book page id
      if(value.book_id == bookId){
        console.log('in if');
        vm.memberId = value.user_id;
        vm.commentUser = vm.allMembers.find(user => user.user_id === vm.memberId);
        //object with comment data to snd
        vm.commentToSend = {
          name: vm.commentUser.first_name + vm.commentUser.last_name,
          profileImage: vm.commentUser.profile_img,
          date: value.date,
          comment: value.comment
        };
        console.log('vm.commentToSend',vm.commentToSend );
        vm.bookComments.push(vm.commentToSend);
      }
      else{
        console.log('no matching comments');
      }
    } //end for loop
    console.log('vm.bookComments', vm.bookComments);
  }; //end parseComments

  // *****  Send Users to bookPage *****//
  vm.bookPage = (bookId) => {
    //Send selected book to LibraryService
    LibraryService.sendBookId(bookId);
    $location.path('/book/' + bookId);
  }; //end getBook


});//end bookpageController
