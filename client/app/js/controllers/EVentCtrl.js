angular.module('Passport.controllers').controller('EventCtrl', [
  '$scope', 'EventService', '$routeParams', '$location', 'ArkService', function($scope, EventService, $routeParams, $location, ArkService)
  {
    "use strict";
    var eventId = $routeParams.eventId;
    $scope.event = {
      email: ''
    };
    $scope.publishLabel = 'Preview';
    if (eventId != 0)
    {
      $scope.event._id = eventId;
      EventService.get($scope.event, function(Event)
      {
        $scope.event = Event;
      });
    }
    $scope.event.additional = [];
    $scope.event.fields = [
      {
        keywords: [
          'name',
          'fullName'
        ],
        placeholder: 'Full Name',
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
      }
    ];
    $scope.myEvents = function()
    {
      $location.path('/admin/events');
    }
    $scope.newEvent = function()
    {
      $location.path('/admin/event/0');
    };
    $scope.addField = function()
    {
      $scope.event.additional.push({
        keywords: [],
        placeholder: '',
        type: 'text',
        accepted: false
      });
      $('#main').css({height: (window.innerHeight * 2) + 'px'});
      $.scrollTo('200px', 800);
    };
    $scope.handleKeywords = function()
    {
      var tags = $(event.target).val();
      var keywords = tags.split(' ');
      this.field.keywords = keywords;
    };
    $scope.togglePreview = function()
    {
      $scope.preview = !$scope.preview;
      $scope.publishLabel = $scope.preview ? 'Edit' : 'Preview';
      $scope.lead = {
        fields: []
      };
      var fields = _.union($scope.event.fields, $scope.event.additional);
      $scope.lead.fields = _.map(fields, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      $scope.previewTemplate = '/app/partials/lead/lead.html'
    };
    $scope.publish = function()
    {
      $scope.event.fields = _.map($scope.event.fields, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      $scope.event.additional = _.map($scope.event.additional, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      var event = new EventService($scope.event);
      event.$save(function(res)
      {
        $location.path('/admin/event/' + res._id)
        $scope.event = res;
      });
    };
    $scope.removeAdditional = function()
    {
      $scope.event.additional = _.without($scope.event.additional, this.field);
    };
    $scope.$watch('lead.email', function(newEmail)
    {
      if (newEmail && newEmail.match(/.*@.*\.(com|info|net|org|edu)/))
      {
        $scope.validEmail = true;
        var fields = _.map($scope.lead.fields, function(field)
        {
          return field.keywords;
        });
        ArkService.arkIt(newEmail, fields, function(err, data)
        {
          _.each($scope.lead.fields, function(field)
          {
            field.foundValue = false;
            _.each(data, function(d)
            {
              var intersection = _.intersection(_.keys(d), field.keywords)
              if (intersection.length > 0)
              {
                field.value = d[intersection[0]];
                field.accepted = true;
              }
            });
          });
        });
      }
      else
      {
        $scope.validEmail = false;
      }
    });
  }]);
