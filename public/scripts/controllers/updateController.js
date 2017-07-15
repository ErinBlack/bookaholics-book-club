myApp.controller('UpdateController', function($location, UpdateService, LoginService, LibraryService){
  console.log('in UpdateController');
  var vm = this;
  var client = filestack.init('ARe83u3xXQw2imhkEvE0Cz');
  vm.imgUpload = '';
  vm.user = {};
  vm.futureReads = [];
  vm.savedBooks = [];

  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    // console.log('in getUser in updateController');
    vm.user = LoginService.getUser()
      console.log('vm.user in update', vm.user);
      vm.getBooks();

  }; //end getUser

  vm.refreshUser = () => {
    // console.log('in getUser in updateController');
    vm.user = LoginService.getUser();
      console.log('vm.user in refreshUser', vm.user);
  }; //end getUser

  // *****  Get Updated User Info *****//
  vm.getUpdatedInfo = () => {
    // console.log('updateUser', vm.user);
      vm.updateToSend = {
        firstName: vm.user.firstName,
        lastName: vm.user.lastName,
        email: vm.user.email,
        img: vm.user.image,
        userId: vm.user.userId
      }; //end updateToSend
      // vm.user.image = vm.imgUpload;
      UpdateService.sendUpdatedUser(vm.updateToSend).then(function(status){
        console.log('status', status);
        vm.refreshUser();
      });
    };

  // *****   Get All Books in DB   *****//
  vm.getBooks = () => {
    // console.log('in getBooks');
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      vm.savedBooks = savedBooks.data;
      // console.log('vm.savedBooks',vm.savedBooks);
      vm.futureReads(vm.savedBooks);
      // vm.getBookInfo();
    }); //end then
    // console.log('leaving getBooks');
  }; //end searchForBook

  // *****   Determining if book is a FutureRead   *****//
  vm.futureReads = (savedBooks) => {
    const today = new Date();
    vm.iso = today.toISOString();
    // console.log('in futureReads');
    vm.futureReads = [];
    // console.log('savedBooks', savedBooks);
    for (const value of savedBooks) {
      if (vm.iso < value.due_date){
        vm.futureReads.push(value);
      } //end if
    } //end for loop
    // console.log('futureReads', vm.futureReads);
    // console.log('leaving futureReads');
  }; //end futureReads



// ***** Show Image Picker *****//
  vm.showPicker = () => {
    vm.imgUpload = '';
    client.pick({
     }).then(function(result) {
      // console.log(JSON.stringify(result.filesUploaded[0].url));
      vm.imgUpload = JSON.stringify(result.filesUploaded[0].url);

      vm.user.image = vm.imgUpload.slice(1, -1);
      // console.log('vm.imgUpload', vm.imgUpload );
     });
  }

}); //end UserController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
