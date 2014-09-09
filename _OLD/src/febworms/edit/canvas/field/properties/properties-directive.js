angular.module('febworms').directive('febwormsEditCanvasFieldProperties', function (febwormsUtils) {
  return {
    templateUrl: 'febworms/edit/canvas/field/properties/properties.tmpl.html',
    replace: true,
    scope: {
      field: '=febwormsEditCanvasFieldProperties'
    },
    link: function ($scope, $element, $attrs, ctrls) {

      $scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
        $scope.field.$_invalid = newValue;
      });

      $scope.renderInfo = febwormsUtils.getRenderInfo($scope.field);
    }
  };
});
