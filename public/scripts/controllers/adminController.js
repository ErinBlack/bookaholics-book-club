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



  // *****   Get Search Title   *****//
  vm.searchForBook = (search) => {
    vm.books = [];
    LibraryService.searchBook(search).then(function(booksSearched){
      vm.books = booksSearched;
      console.log('vm.books.length', vm.books );
      for(i=0; i<vm.books.length; i++ ){
          console.log('in for loop');
          books.push(vm.books[i]);
      }
      console.log('books', books);
      console.log('vm.books', vm.books);
      // console.log('vm.books', vm.books);

    }); //end then
  }; //end searchForBook

  // *****   Choose a Book *****//
  vm.chooseBook = (i) => {
    vm.selectedBook = {};
    console.log('in choose book');
    console.log('book title', vm.books[i]);
    vm.selectedBook = {
      title: vm.books[i].title,
      author: vm.books[i].author_name[0],
      publishedDate: vm.books[i].publish_date[0],
      isbn: vm.books[i].isbn[0],
      coverImage: "http://covers.openlibrary.org/b/id/"+vm.books[i].cover_i+"-M.jpg",
    }; // end selectedBook
    console.log('vm.selectedBook',vm.selectedBook );
  };

    // *****  Submit a Book *****//
  vm.submitBook = () => {
    console.log('vm.selectedBook', vm.selectedBook);
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
      console.log('vm.bookToSend', vm.bookToSend);
      //sending bookToSend to Library Service
      LibraryService.sendBook(vm.bookToSend).then(function(status) {
        books = [];
        vm.selectedBook= {};
        vm.bookToSend = {};
        vm.search = ''
        console.log('response', status);
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
  }; //end submitBook

  // *****   Get Member Request   *****//
  vm.getRequests = () => {
    UserService.getUserRequests().then(function(pendingUsers){
      console.log('in getRequest then', pendingUsers);
    vm.pendingUsers = pendingUsers;
    });
  }; //end getRequests


  // *****  Get All Members for Role Change  *****//
  // *****   Getting all members  *****//
  vm.getMembers = () => {
    vm.allUsers = [];
    console.log('in get members');
    UserService.getMembers().then(function(allMembers){
      vm.allUsers = allMembers;
      console.log('vm.allUsers in controller', vm.allUsers);
    });
  }; //end getRequests


  // ***** Change Role *****//
  vm.changeRole = (user_id, role) => {
    UserService.changeRole(user_id, role).then(function(allUsers){
      vm.allUsers = allUsers;
    });
  }; //end changeRoll

    // ***** Change User Status *****//
    vm.changeStatus = (user_id, status) => {
      UserService.changeStatus(user_id, status).then(function(pendingUsers){
          vm.pendingUsers = pendingUsers;
          vm.getMembers();
      });
    }; //end makeAdmin



}); //end AdminController
