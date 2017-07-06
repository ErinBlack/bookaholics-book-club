//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, $http){
  console.log('in AdminController');
var vm = this;
vm.pendingUsers = [];
vm.allUsers = [];
vm.user = LoginService.getUser();

  // *****   Get Search Title   *****//
  vm.searchForBook = (search) => {
    LibraryService.searchBook(search).then(function(bookSearched){
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook


  // *****   Get Member Request   *****//
  vm.getRequests = function(){
    $http.get('/admin/requests').then(function(data){
      vm.pendingUserData = data.data;
      for (const value of vm.pendingUserData) {
        vm.pendingUsers.push(value);
      }
    });
  }; //end getRequests

  // *****  Approve Member Request   *****//
  vm.approveUser = (user_id) => {
    $http.put('/admin/approve',{
      data: user_id
    }).then(function(){
      vm.pendingUsers = [];
      vm.getRequests();
    }); //end .then function
  }; //end approveUser


  // *****  Decline Member Request   *****//
  vm.declineUser = (user_id) => {
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
      for (const value of vm.userData) {
        console.log(value);
      vm.allUsers.push(value);
    }
      console.log('pendingUsers', vm.allUsers);
    });
  }; //end getRequests

}); //end AdminController
