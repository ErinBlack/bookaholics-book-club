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
    LibraryService.selectedBook(book);
  };

    // *****  Submit a Book *****//
  vm.submitBook = () => {
      console.log('in submitBook');
      vm.selectedBook = LibraryService.currentSelectedBook();
      console.log('selectedBook', vm.selectedBook);
      //creating book to send to the books database
      vm.bookToSend = {
        userId: vm.user.userId,
        title: vm.selectedBook.title,
        author: vm.selectedBook.author,
        publishedDate: vm.selectedBook.publishedDate,
        isbn: vm.selectedBook.isbn,
        coverImage: "http://covers.openlibrary.org/b/isbn/"+vm.selectedBook.isbn+"-S.jpg",
        dueDate: vm.dueDate
      }

      console.log('bookToSend', vm.bookToSend);
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
