angular.module('febworms').directive('febwormsPalette',function () {
  return {
    restrict: 'A',
    templateUrl: 'febworms/edit/palette/febworms-palette.tmpl.html',
    controller: 'febwormsPaletteController'
  };
}).controller('febwormsPaletteController', function ($scope, febwormsConfig) {

    $scope.palette = { fields: febwormsConfig.fields };

});
