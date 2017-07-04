myApp.controller('MainController', function(LoginService){
  var vm = this;
  //getting logged in user info from LoginService
  vm.user = LoginService.getUser();
  console.log('vm.user', vm.user);
}); //end MainController
