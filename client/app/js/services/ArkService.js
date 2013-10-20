angular.module('Passport.services').factory('ArkService', [
  '$resource', function($resource)
  {
    'use strict';
    var Ark = $resource('/ark/:email');
    var Service = {
      arkIt: function(email, fields, callback)
      {
        var query = {
          fields: JSON.stringify(fields),
          email: email
        };
        Ark.query(query, function(res)
        {
          callback(null, res)
        });
      }
    }
    return Service;
  }]);
