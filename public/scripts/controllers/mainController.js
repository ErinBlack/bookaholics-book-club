myApp.controller('MainController', function(LoginService, LibraryService){
  var vm = this;
  vm.savedBooks = [];
  vm.futureReads = [];
  //getting logged in user info from LoginService
  vm.user = LoginService.getUser();

  // *****   Get All Books in DB   *****//
  vm.prevBooks = () => {
    console.log('in prevBooks');
    vm.savedBooks = [];
    LibraryService.prevBooks().then(function(savedBooks){
      vm.savedBooks = savedBooks.data;
      console.log('prevBooks', vm.savedBooks);
      vm.futureReads(vm.savedBooks);
    }); //end then


  }; //end searchForBook


// *****   Determining if book is a FutureRead   *****//
  vm.futureReads = (savedBooks) => {
    vm.futureReads = [];
    console.log('in futureReads');
    let today = new Date();
    let iso = today.toISOString()
    console.log('today', today);
    console.log('vm.savedBooks', savedBooks);

    for (const value of savedBooks) {
      console.log('value due date', value.due_date);
      if (iso < value.due_date){
        vm.futureReads.push(value);
      } //end if
    } //end for loop
    console.log(vm.futureReads);
  }; //end futureReads

}); //end MainController
