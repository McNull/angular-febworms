angular.module('febworms').directive('febwormsEditPalette',function () {
  return {
    templateUrl: 'febworms/edit/palette/palette.tmpl.html',
    controller: 'febwormsEditPaletteController',
    scope: true
  };
});