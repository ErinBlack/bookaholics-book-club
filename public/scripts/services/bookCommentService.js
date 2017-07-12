myApp.service('BookCommentService', function($http){
let sv = this;

// ***** Send Comment to Main Comment Thread *****//
  sv.addBookComment = (sentComment) => {
    console.log('in addBookComment in BookCommentService with:', sentComment);
    return $http.post('books/comment',{
      data: sentComment
    }).then(function(status){
      return status.data;
    }); //end .then function
  };

// ***** Get all comments from main thread *****//
  sv.getBookComments = (bookId) => {
    console.log('in getBookComments with:', bookId);
    return $http.get('books/comment').then(function(comments){
      console.log('comments from getBookComments', comments);
      return comments;
    }); //end .then function
  };


}); //end commentService
