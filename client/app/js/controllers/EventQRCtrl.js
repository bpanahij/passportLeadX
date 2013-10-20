angular.module('Passport.controllers').controller('EventQRCtrl', [
  '$scope', '$rootScope', '$location', '$routeParams', 'EventService', function($scope, $rootScope, $location, $routeParams, EventService)
  {
    "use strict";
    $scope.eventId = $routeParams.eventId;
    $scope.event = {};
    $scope.getEvent = function()
    {
      EventService.get({_id: $scope.eventId}, function(event)
      {
        $scope.event = event;
        $scope.generateQRCode();
      });
    };
    $scope.generateQRCode = function()
    {
      var qrcodeEl = document.getElementById("qrcode");
      qrcodeEl.innerHTML = "";
      var qrcode = new QRCode(qrcodeEl, {
        text: 'http://dev.psprt.com/#/ev/' + $scope.event._id,
        width: 350,
        height: 350,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      $('#qrcode img').css({width: '100%'});
    };
    $scope.getEvent();
  }]);