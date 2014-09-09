angular.module('febworms').directive('febwormsEditPalette',function () {
  return {
    require: ['^febwormsSchema'],
    templateUrl: 'febworms/edit/palette/palette.tmpl.html',
    controller: 'febwormsEditPaletteController',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.schemaCtrl = ctrls[0];
    }
  };
});