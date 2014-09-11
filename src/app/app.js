
var app = angular.module('app', ['ngRoute', 'ngLogo', 'febworms', 'inform', 'inform-exception', 'inform-http-exception']);

app.controller('MainCtrl', function($scope, appMenuItems) {
  $scope.menuItems = appMenuItems;
});