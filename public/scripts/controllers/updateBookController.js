myApp.controller('UpdateBookController', function(UpdateService, LibraryService){
  console.log('in UpdateBookController');
  var vm = this;
  vm.savedBooks =[];
  var client = filestack.init('ARe83u3xXQw2imhkEvE0Cz');
  vm.coverToEdit='';
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
    UpdateService.sendUpdatedBook(vm.updateToSend).then(function(status){
      console.log('status', status);
        vm.getBooks();
    });
  }; // end getUpdatedBook

// // ***** Show Image Picker *****//
  vm.showPicker = (bookId, index) => {
    console.log('in showPIcker with:', bookId, index);
    client.pick({
     }).then(function(result) {
       console.log('in then function with', index);
       console.log(JSON.stringify(result.filesUploaded[0].url));
      vm.imgUpload = JSON.stringify(result.filesUploaded[0].url);
      console.log('vm.savedBooks.data', vm.savedBooks);
      vm.savedBooks[index].cover_img = vm.imgUpload.slice(1, -1);

      vm.coverToSend = {
        image: vm.savedBooks[index].cover_img,
        bookId: bookId
      }; //end coverToSend
      console.log('coverToSend',  vm.coverToSend );
      vm.updateCoverImage(vm.coverToSend);

     });
//
  };// end showPIcker
//
// ***** Send Cover Image to be Updated *****//
vm.updateCoverImage = (coverToSend) => {
  console.log('in updateCoverImage with:', coverToSend);
  UpdateService.updateCoverImage(coverToSend).then(function(status){
    vm.getBooks();
  });
}; //end updateCoverImage

}); // end updateBooksController

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
