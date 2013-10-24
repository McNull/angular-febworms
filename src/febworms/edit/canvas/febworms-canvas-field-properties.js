angular.module('febworms').directive('febwormsCanvasFieldProperties',function () {
  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas-field-properties.tmpl.html',
    replace: true,
    scope: {
      field: '=',
      schema: '='
    },
    link: function ($scope) {
      $scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
        $scope.field.$_invalid = newValue;
      });
    }
  };
});
