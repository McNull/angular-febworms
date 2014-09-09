angular.module('febworms').directive('febwormsEditPalette',function () {
  return {
    require: ['^febwormsSchema'],
    templateUrl: 'angular-febworms/edit/palette/palette.ng.html',
    controller: 'febwormsEditPaletteController',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.schemaCtrl = ctrls[0];
    }
  };
});