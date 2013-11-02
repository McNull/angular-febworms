angular.module('febworms').directive('febwormsRenderFieldInner', function(febwormsUtils) {

  return {
    replace: true,
    templateUrl: 'febworms/render/field-inner.tmpl.html',
    scope: {
      field: '=',
      ngModel: '=?',
      tabIndex: '=?',
      editMode: '=',
      noValidationSummary: '='
    },
    link: function($scope, $element, $attrs) {

      if($scope.tabIndex === undefined) {
        $scope.tabIndex = 'auto';
      }

      if($scope.editMode) {
        $scope.$watch('field.value', function(value) {
          $scope.ngModel = value;
        });
      } else if($scope.ngModel === undefined) {
        $scope.ngModel = $scope.field.value;
      }

      $scope.renderInfo = febwormsUtils.getRenderInfo($scope.field);
    }
  };

});
