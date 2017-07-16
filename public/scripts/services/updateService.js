myApp.service('UpdateService', function($http){
sv = this;

  // ***** Put Request to Update User Info *****//
  sv.sendUpdatedUser = (user) => {
    console.log('user in UpdateService',user);
      return $http.put('/update/user',{
        data: user
      }).then(function(status){
        return status.data;
      }); //end .then function
    }; //end sendUpdatedUser

    // ***** Put Request to Update User Info *****//
    sv.sendUpdatedBook = (book) => {
      console.log('user in UpdateService',book);
        return $http.put('/update/book',{
          data: book
        }).then(function(status){
          return status.data;
        }); //end .then function
      }; //end sendUpdatedUser

  // ***** Put Request to Update Cover Image *****//
      sv.updateCoverImage = (coverToSend) => {
        console.log('in updateCoverImage with:', coverToSend);
        return $http.put('/update/bookCover',{
          data: coverToSend
        }).then(function(status){
          console.log('status in service', status);
          if(status.data === 'OK'){
             sv.error = alert('You upload was complete');
          }
          else{
             sv.error = alert('There was a problem with your upload');
          }
          return sv.error;
        }); //end .then function
      } // updateCoverImage


      sv.updateProfileImage = (updateToSend) => {
        console.log('in updateProfileImage wiht:', updateToSend);
        return $http.put('/update/profileImage',{
          data: updateToSend
        }).then(function(status){
          console.log('status in service', status);
          if(status.data === 'OK'){
             sv.error = alert('You upload was complete');
          }
          else{
             sv.error = alert('There was a problem with your upload');
          }
          return sv.error;
        }); //end .then function
      }; //end updateProfileImage
}); //end UpdateService
