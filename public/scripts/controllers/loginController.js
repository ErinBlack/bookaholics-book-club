myApp.controller('LoginController', function(LoginService){
  console.log('In Login Controller');
  var vm = this;

  vm.loggingIn= false;
  vm.registeredUser = false;

  vm.login = function(){
    console.log('in login function');
    var userInfo = {
      username: vm.emailInput,
      password: vm.passwordInput
    }; // end user info

    if(vm.emailInput  === undefined || vm.passwordInput === undefined || vm.emailInput  === '' || vm.passwordInput === '' ){
      alert('Please fill out all fields');
    } //end if
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


});
