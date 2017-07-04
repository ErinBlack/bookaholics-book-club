myApp.service('LoginService', function($http){
  //logged in information
  var sv = this;
  sv.loggedIn = false;
  sv.admin = false;
  var user = {};

//send user info to controller
  sv.getUser=function(){
    sv.user = user;
    return sv.user;
  }; //end getUser

  //Post requset for login
  sv.sendLogIn = function(data){
    return $http({
      method: 'POST',
      url: '/login',
      data: data
    }).then(function(response) {
      if(response.data === 'error'){
         sv.error = alert('an error has occured');
      }
      else if(response.data === 'not in system') {
          sv.error = alert('Email and / or password not registered');
          return sv.error;
      }
      else if(response.data == 'password not a match'){
            sv.error = alert('Incorrect Username or Passwords');
            return sv.error;
      }
      else {
          if(response.data[0].status === false ){
            sv.error = alert('You haven\'t yet been confirmed by the administrator');
            return sv.error;
          } //end if statment
          // user is in system and confirmed
          else{
            var userData = response.data[0];
            sv.loggedIn = true;
            sv.registeredUser = !sv.registeredUser;
            if(userData.role < 3){
              sv.admin = true;
            }
            //all user information
            user = {
              loggedIn: sv.loggedIn,
              registeredUser: sv.registeredUser,
              userId: userData.user_id,
              firstName: userData.first_name,
              lastName: userData.last_name,
              email: userData.email,
              image: userData.profile_img,
              role: userData.role,
              admin: sv.admin
            };
            return user;
          } //end else statement
      }
    }); // end http
  }; //end sendLogin
}); //end LoginService
