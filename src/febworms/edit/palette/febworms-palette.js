angular.module('febworms').directive('febwormsPalette',function () {
  return {
    templateUrl: 'febworms/edit/palette/febworms-palette.tmpl.html',
    controller: 'febwormsPaletteController'
  };
}).controller('febwormsPaletteController',function ($scope, febwormsConfig) {

    var palette = $scope.palette = {};

    palette.fields = febwormsConfig.fields.templates;
    palette.categoryKeys = _.keys(febwormsConfig.fields.categories);
    palette.categoryKey = palette.categoryKeys[0];

    $scope.$watch('palette.categoryKey', function(value) {
      palette.category = febwormsConfig.fields.categories[value];
    });

    palette.categoryFilter = function(field) {
      return (!palette.category) || _.contains(palette.category, field.type);
    };

  }).directive('febwormsPaletteCategories', function () {
    return {
      templateUrl: 'febworms/edit/palette/febworms-palette-categories.tmpl.html',
      replace: true
    };
  });