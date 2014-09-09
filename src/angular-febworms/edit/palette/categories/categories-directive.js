angular.module('febworms').directive('febwormsEditPaletteCategories', function () {
  return {
    templateUrl: 'angular-febworms/edit/palette/categories/categories.ng.html',
    require: '^febwormsEditPalette',
    scope: {
      category: "=?"
    },
    controller: 'febwormsEditPaletteCategoriesController'
  };
});