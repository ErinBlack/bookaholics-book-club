let books = [];
//Library Controller to get books from Open Library API
myApp.controller('AdminController', function(LibraryService, LoginService, UserService, $http){
var vm = this;
vm.user = LoginService.getUser();
vm.pendingUsers = [];
vm.bookImg = 0;
vm.books = books;
vm.selectedBook= {};
vm.allUsers = [];
vm.idSelectedVote = null;


// *****   Getting all members  *****//
vm.getMembers = () => {
  // console.log('in get members');
  UserService.getMembers().then(function(allMembers){
    vm.allUsers = allMembers;
    // console.log('vm.allUsers', vm.allUsers);
  });
  // console.log('leaving get members');
}; //end getRequests

  // *****   Get Search Title   *****//
  vm.searchForBook = (search) => {
    // console.log('in searchForBook');
    vm.books = [];
    LibraryService.searchBook(search).then(function(booksSearched){
      vm.books = booksSearched;
      for(i=0; i<vm.books.length; i++ ){
          books.push(vm.books[i]);
      }
      // console.log('vm.books', vm.books);
    }); //end then
    // console.log('leaving searchForBook');
  }; //end searchForBook

  // *****   Choose a Book *****//
  vm.chooseBook = (i) => {
    vm.idSelectedVote = i;
    vm.selectedBook = {};
    // console.log('in choose book');
    vm.selectedBook = {
      title: vm.books[i].title,
      author: vm.books[i].author_name[0],
      publishedDate: vm.books[i].publish_date[0],
      isbn: vm.books[i].isbn[0],
      coverImage: "http://covers.openlibrary.org/b/id/"+vm.books[i].cover_i+"-M.jpg",
    }; // end selectedBook
      console.log('leaving choose book');
  };


    // *****  Submit a Book *****//
  vm.submitBook = () => {
    console.log('in submitBook');
      //creating book to send to the books database
      vm.bookToSend = {
        userId: vm.user.userId,
        title: vm.selectedBook.title,
        author: vm.selectedBook.author,
        publishedDate: vm.selectedBook.publishedDate,
        isbn: vm.selectedBook.isbn,
        coverImage: vm.selectedBook.coverImage,
        dueDate: vm.dueDate
      }; //end bookToSend
      //sending bookToSend to Library Service
      LibraryService.sendBook(vm.bookToSend).then(function(status) {
        books = [];
        vm.selectedBook= {};
        vm.bookToSend = {};
        vm.search = ''
        switch(status) {
          case 'error': {
            alert("Oh No! There was a problem with your submission.");
            break;
          }
          case 'book submitted': {
            alert("Your book has been submitted!");
            break;
          }
          default: {
            alert("Oh No! There was a problem with your submission.");
            break;
          }
        } //end switch statement

      }); //end LibraryService
      console.log('leaving submitBook');
      vm.search = '';
      vm.dueDate = '';
      vm.selectedBook = {};
      vm.books = [];
  }; //end submitBook

  // *****   Get Member Request   *****//
  vm.getRequests = () => {
    console.log('in getRequests');
    UserService.getUserRequests().then(function(pendingUsers){
    vm.pendingUsers = pendingUsers;
    });
      console.log('leaving getRequests');
  }; //end getRequests


  // *****  Get All Members for Role Change  *****//



  // ***** Change Role *****//
  vm.changeRole = (user_id, role) => {
    console.log('in changeRole');
    UserService.changeRole(user_id, role).then(function(allUsers){
      vm.getMembers();
    });
    console.log('leaving changeRole');

  }; //end changeRoll

    // ***** Change User Status *****//
    vm.changeStatus = (user_id, status) => {
      console.log('in changeStatus');
      UserService.changeStatus(user_id, status).then(function(pendingUsers){
          vm.pendingUsers = pendingUsers;
          vm.getMembers();
      });
      console.log('leaving changeStatus');
    }; //end makeAdmin



}); //end AdminController
