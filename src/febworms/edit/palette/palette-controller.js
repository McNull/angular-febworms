angular.module('febworms').controller('febwormsEditPaletteController',function ($scope, febwormsConfig) {

  var palette = $scope.palette = {};

  palette.fields = febwormsConfig.fields.templates;
  palette.categoryKeys = _.keys(febwormsConfig.fields.categories);
  palette.categoryKey = palette.categoryKeys[0];

  $scope.$watch('palette.categoryKey', function (value) {
    palette.category = febwormsConfig.fields.categories[value];
  });

  palette.categoryFilter = function (field) {
    return (!palette.category) || _.contains(palette.category, field.type);
  };

});