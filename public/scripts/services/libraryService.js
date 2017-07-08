myApp.service('LibraryService', function($http){
let sv = this;
let books = [];
let selectedBook = {};


// *****  Get list of books from API *****//
sv.searchBook = (search) => {
  //returning books array to empty
  books = [];
    //call to openlibrary API
    let searchURL = 'http://openlibrary.org/search.json?q=' + search;

    return $http.get(searchURL).then(function(response){
      //running parseBooks to remove books without authors
      sv.parseBooks(response);
      return books;
    }); //end searchBook
}; //end searchBook


// *****  Parse through the books array to remove items without authors *****//
sv.parseBooks = (bookArray) => {
  let bookData = bookArray.data.docs;
  //checking to see if the book array returned is < 25 items
    for (const value of bookData) {
      if(value.author_name === undefined || value.isbn === undefined ){
      }
      else{
      books.push(value);
      } //end else
    } //end for loop
    console.log('books', books);
}; //end parseBooks

// *****  Storing Selected Book *****//
sv.selectedBook = (book) => {
  selectedBook = {};

  // vm.title = book.title;
  selectedBook = {
    title: book.title,
    author: book.author_name[0],
    publishedDate: book.publish_date[0],
    isbn: book.isbn[0],
    coverImage: "http://covers.openlibrary.org/b/isbn/"+book.isbn[0]+"-S.jpg",
  }; // end selectedBook
  console.log('selected book in service', selectedBook);
  return selectedBook;
}; // end sv.selectedBook

// ***** Send selected Book info to controller *****//
  sv.currentSelectedBook= () => {
    console.log('in currentSelectedBook');
    sv.selectedBook = selectedBook;
    console.log('sv.selectedBook', sv.selectedBook);
    return sv.selectedBook;
  }; //end getUser

// ***** Send selected Book info to controller *****//
  sv.sendBook = (sentBook) => {
    console.log('in sendBook');
    return $http({
      method: 'POST',
      url: 'admin/postBook',
      data: sentBook
    }).then(function(data){
      console.log('data from sentBook', data);
    } //end then
    );
  };

});// end LibraryService
