myApp.service('LoginService', function($http){
console.log('inside LoginService');
var sv = this;

sv.sendLogIn = function(data){
  console.log('in sendlogin', data);
  return $http({
    method: 'POST',
    url: '/login',
    data: data
  }).then(function(response) {
    console.log('back from login attempt:', response);
    //if statement confirms returned with user data
    if (response.data.length > 0) {
      //if user status is false, then user not yet confirmed
      if(response.data[0].status === false ){
        console.log('User not confirmed yet');
        sv.loggedIn = false;
        sv.error = alert('You haven\'t yet been confirmed by the administrator');
        return sv.error;
      }
      // user is in system and confirmed
      else{
        var userData = response.data[0];
        console.log('logged in');
        sv.loggedIn = true;
        sv.registeredUser = !sv.registeredUser;
        //all user information
        var user = {
          loggedIn: sv.loggedIn,
          registered: sv.registeredUser,
          id: userData.user_id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          image: userData.profile_img,
          role: userData.role
        };

        return user;

      }

    } //end logged in
    else {
      console.log('in loginService else statement');
      sv.loggedIn = false;
      sv.error = alert('Email and / or password not registered');
      return sv.error;
    }
  }); // end http
};



}); //end LoginService
