myApp.service('CommentService', function($http){
console.log('in CommentService');
let sv = this;

// ***** Send Comment to Main Comment Thread *****//
  sv.addMainComment = (sentComment) => {
    console.log('in sendComment', sentComment);
    return $http.post('main/comment',{
      data: sentComment
    }).then(function(status){
      console.log('response from sentComment', status.data);
      return status.data;
    }); //end .then function
  };

// ***** Get all comments from main thread *****//
  sv.getMainComments = () => {
    console.log('in getMainComments');
    return $http.get('main/comment').then(function(comments){
      console.log('response from getMainComments', comments);
      return comments;
    }); //end .then function
  };


}); //end commentService
