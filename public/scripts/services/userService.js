myApp.service('UserService', function($http){
  let sv = this;
  sv.pendingUsers = [];
  sv.allUsers = [];


  // *****  Get Users Pending Approval *****//
  sv.getUserRequests = (search) => {
    console.log('in getUserRequests');
    sv.pendingUsers = [];
    return $http.get('/admin/requests').then(function(data){
      sv.pendingUserData = data.data;
      for (const value of sv.pendingUserData) {
        sv.pendingUsers.push(value);
      }
      console.log('leaving getUserRequests');
      return sv.pendingUsers;
    });

  }; //end getRequests

  // ***** Get all Approved Members *****//
  sv.getMembers = () => {
    console.log('in getMembers');
    sv.allUsers = [];
    $http.get('/admin/getMembers').then(function(data){
    sv.userData = data.data;

      // for loop to go through userData
      for (const value of sv.userData) {
        //switch statement to determine if admin
        switch(value.role) {
          case 2: {
            sv.admin = true;
            break;
          }
          case 1: {
            sv.admin = 'owner';
            break;
          }
          default: {
            sv.admin = false;
            break;
          }
        } //end switch statement
        // sv user object constructor
        sv.user = {
          email: value.email,
          first_name: value.first_name,
          last_name: value.last_name,
          profile_img: value.profile_img,
          role: value.role,
          user_id: value.user_id,
          admin: sv.admin
        }; //end user
        sv.allUsers.push(sv.user);
      }// end for loop
    }); //end .then
    console.log('leaving Members');
    return sv.allUsers;
  }; //end getRequests

  // ***** Change User Roll *****//
  sv.changeRole = (user_id, role) => {
    console.log('in changeRoll');
    console.log('user_id, role', user_id, role);
    sv.userInfo = {
      id: user_id,
      role: role
    } //end userInfo
    return $http.put('/admin/changeRoll',{
      data: sv.userInfo
    }).then(function(){
      sv.getMembers();
      return sv.allUsers;
    }); //end .then function
  }; //end changeRoll


  // ***** Change User Roll *****//
  sv.changeStatus = (user_id, status) => {
    console.log('in changeStatus');
    sv.userInfo = {
      id: user_id,
      status: status
    } //end userInfo
    return $http.put('/admin/changeStatus',{
      data: sv.userInfo
    }).then(function(){
      sv.getUserRequests();
      sv.getMembers();
      return sv.pendingUsers;
    }); //end .then function
  }; //end changeStatus

}); //end UserService
