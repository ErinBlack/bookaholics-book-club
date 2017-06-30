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
    console.log('back from register attempt:', response);
    if (response.data == 'hooray') {
      console.log('logged in');
      sv.loggedIn = true;
      sv.registeredUser = !sv.registeredUser;
      console.log('registeredUser in service', sv.registeredUser);
      return sv.registeredUser;
    } //end logged in
    else {
      sv.loggedIn = false;
      return sv.error;
    }
  }); // end http
};
}); //end LoginService
