angular.module('febworms').directive('febwormsValidationSummary', function(febwormsConfig) {

  return {
    require: '^form',
    templateUrl: 'febworms/validation/summary.tmpl.html',
    scope: {
      fieldName: '@',
      fieldState: '=?',
      fieldSchema: '=?',
      validationMessages: '=?'
    },
    link: function($scope, $element, $attrs, $formController) {

      if (!$scope.fieldState) {

        var fieldName = $scope.fieldSchema ? $scope.fieldSchema.name : $scope.fieldName;

        if (fieldName) {
          $scope.fieldState = $formController[fieldName];
        } else {
          throw Error('No field state available.');
        }
      }

      $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
    }
  };
});