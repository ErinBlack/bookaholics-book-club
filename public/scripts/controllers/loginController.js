
myApp.controller('LoginController', function(LoginService){
  var vm = this;

  vm.loggingIn= false;
  vm.registeredUser = false;

  //function to login users
  vm.login = function(){
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
      LoginService.sendLogIn(userInfo).then(function(registered) {
        vm.emailInput = '';
        vm.passwordInput = '';
        if(registered === undefined){
        }
        else {
          window.location = "/#!/main";
        }
      }); // end LoginService call
    } //end else
  }; //end login

}); //end LoginController
