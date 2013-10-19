var Passport = angular.module('Passport', [
    'ngResource', 'Passport.filters', 'Passport.services', 'Passport.directives', 'Passport.controllers', 'webStorageModule'
  ]).config([
    '$routeProvider', '$rootScopeProvider', function($routeProvider)
    {
      'use strict';
      $routeProvider.when('/', {
        templateUrl: '/app/partials/landing.html',
        controller: 'LandingCtrl'
      }).when('/admin', {
          templateUrl: '/app/partials/admin.html',
          controller: 'AdminCtrl'
        }).when('/dropbox', {
          templateUrl: '/app/partials/dropbox.html',
          controller: 'DropBoxCtrl'
        }).when('/:shortURL', {
          templateUrl: '/app/partials/lead.html',
          controller: 'LeadCtrl'
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]).run(['$rootScope', function($rootScope)
  {
    'use strict';
    $('footer').show();
    $rootScope.errors = [];
    $rootScope.successes = [];
    $rootScope.notices = [];
    $('.alertArea').show();
  }
  ]);
