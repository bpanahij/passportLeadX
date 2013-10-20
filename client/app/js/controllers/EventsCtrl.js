angular.module('Passport.controllers').controller('EventsCtrl', [
  '$scope', '$rootScope', '$location', '$routeParams', 'EventService', function($scope, $rootScope, $location, $routeParams, EventService)
  {
    "use strict";
    $scope.events = [];
    EventService.query({}, function(res) {
      $scope.events = res;
    });
    $scope.newEvent = function()
    {
      $location.path('/admin/event/0');
    };
    $scope.viewPage = function()
    {
      $location.path('/event/' + this.event._id);
    }
  }]);