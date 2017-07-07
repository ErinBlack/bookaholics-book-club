myApp.service('LibraryService', function($http){
let ls = this;
let books = [];
let selectedBook = {};


// *****  Get list of books from API *****//
ls.searchBook = (search) => {
  //returning books array to empty
  books = [];
    //call to openlibrary API
    let searchURL = 'http://openlibrary.org/search.json?q=' + search;

    return $http.get(searchURL).then(function(response){
      //running parseBooks to remove books without authors
      ls.parseBooks(response);
      return books;
    }); //end searchBook
}; //end searchBook


// *****  Parse through the books array to remove items without authors *****//
ls.parseBooks = (bookArray) => {
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
ls.selectedBook = (book) => {
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
}; // end ls.selectedBook
});// end GifService
