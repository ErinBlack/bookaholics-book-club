myApp.service('LibraryService', function($http){
var ls = this;
var books = [];
//get list of books from API
ls.searchBook = function(search){
  //returning books array to empty
  books = [];
    //call to openlibrary API
    var searchURL = 'http://openlibrary.org/search.json?q=' + search;
    return $http.get(searchURL).then(function(response){
      console.log('inside searchBook .then function');
      //running parseBooks to remove books without authors
      ls.parseBooks(response);
      return books;
    }); //end searchBook
}; //end searchBook

//parse through the books array to remove items without authors
ls.parseBooks = function(bookArray){

  console.log('inside parseBooks');
  var bookData = bookArray.data.docs;
  
  //for loop to loop through the data and parse it out
  for (var i = 0; i <= 10; i++) {
    console.log('entered forloop');
    if(bookData[i].author_name === undefined || bookData[i].isbn === undefined ){
      console.log('no author name');
    } //end if
    else{
    books.push(bookData[i]);
    } //end else
  } //end for loop
  console.log('books', books);
}; //end parseBooks

});// end GifService
