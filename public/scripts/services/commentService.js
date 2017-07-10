myApp.service('CommentService', function($http){
console.log('in CommentService');
let sv = this;

// ***** Send Comment to Main Comment Thread *****//
  sv.addComment = (sentComment) => {
    console.log('in sendComment', sentComment);
    return $http.post('main/comment',{
      data: sentComment
    }).then(function(status){
      console.log('response from sentComment', status.data);
      return status.data;
    }); //end .then function
  };
}); //end commentService
