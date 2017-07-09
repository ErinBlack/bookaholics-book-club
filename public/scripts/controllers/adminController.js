//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, UserService, $http){
var vm = this;
vm.user = LoginService.getUser();
vm.pendingUsers = [];
vm.bookImg = 0;
let bookSelected = {};

  // *****   Get Search Title   *****//
  vm.searchForBook = (search) => {
    LibraryService.searchBook(search).then(function(bookSearched){
      vm.books = bookSearched;
      vm.searchBook = LibraryService;
    }); //end then
  }; //end searchForBook


  // *****   Choose a Book *****//
  vm.chooseBook = (book) => {
    LibraryService.selectedBook(book);
  };

    // *****  Submit a Book *****//
  vm.submitBook = () => {
      vm.selectedBook = LibraryService.currentSelectedBook();
      //creating book to send to the books database
      vm.bookToSend = {
        userId: vm.user.userId,
        title: vm.selectedBook.title,
        author: vm.selectedBook.author,
        publishedDate: vm.selectedBook.publishedDate,
        isbn: vm.selectedBook.isbn,
        coverImage: "http://covers.openlibrary.org/b/isbn/"+vm.selectedBook.isbn+"-S.jpg",
        dueDate: vm.dueDate
      }; //end bookToSend

      //sending bookToSend to Library Service
      LibraryService.sendBook(vm.bookToSend).then(function() {
      }); //end LibraryService
  }; //end submitBook

  // *****   Get Member Request   *****//
  vm.getRequests = () => {
    UserService.getUserRequests().then(function(pendingUsers){
      console.log('in getRequest then', pendingUsers);
    vm.pendingUsers = pendingUsers;
    });
  }; //end getRequests


  // *****  Get All Members for Role Change  *****//
  vm.getMembers = () => {
    vm.allUsers = UserService.getMembers();
  }; //end getRequests


  // ***** Change Role *****//
  vm.changeRole = (user_id, role) => {
    UserService.changeRole(user_id, role).then(function(allUsers){
      vm.allUsers = allUsers
    });
  }; //end changeRoll

    // ***** Change User Status *****//
    vm.changeStatus = (user_id, status) => {
      UserService.changeStatus(user_id, status).then(function(pendingUsers){
          vm.pendingUsers = pendingUsers;
      });
    }; //end makeAdmin



}); //end AdminController
