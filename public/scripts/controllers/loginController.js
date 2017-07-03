
myApp.controller('LoginController', function(LoginService){
  console.log('In Login Controller');
  var vm = this;

  vm.loggingIn= false;
  vm.registeredUser = false;

  //function to login users
  vm.login = function(){
    console.log('in login');
      // create userInfo object
    var userInfo = {
      email: vm.emailInput,
      password: vm.passwordInput
    }; // end user info

    // checking to make sure all input fields are filled out
    if(vm.emailInput  === undefined || vm.passwordInput === undefined || vm.emailInput  === '' || vm.passwordInput === '' ){
      alert('Please fill out all fields');
    } //end if
    //sending login information to the LoginService
    else{
      LoginService.sendLogIn(userInfo).then(function() {

        vm.name = vm.emailInput;
        console.log(vm.emailInput);
        vm.emailInput = '';
        vm.passwordInput = '';
        console.log(vm.name, vm.passwordInput);
      }); // end LoginService call
    } //end else
  }; //end login

}); //end LoginController
