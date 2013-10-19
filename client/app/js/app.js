var Passport = angular.module('Passport', [
    'ngResource', 'Passport.filters', 'Passport.services', 'Passport.directives', 'Passport.controllers', 'webStorageModule'
  ]).config([
    '$routeProvider', '$rootScopeProvider', function($routeProvider)
    {
      'use strict';
      $routeProvider.when('/login', {
        templateUrl: '/app/partials/login.html',
        controller: 'LoginCtrl'
      }).when('/admin/events', {
          templateUrl: '/app/partials/admin/events.html',
          controller: 'EventsCtrl'
        }).when('/admin/event/:eventId', {
          templateUrl: '/app/partials/admin/event.html',
          controller: 'EventCtrl'
        }).when('/admin/event/:eventId/preview', {
          templateUrl: '/app/partials/admin/eventPreview.html',
          controller: 'EventPreviewCtrl'
        }).when('/event/:eventId', {
          templateUrl: '/app/partials/eventQR.html',
          controller: 'EventQRCtrl'
        }).when('/:shortURL', {
          templateUrl: '/app/partials/lead/lead.html',
          controller: 'LeadCtrl'
        }).when('/admin/event/:eventId/DropBox', {
          templateUrl: '/app/partials/admin/DropBox.html',
          controller: 'DropBoxCtrl'
        }).when('/lead/:leadId/DropBox', {
          templateUrl: '/app/partials/lead/MyDropBox.html',
          controller: 'MyDropBoxCtrl'
        }).when('/lead/:leadId/confirmation', {
          templateUrl: '/app/partials/lead/confirmation.html',
          controller: 'ConfirmationCtrl'
        }).otherwise({
          redirectTo: '/login'
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
