angular.module('Passport.services').factory('EventService', [
  '$resource', function($resource)
  {
    'use strict';
    var Event = $resource('/event/:_id', {_id: '@id'});
    return Event;
  }]);