myApp.service('CommentService', function($http){
let sv = this;

// ***** Send Comment to Main Comment Thread *****//
  sv.addMainComment = (sentComment) => {
    return $http.post('main/comment',{
      data: sentComment
    }).then(function(status){
      return status.data;
    }); //end .then function
  };

// ***** Get all comments from main thread *****//
  sv.getMainComments = () => {
    return $http.get('main/comment').then(function(comments){
      return comments;
    }); //end .then function
  };


}); //end commentService
