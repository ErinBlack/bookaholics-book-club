myApp.controller('MainController', function(LoginService){
  var vm = this;
  //getting logged in user info from LoginService
  vm.user = LoginService.getUser();
}); //end MainController
