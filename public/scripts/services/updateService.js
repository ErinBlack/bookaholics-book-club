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

}); //end UpdateService
