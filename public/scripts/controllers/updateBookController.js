myApp.controller('UpdateBookController', function(UpdateService, LibraryService){
  console.log('in UpdateBookController');
  var vm = this;
  vm.savedBooks =[];
  // *****   Get All Books in DB   *****//
  vm.getBooks = () => {
    console.log('in getBooks');
    vm.savedBooks = LibraryService.prevBooks().then(function(allBooks){
      vm.savedBooks = allBooks.data;
      console.log('vm.savedBooks',   vm.savedBooks);
    });

}; //end getBooks

// *****  Get Updated User Info *****//
vm.getUpdatedBook = (data, id) => {
  console.log('data', data);
  console.log('id', id);
  console.log('book after getUpdateDBook', vm.savedBooks);

    vm.updateToSend = {
      title: data.title,
      author: data.author,
      publishedDate: data.datePublished,
      dueDate: data.dueDate,
      isbn: data.isbn,
      bookId: id
    }; //end updateToSend
    console.log('vm.updateToSend',vm.updateToSend  );
    // vm.user.image = vm.imgUpload;
    // UpdateService.sendUpdatedUser(vm.updateToSend).then(function(status){
    //   console.log('status', status);
    //   vm.refreshUser();
    // });
  }; // end getUpdatedBook

// ***** Show Image Picker *****//
  vm.showPicker = () => {
    vm.imgUpload = '';
    client.pick({
     }).then(function(result) {
      // console.log(JSON.stringify(result.filesUploaded[0].url));
      vm.imgUpload = JSON.stringify(result.filesUploaded[0].url);

      vm.user.image = vm.imgUpload.slice(1, -1);
      // console.log('vm.imgUpload', vm.imgUpload );
     });
  };// end showPIcker


}); // end updateBooksController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
