angular.module('febworms').directive('febwormsValidationSummary', function() {

  var messages = {
    required: 'Field value is required.',
    minlength: 'Field value does not match the minimum length.',
    maxlength: 'Field value exceeds the maximum length.',
    pattern: 'Field value does not match the required format.',
    email: 'Field value should be an email address.',
    unique: 'Field value is not unique.'
  };

  return {
    templateUrl: 'febworms/validation/febworms-validation-summary.tmpl.html',
    replace: true,
    scope: {
      formField: '=',
      schemaField: '='
    },
    link: function($scope) {
      if(!$scope.formField) {
        throw Error('No form field provided.');
      }

      $scope.messages = messages;
    }
  };
});
