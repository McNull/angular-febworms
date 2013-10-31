angular.module('febworms').controller('febwormsEditPaletteController', function ($scope, febwormsConfig) {

  $scope.templates = angular.copy(febwormsConfig.fields.templates);

  var count = 0;

  angular.forEach($scope.templates, function (template) {
    template.id = 'template' + ++count;
  });

  $scope.templateFilter = function (template) {
    return !$scope.selectedCategory || $scope.selectedCategory[template.type];
  };

});