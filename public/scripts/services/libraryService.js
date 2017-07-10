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
    console.log('books', books);
}; //end parseBooks


// ***** Send selected Book info to controller *****//
  sv.currentSelectedBook= () => {
    console.log('in currentSelectedBook');
    sv.selectedBook = selectedBook;
    console.log('sv.selectedBook', sv.selectedBook);
    return sv.selectedBook;
  }; //end getUser

// ***** Send selected Book info to controller *****//
  sv.sendBook = (sentBook) => {
    console.log('in sendBook', sentBook);
    return $http.post('admin/postBook',{
      data: sentBook
    }).then(function(status){
      console.log('response from sentBook', status.data);
      return status.data;
    }); //end .then function
    //
    // return $http({
    //   method: 'POST',
    //   url: '',
    //   data: sentBook
    // }).then(function(data){
    //   console.log('data from sentBook', data);
    // } //end then
    // );
  };

});// end LibraryService
