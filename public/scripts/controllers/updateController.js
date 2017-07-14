myApp.controller('UpdateController', function($location, UpdateService, LoginService){
  console.log('in UpdateController');
  var vm = this;
  var client = filestack.init('ARe83u3xXQw2imhkEvE0Cz');
  vm.imgUpload = '';

  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    vm.user = LoginService.user;
    console.log('vm.user', vm.user);
  }; //end getUser

  // *****  Get Updated User Info *****//
  vm.getUpdatedInfo = () => {
    console.log('updateUser', vm.user);
    if(vm.imgUpload != ''){
      vm.updateToSend = {
        firstName: vm.user.firstName,
        lastName: vm.user.lastName,
        email: vm.user.email,
        img: vm.imgUpload,
        userId: vm.user.userId
      }; //end updateToSend
      UpdateService.sendUpdatedUser(vm.updateToSend).then(function(){
        vm.getUser();
      });
    }
    else{
      UpdateService.sendUpdatedUser(vm.user).then(function(){
        vm.getUser();
      });
    }


  };

// ***** Show Image Picker *****//
  vm.showPicker = () => {
    vm.imgUpload = '';
    client.pick({
     }).then(function(result) {
      // console.log(JSON.stringify(result.filesUploaded[0].url));
      vm.imgUpload = JSON.stringify(result.filesUploaded[0].url);

      vm.imgUpload = vm.imgUpload.slice(1, -1);
      console.log('vm.imgUpload', vm.imgUpload );
     });
  }

}); //end UserController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
