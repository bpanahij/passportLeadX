angular.module('Passport.controllers').controller('LeadCtrl', [
  '$scope', '$rootScope', '$location', '$routeParams', 'ArkService', 'EventService', function($scope, $rootScope, $location, $routeParams, ArkService, EventService)
  {
    "use strict";
    $('.main-header').hide();
    $scope.lead = {
      email: ''
    }
    $scope.eventId = $routeParams.eventId;
    EventService.get({_id: $scope.eventId}, function(event)
    {
      $scope.lead = event;
    });
    $scope.$watch('lead.email', function(newEmail)
    {
      if (newEmail && newEmail.match(/.*@.*\.(com|info|net|org|edu)/))
      {
        $scope.validEmail = true;
        var fields = _.map($scope.lead.fields, function(field)
        {
          return field.keywords;
        });
        ArkService.arkIt(newEmail, fields, function(err, data) {
          _.each($scope.lead.fields, function(field) {
            field.foundValue = false;
            _.each(data, function(d) {
              var intersection = _.intersection(_.keys(d), field.keywords)
              if (intersection.length > 0)
              {
                field.value = d[intersection[0]];
                field.accepted = true;
              }
            });
          });
        });
      } else {
        $scope.validEmail = false;
      }
    });
    $scope.verifyField = function()
    {
      var field = this.field;
      field.accepted = !field.accepted;
      if (!field.accepted)
      {
        field.value = '';
      }
    };
    $scope.submit = function()
    {
      $location.path('/lead/confirmation');
    };
  }]);