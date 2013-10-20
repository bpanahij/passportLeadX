angular.module('Passport.controllers').controller('LeadCtrl', [
  '$scope', '$rootScope', '$location', '$routeParams', 'ArkService', function($scope, $rootScope, $location, $routeParams, ArkService)
  {
    "use strict";
    $('.main-header').hide();
    $scope.lead = {
      email: ''
    }
    $scope.lead.fields = [
      {
        keywords: [
          'name',
          'fullName'
        ],
        placeholder: 'Your Full Name',
        type: 'text',
        accepted: false
      },
      {
        keywords: [
          'phone',
          'mobile'
        ],
        placeholder: 'Phone',
        type: 'text',
        accepted: false
      },
      {
        keywords: [
          'birth',
          'DOB',
          'birthday'
          ],
        placeholder: 'Month / Day / Year of Birth',
        type: 'text',
        accepted: false
      },
      {
        keywords: [
          'location',
          'address'
          ],
        placeholder: 'Mailing Address',
        type: 'text',
        accepted: false
      },
      {
        keywords: [
          'school',
          'university',
          'education'
          ],
        placeholder: 'Last School Attended',
        type: 'text',
        accepted: false
      }
    ];
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
  }]);