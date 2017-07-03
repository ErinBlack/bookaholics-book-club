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
    if (response.data.length > 0) {
      if(response.data[0].status === false ){
        console.log('User not confirmed yet');
        sv.loggedIn = false;
        return sv.error;
      }
      else{
        var userData = response.data[0];
        console.log('logged in');
        sv.loggedIn = true;
        sv.registeredUser = !sv.registeredUser;
        // var user = {
        //   sv.name: userData.first_name + ' ' + userData.last_name;
        // };
        //
        return sv.registeredUser;

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
