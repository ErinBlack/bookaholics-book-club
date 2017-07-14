myApp.controller('UserController', function($location, UserService, LoginService){
console.log('in UserController');

var vm = this;


// *****   Getting User from LoginService  *****//
vm.getUser = () => {
  vm.user = LoginService.user;
  console.log('vm.user', vm.user);
}; //end getRequests

// *****  Send Users to Profile Edit Page *****//
vm.editProfile = (userId) => {
  console.log('in editProfile with', userId);
  //getUser Id from
  $location.path('/edit-profile/' + userId);
}; //editProfile

// *****  Check input fields on update user info *****//
vm.checkInput = (data) => {
  if (data == '' ) {
    return "Please fill all fields";
  }
};


// *****  Get Updated User Info *****//
vm.getUpdatedInfo = () => {

  console.log('updateUser', vm.user.email);
};



}); //end UserController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
