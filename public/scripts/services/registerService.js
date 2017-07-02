myApp.service('RegisterService', function($http){
console.log('inside RegisterService');
var sv = this;

sv.sendRegister = function(data){
  console.log('in sendRegister', data);
  return $http({
    method: 'POST',
    url: '/register',
    data: data
  }).then(function(response) {
    console.log('back from register attempt:', response);
  }); // end http
};

}); //end Login Service
