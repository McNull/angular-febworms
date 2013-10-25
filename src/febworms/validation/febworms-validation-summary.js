angular.module('febworms').directive('febwormsValidationSummary', function(febwormsConfig) {

  return {
    templateUrl: 'febworms/validation/febworms-validation-summary.tmpl.html',
    replace: true,
    scope: {
      formField: '=',
      schemaField: '=',
      validationMessages: '=?'
    },
    link: function($scope, $element, $attrs) {

      $scope.messages = angular.extend($scope.messages || {}, febwormsConfig.validation.messages, $scope.validationMessages)
    }
  };
});
