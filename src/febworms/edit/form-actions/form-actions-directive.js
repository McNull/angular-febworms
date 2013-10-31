angular.module('febworms').directive('febwormsEditFormActions', function(febwormsConfig) {

  return {
    require: '^febwormsEdit',
    templateUrl: 'febworms/edit/form-actions/form-actions.tmpl.html',
    link: function($scope, $element, $attrs, febwormsEditController) {

      $scope.debugInfoEnabled = febwormsConfig.enableDebugInfo;

      $scope.togglePreview = function() {
        if(!$scope.schema.$_invalid) {
          febwormsEditController.togglePreview();
        }
      };

      $scope.handleSave = function() {
        if(!$scope.schema.$_invalid) {
          $scope.onSave({ schema: $scope.schema });
        }
      };

      $scope.handleCancel = function() {
        $scope.onCancel({ schema: $scope.schema });
      };

    }
  };
});