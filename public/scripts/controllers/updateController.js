myApp.controller('UpdateController', function($location, UserService, LoginService){
console.log('in UpdateController');

var vm = this;


// *****   Getting User from LoginService  *****//
vm.getUser = () => {
  vm.user = LoginService.user;
  console.log('vm.user', vm.user);
}; //end getRequests

// *****  Send Users to Profile Edit Page *****//
vm.editProfile = (userId) => {
  //getUser Id from
  $location.path('/edit-profile/' + userId);
}; //editProfile


// *****  Get Updated User Info *****//
vm.getUpdatedInfo = () => {
  console.log('updateUser', vm.user.email);

};



}); //end UserController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
