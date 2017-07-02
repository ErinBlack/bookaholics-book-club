myApp.controller('RegisterController', function(RegisterService){
console.log('in RegisterController');

var vm = this;

//sending registration info to service
vm.register = function(){
console.log('in vm.register');
  // create registrationInfo object
  var registerInfo = {
    firstName: vm.firstNameInput,
    lastName: vm.lastNameInput,
    email: vm.emailInput,
    password: vm.passwordInput,
    image: vm.imageInput
  }; //end register info

}; //end register function

}); //end register controller
