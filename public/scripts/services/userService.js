myApp.service('UserService', function($http){
  let sv = this;
  sv.pendingUsers = [];
  sv.allUsers = [];


  // *****  Get Users Pending Approval *****//
  sv.getUserRequests = () => {
    console.log('in getUserRequests');
    sv.pendingUsers = [];
    return $http.get('/admin/requests').then(function(data){
      sv.pendingUserData = data.data;
        console.log('  sv.pendingUserData insdie return',   sv.pendingUserData);
      for (const value of sv.pendingUserData) {
        sv.pendingUsers.push(value)
        console.log('  sv.pendingUserData insdie for loop ',   sv.pendingUserData);;
      }
      return sv.pendingUsers;
    });
  }; //end getRequests


  // ***** Get all Approved Members *****//
  sv.getMembers = () => {
    sv.allUsers = [];
    console.log('sv.allUsers when entering sv.getMembers', sv.allUsers);
    return $http.get('/admin/getMembers').then(function(data){
      sv.allUsers = [];
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
        console.log('sv.allUsers at end of each loop cycle', sv.allUsers);
      }// end for loop
      console.log('sv.allUsers to send to controller', sv.allUsers);
      return sv.allUsers;
    }); //end .then
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
      sv.getUserRequests();
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
