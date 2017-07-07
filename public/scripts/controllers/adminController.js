//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, $http){
  console.log('in AdminController');
var vm = this;
vm.pendingUsers = [];
vm.allUsers = [];
vm.user = LoginService.getUser();
vm.bookImg = 0;
let bookSelected = {};

  // *****   Get Search Title   *****//
  vm.searchForBook = (search) => {
    console.log('in searchforBook');
    console.log('search', search);
    LibraryService.searchBook(search).then(function(bookSearched){
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook



  // *****   Choose a Book *****//
  vm.chooseBook = (book) => {
    console.log('in choose book');
    vm.selectedBook = LibraryService.selectedBook();
    // .then(function(bookSelected){
    //   vm.bookSelected = bookSelected;
    // }); //end then
    // console.log('bookSelected', vm.bookSelected);
  };

    // *****  Submit a Book *****//
  vm.submitBook = () => {
      console.log('in submitBook');
      console.log('vm.dueDate', vm.dueDate);
      getSeletedBook = function(){

      }
      vm.bookToSend = {
        userId: vm.user.userId,
        title: selectedBook.title,
        author: selectedBook.author_name[0],
        publishedDate: selectedBook.publish_date[0],
        isbn: selectedBook.isbn[0],
        coverImage: "http://covers.openlibrary.org/b/isbn/"+selectedBook.isbn[0]+"-S.jpg",
        dueDate: vm.dueDate
      }

      console.log('bookToSend', bookToSend);
  } //end submitBook


  // *****   Get Member Request   *****//
  vm.getRequests = () => {
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
  vm.getMembers = () => {
    console.log('in getMembers');
    $http.get('/admin/getMembers').then(function(data){
      vm.userData = data.data;
      for (const value of vm.userData) {
        if(value.role <= 2 ){
          vm.admin = true;
        }
        else if(value.role === 1){
            vm.admin = 'owner';
        }
        else{
          vm.admin = false;
        }
        user = {
          email: value.email,
          first_name: value.first_name,
          last_name: value.last_name,
          profile_img: value.profile_img,
          role: value.role,
          user_id: value.user_id,
          admin: vm.admin
        }

      vm.allUsers.push(user);
    }
      console.log('allUsers', vm.allUsers);
    });
  }; //end getRequests



  // ***** Change Role *****//
  vm.changeRole = (user_id, role) => {
    let userInfo = {
      id: user_id,
      role: role
    }
    $http.put('/admin/changeRoll',{
      data: userInfo
    }).then(function(){
      vm.allUsers = [];
      vm.getMembers();
      console.log('allUsers', vm.allUsers);
    }); //end .then function
  }; //end makeAdmin


    // ***** Change User Status *****//
    vm.changeStatus = (user_id, status) => {
      let userInfo = {
        id: user_id,
        status: status
      }
      console.log('in changeStatus');
      $http.put('/admin/changeStatus',{
        data: userInfo
      }).then(function(){
        vm.allUsers = [];
        vm.pendingUsers = [];
        vm.getMembers();
        vm.getRequests();
      }); //end .then function
    }; //end makeAdmin



}); //end AdminController
