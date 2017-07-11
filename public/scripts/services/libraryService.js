myApp.service('LibraryService', function($http){
let sv = this;
let books = [];
let selectedBook = {};
sv.savedBooks = [];
sv.bookPageId = 0;


// *****  Get list of books from API *****//
sv.searchBook = (search) => {
  //returning books array to empty
  books = [];
    //call to openlibrary API
    let searchURL = 'http://openlibrary.org/search.json?q=' + search;
    return $http.get(searchURL).then(function(response){
      sv.parseBooks(response);
      return books;
    }); //end searchBook
}; //end searchBook


// *****  Parse through the books array to remove items without authors *****//
sv.parseBooks = (bookArray) => {
  let bookData = bookArray.data.docs;
  //checking to see if the book array returned is < 25 items
    for (const value of bookData) {
      if(value.author_name === undefined || value.isbn === undefined || value.publish_date === undefined   ){
      }
      else{
      books.push(value);
      } //end else
    } //end for loop
}; //end parseBooks


// ***** Send selected Book info to controller *****//
  sv.currentSelectedBook= () => {
    sv.selectedBook = selectedBook;
    return sv.selectedBook;
  }; //end getUser

// ***** Send selected Book info to controller *****//
  sv.sendBook = (sentBook) => {
    return $http.post('admin/postBook',{
      data: sentBook
    }).then(function(status){
      return status.data;
    }); //end .then function
  };

  // ***** Send selected Book info to controller *****//
    sv.prevBooks = () => {
      sv.savedBooks = [];
      console.log('in prevBooks');
      return $http.get('main/getBooks').then(function(response){
        sv.savedBooks = response;
        return sv.savedBooks;
      }); //end searchBook
    };


    sv.sendBookId = (bookId) => {
      console.log('in sendBookId in service with:', bookId);
      sv.bookPageId = bookId;
      console.log('sv.bookPageId', sv.bookPageId);
    }; // endSendBookId


    sv.getBookId = () => {
      return sv.bookPageId;
    }

    sv.allBooks = () => {
      return sv.savedBooks;
    }; //end allBooks
});// end LibraryService
