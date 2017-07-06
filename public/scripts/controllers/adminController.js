//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, $http){
  console.log('in AdminController');
var vm = this;
vm.pendingUsers = [];
vm.allUsers = [];
vm.user = LoginService.getUser();

  // *****   Get Search Title   *****//
  vm.searchForBook = function(search){
    LibraryService.searchBook(search).then(function(bookSearched){
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook


  // *****   Get Member Request   *****//
  vm.getRequests = function(){
    $http.get('/admin/requests').then(function(data){
      vm.pendingUserData = data.data;
      for (var i = 0; i < vm.pendingUserData.length; i++) {
        vm.pendingUsers.push(vm.pendingUserData[i]);
      } // end for loop
    });
  }; //end getRequests

  // *****  Approve Member Request   *****//
  vm.approveUser = function(user_id){
    $http.put('/admin/approve',{
      data: user_id
    }).then(function(){
      vm.pendingUsers = [];
      vm.getRequests();
    }); //end .then function
  }; //end approveUser


  // *****  Decline Member Request   *****//
  vm.declineUser = function(user_id){
    $http.put('/admin/decline',{
      data: user_id
    }).then(function(){
      vm.pendingUsers = [];
      vm.getRequests();
    }); //end .then function
  }; //end approveUser

  // *****  Get All Members for Role Change  *****//
  vm.getUsers = () => {
    console.log('in getUsers');
    $http.get('/admin/users').then(function(data){
      console.log('back from the /users with', data);
      vm.userData = data.data;
      console.log('pendingUserData',  vm.userData);
      for (var i = 0; i < vm.userData.length; i++) {
        vm.allUsers.push(vm.userData[i]);
      } // end for loop
      console.log('pendingUsers', vm.allUsers);
    });
  }; //end getRequests

}); //end AdminController
