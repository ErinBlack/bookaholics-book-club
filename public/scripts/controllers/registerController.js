myApp.controller('RegisterController', function($location, RegisterService){
console.log('in RegisterController');

var vm = this;
var client = filestack.init('ARe83u3xXQw2imhkEvE0Cz');
vm.imgUpload = '';
//sending registration info to service
vm.registerNewUser = function(){
console.log('in vm.register');
console.log('vm.firstName', vm.firstNameInput);
  // create registrationInfo object
  var registerInfo = {
    firstName: vm.firstNameInput,
    lastName: vm.lastNameInput,
    email: vm.emailInput,
    password: vm.passwordInput,
    image: vm.imgUpload
  }; //end register info
  console.log('registerInfo', registerInfo);

  RegisterService.sendRegister(registerInfo).then(function() {
      vm.firstNameInput = '';
      vm.lastNameInput = '';
      vm.emailInput = '';
      vm.passwordInput = '';
      vm.passwordConfirm = '';
      vm.imgUpload = '';
      alert('Your Account Has Been Created! Please wait for an administrator to approve your request.');
      window.location = "/#!/";
    }); // end RegisterService
  }; // end registerNewUser



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


}); //end register controller
