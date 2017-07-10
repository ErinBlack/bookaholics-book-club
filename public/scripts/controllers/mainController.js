myApp.controller('MainController', function(LoginService, LibraryService, CommentService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.iso = '';
  //getting logged in user info from LoginService
  vm.user = LoginService.getUser();

  // *****   Get All Books in DB   *****//
  vm.prevBooks = () => {
    console.log('in prevBooks');
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      vm.savedBooks = savedBooks.data;
      console.log('prevBooks', vm.savedBooks);
      vm.futureReads(vm.savedBooks);
    }); //end then


  }; //end searchForBook


// *****   Determining if book is a FutureRead   *****//
  vm.futureReads = (savedBooks) => {
    vm.iso = '';
    vm.futureReads = [];
    console.log('in futureReads');
    let today = new Date();
    vm.iso = today.toISOString();
    console.log('today', today);
    console.log('vm.savedBooks', savedBooks);

    for (const value of savedBooks) {
      console.log('value due date', value.due_date);
      if (vm.iso < value.due_date){
        vm.futureReads.push(value);
      } //end if
    } //end for loop
    console.log(vm.futureReads);
  }; //end futureReads

  // *****   Submitting a Main Comment to Thread   *****//
    vm.addComment= (comment) => {
      console.log('in addComment');
      console.log('userId', vm.user);
      console.log('comment', comment);
      //comment object to send
      vm.commentToSend = {
        userId: vm.user.userId,
        date: vm.iso,
        comment: comment
      };
        //send comment to CommentService to Post to DB
      CommentService.addComment(vm.commentToSend).then(function(response){
        console.log('back from addComment', response);
        vm.comment = '';
      }); //end then
    }; //end addComments


}); //end MainController
