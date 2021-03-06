myApp.controller('MainPageController', function($location, LoginService, LibraryService, CommentService, UserService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  vm.mainComments = [];
  vm.iso = '';
  vm.user = '';
  vm.allMembers = [];
  const today = new Date();
  vm.iso = today.toISOString();

  vm.getUser = () => {
    console.log('in get user');
    vm.user = LoginService.getUser();
    console.log('vm.user',vm.user);
    vm.getMembers();
  }; //end getRequests


  // *****   Submitting a Main Comment to Thread   *****//
  vm.addMainComment = (comment) => {
    console.log('in addMainComment');
    console.log('vm.user.userId', vm.user.userId);
    console.log('vm.user.userId', vm.iso);
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
    console.log('leaving addMainComment');
  }; //end addComments

  // *****   Getting Comments for Main Thread  *****//
  vm.getMainComments= (comment) => {
    console.log('in getMainComments');
    vm.mainComments = [];
    //get comments fromt main_feed DB
    CommentService.getMainComments().then(function(comments){
      vm.commentInfo = comments.data;
      for (const value of vm.commentInfo) {
        vm.memberId = value.user_id;
        vm.commentUser = vm.allMembers.find(user => user.user_id == vm.memberId);
        //object with comment data to snd
        vm.mainComment = {
          name: vm.commentUser.first_name + ' ' + vm.commentUser.last_name,
          profileImage: vm.commentUser.profile_img,
          date: value.date,
          comment: value.comment
        };
        vm.mainComments.push(vm.mainComment);
      } //end for loop
    }); //end then
    console.log('leave getMainComments');
  }; //end addComments


  // *****   Getting All User Info  *****//
  vm.getMembers = () => {
    console.log('in getMembers');
    UserService.getMembers().then(function(allmembers){
      vm.allMembers = allmembers;
      vm.getMainComments();
      // vm.prevBooks();
    });
    console.log('leaving getMembers');
  }; //end getMembers








}); //end MainController
