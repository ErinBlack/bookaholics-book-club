myApp.controller('UserController', function($location, LoginService){
  console.log('in UserController');
  var vm = this;
  vm.user = LoginService.user;
  // *****   Getting User from LoginService  *****//
  vm.getUser = () => {
    vm.user = LoginService.user;
    console.log('vm.user', vm.user);
  }; //end getUser

  // *****  Send Users to Profile Edit Page *****//
  vm.editProfile = (userId) => {
    //getUser Id from
    $location.path('/edit-profile/' + userId);
  }; //editProfile

}); //end UserController
