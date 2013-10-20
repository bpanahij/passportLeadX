angular.module('Passport.controllers').controller('RouteCtrl', [
  '$scope', '$location', 'UserService', function($scope, $location, UserService)
  {
    "use strict";
    var _ = window._;
    $location.path('/admin/events');
    return;
//    var user = UserService.user();
//    if(_.contains(user.userPerms, 'lead'))
//    {
//      $location.path('/admin/' + user._id + '/events');
//      return;
//    }
//    if(_.contains(user.userPerms, 'admin'))
//    {
//      $location.path('/lead/' + user._id + '/DropBox');
//      return;
//    }
//    $location.path('/login');
  }]);
