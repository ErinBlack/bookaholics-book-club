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
    if (response.status == 200) {
      if(response.data[0].status === true){
        var userData = response.data;
        console.log('logged in');
        sv.loggedIn = true;
        sv.registeredUser = !sv.registeredUser;
        return sv.registeredUser;
      }
      else{
          console.log('User not confirmed yet');
          sv.loggedIn = false;
          return sv.error;
      }

    } //end logged in
    else {
      console.log('in loginService else statement');
      sv.loggedIn = false;
      return sv.error;
    }
  }); // end http
};



}); //end LoginService
