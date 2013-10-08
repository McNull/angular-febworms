angular.module('febworms').directive('febwormsPalette', function() {
  return {
    restrict: 'A',
    templateUrl: 'febworms/palette/febworms-palette.tmpl.html',
    controller: 'febwormsPaletteController'
  };
}).controller('febwormsPaletteController', function($scope, febwormsConfig) {
console.log('in controller');
    $scope.fields = febwormsConfig.fields;

  });
