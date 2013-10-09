angular.module('febworms').directive('febwormsPalette',function () {
  return {
    restrict: 'A',
    templateUrl: 'febworms/palette/febworms-palette.tmpl.html',
    controller: 'febwormsPaletteController'
//    scope: {
//      schema: '='
//    }
  };
}).controller('febwormsPaletteController', function ($scope, febwormsConfig) {

    $scope.fields = febwormsConfig.fields;

  });
