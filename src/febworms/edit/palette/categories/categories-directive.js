angular.module('febworms').directive('febwormsEditPaletteCategories', function () {
  return {
    templateUrl: 'febworms/edit/palette/categories/categories.tmpl.html',
    replace: true,
    require: '^febwormsEditPalette',
    scope: {
      category: "=?"
    },
    controller: 'febwormsEditPaletteCategoriesController'
  };
});