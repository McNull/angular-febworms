angular.module('febworms').directive('febwormsPalette',function () {
  return {
    templateUrl: 'febworms/edit/palette/febworms-palette.tmpl.html',
    controller: 'febwormsPaletteController'
  };
}).controller('febwormsPaletteController',function ($scope, febwormsConfig) {
    $scope.palette = { fields: febwormsConfig.fields };
  }).directive('febwormsPaletteCategories', function(){
  return {
    templateUrl: 'febworms/edit/palette/febworms-palette-categories.tmpl.html',
    replace: true
  };
});