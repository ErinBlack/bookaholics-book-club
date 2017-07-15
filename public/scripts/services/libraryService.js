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
      sv.books = books;
      return books;
    }); //end searchBook
}; //end searchBook


// *****  Parse through the books array to remove items without authors *****//
sv.parseBooks = (bookArray) => {
  let bookData = bookArray.data.docs;

  //checking to see if the book array returned is < 25 items
  console.log('bookData', bookData);
    for (const value of bookData) {

      if(value.author_name === undefined || value.isbn === undefined){
      }
      else{
        for(const isnbNumber of value.isbn){
          isnbNumber.onload = function(){

            var height = isnbNumber.height;
            var width = isnbNumber.width;
            console.log('height and width',height, width  );
            // code here to use the dimensions
          }
          isnbNumber.src = "http://covers.openlibrary.org/b/isbn/"+ isnbNumber +"-s.jpg";
        }
        books.push(value);
      }
    } //end for loop
}; //end parseBooks


// ***** Send selected Book info to controller *****//
  sv.currentSelectedBook= () => {
    sv.selectedBook = selectedBook;
    return sv.selectedBook;
  }; //end getUser

// ***** Send selected Book info to controller *****//
  sv.sendBook = (sentBook) => {
    console.log('in LibraryService sendBook with:',sentBook);
    return $http.post('admin/postBook',{
      data: sentBook
    }).then(function(status){
      return status.data;
    }); //end .then function
  };

  // ***** Send selected Book info to controller *****//
    sv.prevBooks = () => {
      console.log('in LC prevBooks');
      sv.savedBooks = [];
      return $http.get('main/getBooks').then(function(response){
        sv.savedBooks = response;
        console.log('sv.savedBooks', sv.savedBooks);
        return sv.savedBooks;
      }); //end searchBook
    };

    sv.sendBookId = (bookId) => {
      sv.bookPageId = bookId;
    }; // endSendBookId

    sv.getBookId = () => {
      return sv.bookPageId;
    }

    sv.allBooks = () => {
      return sv.savedBooks;
    }; //end allBooks
});// end LibraryService
