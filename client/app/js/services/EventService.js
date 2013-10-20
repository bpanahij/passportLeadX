angular.module('Passport.services').factory('EventService', [
  '$resource', function($resource)
  {
    'use strict';
    var Event = $resource('/event/:eventId', {eventId: '@id'});
    var Service = {
      get: Event.get,
      save: Event.save
    }
    return Service;
  }]);