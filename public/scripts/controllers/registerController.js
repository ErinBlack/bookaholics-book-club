myApp.controller('RegisterController', function(RegisterService){
console.log('in RegisterController');

var vm = this;

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
    image: vm.imageInput
  }; //end register info
  console.log('registerInfo', registerInfo);

  RegisterService.sendRegister(registerInfo).then(function() {
      vm.firstNameInput = '';
      vm.lastNameInput = '';
      vm.emailInput = '';
      vm.passwordInput = '';
      vm.passwordConfirm = '';
    }); // end RegisterService
  }; // end registerNewUser

}); //end register controller