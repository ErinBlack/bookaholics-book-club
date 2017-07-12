myApp.controller('MainPageController', function($location,LoginService, LibraryService, CommentService, UserService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.comment = '';
  vm.iso = '';
  vm.user = '';
  vm.allMembers = [];

  // // *****   Functions to load on init   *****//
  // vm.init = () => {
  //   vm.getMembers();
  //   vm.getUser();
  //   vm.prevBooks();
  //   vm.getMainComments();
  // }; //end vm.init

  vm.getUser = () => {
    vm.user = LoginService.getUser();
    vm.getMembers();
  }; //end getRequests

  // *****   Get All Books in DB   *****//
  vm.prevBooks = () => {
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      vm.savedBooks = savedBooks.data;
      vm.futureReads(vm.savedBooks);
      vm.getMainComments();
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
    //get comments fromt main_feed DB
    CommentService.getMainComments().then(function(comments){

      vm.commentInfo = comments.data;
      for (const value of vm.commentInfo) {
        vm.memberId = value.user_id;
        vm.commentUser = vm.allMembers.find(user => user.user_id === vm.memberId);
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


  // *****   Getting All User Info  *****//
  vm.getMembers = () => {
    UserService.getMembers().then(function(allmembers){
      vm.allMembers = allmembers;
      console.log('vm.allMembers', vm.allMembers);
      vm.prevBooks();
    });
  }; //end getMembers




  vm.bookPage = (bookId) => {
    //Send selected book to LibraryService
    LibraryService.sendBookId(bookId);
    $location.path('/book/' + bookId);
  }; //end getBook


}); //end MainController
