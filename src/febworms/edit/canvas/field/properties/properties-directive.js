angular.module('febworms').directive('febwormsEditCanvasFieldProperties', function (febwormsUtils) {
  return {
    templateUrl: 'febworms/edit/canvas/field/properties/properties.tmpl.html',
    replace: true,
    scope: {
      field: '=',
      schema: '='
    },
    link: function ($scope) {
      $scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
        $scope.field.$_invalid = newValue;
      });

      $scope.propertiesTemplateUrl = febwormsUtils.getTemplateUrl($scope.field, 'properties');
    }
  };
});
