angular.module('Passport.services').factory('UserService', [
  '$resource', '$rootScope', '$cookieStore', function($resource, $rootScope, $cookieStore)
  {
    'use strict';
    var User = $resource('/user/:userId', {userId: '@id'});
    var Login = $resource('/login/:userName/:password');
    var Service = {
      user: function()
      {
        return $cookieStore.get('user');
      },
      login: function(userName, password, callback)
      {
        var user = Login.get({userName: userName, password: password}, function()
        {
          $cookieStore.put('user', user);
          callback(null, user);
        });
      },
      /**
       * Getting a specific user and adding the cookie
       * @param userId
       * @param callback
       */
      get: function(userId, callback)
      {
        var user = User.get({userId: userId}, function()
        {
          $cookieStore.put('user', user);
          callback(null, user);
        });
      },
      /**
       * New user not having a resource id yet
       * @param user
       * @param callback
       */
      create: function(user, callback)
      {
        var newUser = User.save(user, function()
        {
          $cookieStore.put('user', newUser);
          callback(null, newUser);
        });
      }
    }
    return Service;
  }]);
