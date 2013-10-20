angular.module('Passport.controllers').controller('RegisterCtrl', [
  '$scope', '$location','UserService', function($scope, $location, UserService)
  {
    "use strict";
    $scope.username = '';
    $scope.password = '';
    $scope.role = 'student';
    $scope.roles = ['student', 'school']
    $scope.login = function() {
      UserService.login($scope.username, $scope.password, function(res)
      {
        $location.path('/route')
      });
    }
  }]);
