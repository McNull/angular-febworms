angular.module('febworms').directive('febwormsEditPalette',function () {
  return {
    templateUrl: 'febworms/edit/palette/palette.tmpl.html',
    controller: 'febwormsEditPaletteController',
    scope: {
      // Called when the add button is clicked -- any argument named field will receive the field model.
      addField: "&"
    }
  };
});