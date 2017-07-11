myApp.controller('MainController', function(LoginService, LibraryService, CommentService, UserService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.comment = '';
  vm.iso = '';

  // *****   Functions to load on init   *****//
  vm.init = () => {
    vm.getMembers();
    vm.getUser();
    vm.prevBooks();
    vm.getMainComments();
  }; //end vm.init

  // *****   Get All Books in DB   *****//
  vm.prevBooks = () => {
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

  // *****   Submitting a Main Comment to Thread   *****//
  vm.addMainComment = (comment) => {
    //comment object to send
    vm.commentToSend = {
      userId: vm.user.userId,
      date: vm.iso,
      comment: comment
    };
    //send comment to CommentService to Post to DB
    CommentService.addMainComment(vm.commentToSend).then(function(response){
      vm.getMainComments();
    }); //end then
    vm.comment = '';
  }; //end addComments

  // *****   Getting Comments for Main Thread  *****//
  vm.getMainComments= (comment) => {
    vm.mainComments = [];
    console.log('in getMainComments');
    //get comments fromt main_feed DB
    CommentService.getMainComments().then(function(comments){

      vm.commentInfo = comments.data;
      console.log('back from getComments with:', vm.commentInfo);
      for (const value of vm.commentInfo) {
        vm.memberId = value.user_id;
        vm.commentUser = vm.allUsers.find(user => user.user_id === vm.memberId);
        //object with comment data to snd
        vm.commentToSend = {
          name: vm.commentUser.first_name + vm.commentUser.last_name,
          profileImage: vm.commentUser.profile_img,
          date: value.date,
          comment: value.comment
        };

        vm.mainComments.push(vm.commentToSend);
      } //end for loop
    }); //end then
  }; //end addComments


  // *****   Getting all members  *****//
  vm.getMembers = () => {
    vm.allUsers = UserService.getMembers();
    console.log('allUsres', vm.allUsers);
  }; //end getRequests

  vm.getUser = () => {
    vm.user = LoginService.getUser();
    console.log('user', vm.user);
  }; //end getRequests


  vm.bookPage = (bookId) => {
    console.log('in getBook');
    console.log('bookId', bookId);
    //Send selected book to LibraryService
    LibraryService.getBook(bookId).then(function(bookInfo){
      vm.bookInfo = bookInfo.data;

    }); //end then
  }; //end getBook


}); //end MainController
