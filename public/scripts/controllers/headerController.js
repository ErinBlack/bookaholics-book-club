myApp.controller('HeaderController', function(LoginService){
  vm = this;
  vm.user = LoginService.getUser();
  console.log('vm.user', vm.user);
}); //
