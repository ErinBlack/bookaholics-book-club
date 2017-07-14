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

}); //end UpdateService
