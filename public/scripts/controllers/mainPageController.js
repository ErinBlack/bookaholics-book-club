myApp.controller('MainPageController', function($location,LoginService, LibraryService, CommentService, UserService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.comment = '';
  vm.iso = '';
  vm.user = '';
  vm.allMembers = [];



  vm.getUser = () => {
    vm.user = LoginService.getUser();
    console.log(vm.user);
    vm.getMembers();
  }; //end getRequests

  // // *****   Get All Books in DB   *****//
  // vm.prevBooks = () => {
  //   vm.savedBooks = [];
  //   LibraryService.prevBooks().then(function(savedBooks){
  //     vm.savedBooks = savedBooks.data;
  //     vm.futureReads(vm.savedBooks);
  //     vm.getMainComments();
  //   }); //end then
  // }; //end searchForBook
  //
  //
  // // *****   Determining if book is a FutureRead   *****//
  // vm.futureReads = (savedBooks) => {
  //   vm.iso = '';
  //   vm.futureReads = [];
  //   let today = new Date();
  //   vm.iso = today.toISOString();
  //   for (const value of savedBooks) {
  //     if (vm.iso < value.due_date){
  //       vm.futureReads.push(value);
  //     } //end if
  //   } //end for loop
  // }; //end futureReads

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
    console.log('in getMainComments');
    vm.mainComments = [];
    //get comments fromt main_feed DB
    CommentService.getMainComments().then(function(comments){

      vm.commentInfo = comments.data;
      console.log('vm.commentINfo', vm.commentInfo);
      for (const value of vm.commentInfo) {
        console.log('value', value);
        vm.memberId = value.user_id;
        console.log('vm.memberID',vm.memberId );
        console.log('vm.allMembers',vm.allMembers );
        vm.commentUser = vm.allMembers.find(user => user.user_id == vm.memberId);
        //object with comment data to snd
        console.log('vm.commentUser', vm.commentUser);
        vm.mainComment = {
          name: vm.commentUser.first_name + vm.commentUser.last_name,
          profileImage: vm.commentUser.profile_img,
          date: value.date,
          comment: value.comment
        };

        vm.mainComments.push(vm.mainComment);
        console.log('vm.mainComments', vm.mainComments);
      } //end for loop
    }); //end then
    console.log('leave getMainComments');
  }; //end addComments


  // *****   Getting All User Info  *****//
  vm.getMembers = () => {
    UserService.getMembers().then(function(allmembers){
      vm.allMembers = allmembers;
      vm.getMainComments();
      // vm.prevBooks();
    });
  }; //end getMembers



  // *****  Send Users to bookPage *****//
  vm.bookPage = (bookId) => {
    //Send selected book to LibraryService
    LibraryService.sendBookId(bookId);
    $location.path('/book/' + bookId);
  }; //end getBook




}); //end MainController
